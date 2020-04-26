import React, { Component, useRef, useState} from 'react'
import {
    View, 
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry, {SliderEntryType} from "./SliderEntry";


type Props = {
    entries : SliderEntryType[],
    renderItem : ({item, index} : {item: SliderEntryType, index: number}) => void,
    onSlidePress : (slide : SliderEntryType) => void,
}

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage : number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const S = StyleSheet.create({
    paginationContainer : {

    },
    paginationDot:{

    },
    sliderContainer: {
        paddingVertical: 5,
    },
})

const Slides = ({
    entries,
    renderItem,
    onSlidePress
} : Props) => {

    let _carousel = useRef();
    let [activeSlide, setActiveSlide] = useState(0);
  
    if(!renderItem){
        renderItem = ({item, index} :  {item :SliderEntryType, index: number}) => {
            return <SliderEntry 
                        onSlidePress={onSlidePress}
                        data={item} 
                        even={(index + 1) % 2 === 0} 
                        />;
        };
    }

    const pagination = () => {
      return (
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          containerStyle={[S.paginationContainer, {margin: 0, padding: 0}]}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={S.paginationDot}
          // inactiveDotColor={.black}
          inactiveDotColor={'black'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
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
        {pagination()}
        </View>
    )
}

export default Slides;