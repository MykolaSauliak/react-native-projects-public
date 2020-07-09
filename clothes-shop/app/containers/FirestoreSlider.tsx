import * as React from "react";
import { Component, useRef, useState } from 'react'
import {
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ActivityIndicator,
    StyleSheet, 
    Dimensions, 
    Platform
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import constants from "../constants";
import { Loading } from "../components";

type SliderEntryType = {
    data: any,
    even: boolean,
    parallax: boolean,
    parallaxProps: any,
    subtitleStyle?: any,
    Pagination?: any,
    titleStyle?: any,
    onSlidePress: (slide : SliderEntryType) => void,
  }

type SliderProps = {
    collection : string,
    queries : [string,string,any][],
    transformItems : (items:SliderEntryType[] ) => SliderEntryType[],
    children: (slide : any) => void,
    LoadingComponent : React.ComponentType,
}   

type SlidesProps = {
    entries : SliderEntryType[],
    renderItem : ({item, index} : {item: SliderEntryType, index: number}) => void,
    onSlidePress : (slide : SliderEntryType) => void,
}

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD',
};

function wp(percentage : number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.55;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth;
// const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const Slides = ({
    entries,
    renderItem,
    onSlidePress,
    ...otherProps
} : SlidesProps) => {

    let _carousel = useRef();
    let [activeSlide, setActiveSlide] = useState(0);
  
    if(!renderItem){
        renderItem = ({item, index} :  {item :SliderEntryType, index: number}) => {
            return <SliderEntry 
                        onSlidePress={onSlidePress}
                        data={item} 
                        Pagination={pagination()}
                        even={(index + 1) % 2 === 0} 
                        {...otherProps}
                        />;
        };
    }

    const pagination = () => {
      return (
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          containerStyle={[S.paginationContainer, {margin: 0, padding: 0}]}
          dotColor={'rgb(0, 0, 0)'}
          dotStyle={S.paginationDot}
          inactiveDotColor={'gray'}
          // inactiveDotOpacity={0.4}
          inactiveDotScale={1}
          
          // carouselRef={this._slider1Ref}
          // tappableDots={!!this._slider1Ref}
        />
      );
    };

    return (
        <View style={S.sliderContainer}>
        <Carousel
            loop={true}
            // autoplay
            onSnapToItem={(index : number) => setActiveSlide(index)}
            layout={'default'}
            ref={c => {_carousel = c;}}
            data={entries}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
        />
        {/* {pagination()} */}
        </View>
    )
}

  
class SliderEntry extends Component<SliderEntryType> {

    get image() {
      const {
        data: {illustration, image},
        parallax,
        parallaxProps,
        even,

      } = this.props;
  
      return parallax ? (
        <ParallaxImage
          source={{uri: image ? image.src : illustration}}
          defaultSource={constants.defaultImage}
          containerStyle={[
            styles.imageContainer,
            // even ? styles.imageContainerEven : {},
          ]}
          style={styles.image}
          parallaxFactor={0.35}
          showSpinner={true}
          spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
          {...parallaxProps}
        />
      ) : (
        <Image
          source={{uri: image ? image.src : illustration}}
          style={styles.image}
        />
      );
    }
  
    render() {
      const {
        data: {title, subtitle, tag_ids},
        data,
        even,
        onSlidePress,
        titleStyle = {},
        subtitleStyle = {},
        Pagination,
      } = this.props;
  
      const uppercaseTitle = title ? (
        <Text
          style={[styles.title, 
              titleStyle,
            // even ? styles.titleEven : 
            {color: 'black'}]}
          numberOfLines={2}>
          {title.toUpperCase()}
        </Text>
      ) : (
        false
      );
  
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.slideInnerContainer}
          onPress={() => onSlidePress(data)}
          >
          <View style={styles.shadow} />
          <View
            style={[
              styles.imageContainer,
              // even ? styles.imageContainerEven : {},
            ]}>
            {this.image}
            <View
              style={[styles.radiusMask, {}]}
            />
          </View>
          <View
            style={[styles.textContainer,{}]}>
            {uppercaseTitle}
            <Text
              style={[
                styles.subtitle,
                subtitleStyle,
                {color: 'black'},
                // even ? styles.subtitleEven : {color: 'black'},
              ]}
              numberOfLines={2}>
              {subtitle}
            </Text>
            {Pagination}
          </View>
        </TouchableOpacity>
      );
    }
  }
  
class FirestoreSlides extends Component<SliderProps> {

    static Slides = Slides
    static SliderEntry = SliderEntry
    static Provider = FirestoreSlides

    state = {
        loading: false,
        slides : []
    }

    componentDidMount(){
        const {
            collection, 
            queries
        } = this.props

        this.setState(() => ({
            loading : true
        }))

        let query = firestore().collection(collection)

        queries.forEach( q => {
            query = query.where(q[0],q[1],q[2])
        })
        
        query
            .get()
            .then( snapshot => {
                // console.log('snapshot',snapshot)
                let slides = []
                snapshot.forEach( s => {
                    slides = [...slides, s.data()]
                })
                this.setState(() => ({
                    loading: false,
                    slides,
                }))
            })
            .catch(err => {
                // console.log('ERROR DURING FETCH SLIDES',err)
                this.setState(() => ({
                    loading: false,
                    err : err
                }))
            })
        
    }

    render() {
        let  {
            loading,
            slides,
        } = this.state
        let {
            LoadingComponent ,
            transformItems
        } = this.props
        if(!LoadingComponent){
            LoadingComponent = Loading
        }
        if(loading){
            return <View style={{minHeight: 100, justifyContent:'center',alignItems:'center'}}>
                <LoadingComponent size="large"/>
            </View>
        }

        if(transformItems && slides && slides.length > 0){
          slides = transformItems(slides)
        }

        return (
            <>
            {this.props.children(slides)}
            </>
        )
    }
}


const S = StyleSheet.create({
    paginationContainer : {
        paddingVertical: 5,
        marginTop: 25,
        margin: 1,
        // alignItems:'center',
    },
    paginationDot:{
        width: 20,
        height: 2,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    sliderContainer: {
        // paddingVertical: 5,
    },
})

const styles = StyleSheet.create({
    slideInnerContainer: {
      width: itemWidth,
      height: slideHeight,
      // paddingHorizontal: itemHorizontalMargin,
      paddingBottom: 18, // needed for shadow
    },
    shadow: {
      position: 'absolute',
      top: 0,
      left: itemHorizontalMargin,
      right: itemHorizontalMargin,
      bottom: 18,
      shadowColor: colors.black,
      shadowOpacity: 0.25,
      shadowOffset: {width: 0, height: 10},
      shadowRadius: 10,
      borderRadius: entryBorderRadius,
    },
    imageContainer: {
      flex: 1,
      marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
      backgroundColor: 'white',
      // borderTopLeftRadius: entryBorderRadius,
      // borderTopRightRadius: entryBorderRadius,
    },
    imageContainerEven: {
      backgroundColor: colors.black,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      // borderRadius: IS_IOS ? entryBorderRadius : 0,
      // borderTopLeftRadius: entryBorderRadius,
      // borderTopRightRadius: entryBorderRadius,
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: entryBorderRadius,
      backgroundColor: 'white',
    },
    radiusMaskEven: {
      backgroundColor: colors.black,
    },
    textContainer: {
      justifyContent: 'center',
      paddingTop: 30 - entryBorderRadius,
      paddingBottom: 20,
      marginTop: -45,
      borderRadius: 10,
      minHeight: 100,
      marginHorizontal: 16,
      backgroundColor: 'white',
      // borderBottomLeftRadius: entryBorderRadius,
      // borderBottomRightRadius: entryBorderRadius,
    },
    textContainerEven: {
      backgroundColor: colors.black,
    },
    // title: {
    //   color: colors.black,
    //   fontSize: 13,
    //   fontWeight: 'bold',
    //   letterSpacing: 0.5,
    // },
    titleEven: {
      color: 'white',
    },
    // subtitle: {
    //   marginTop: 6,
    //   color: colors.gray,
    //   fontSize: 12,
    //   fontStyle: 'italic',
    // },
    subtitleEven: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.black,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background1,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
    scrollview: {
      flex: 1,
    },
    exampleContainer: {
      paddingVertical: 30,
    },
    exampleContainerDark: {
      backgroundColor: colors.black,
    },
    exampleContainerLight: {
      backgroundColor: 'white',
    },
    title: {
      marginTop: 15,
      paddingHorizontal: 10,
      backgroundColor: 'transparent',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    titleDark: {
      color: colors.black,
    },
    subtitle: {
      marginTop: 5,
      paddingHorizontal: 10,
      backgroundColor: 'transparent',
      color: 'rgba(255, 255, 255, 0.75)',
      fontSize: 13,
      // fontStyle: 'italic',
      textDecorationLine: "underline",
      textDecorationStyle: "dotted",
      textAlign: 'center',
    },
    slider: {
      marginTop: 15,
      overflow: 'visible', // for custom animations
    },
    sliderContentContainer: {
      paddingVertical: 10, // for custom animation
    },
    paginationContainer: {
      paddingVertical: 8,
    },
    paginationDot: {
      width: 25,
      height: 6,
      borderRadius: 4,
      marginHorizontal: 8,
    },
  });
  
export {
    SliderEntryType,
    SliderProps,
    SlidesProps,

    sliderWidth,
    itemWidth
}

export default FirestoreSlides;
