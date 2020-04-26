import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import S from './styles';
import globalStyles from '../../constants/styles';
import colors from '../../styles/colors';
import constants from '../../constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ClothesSearchHeader from '../../containers/Headers/ClothesSearchHeader';
import FirestoreSlider from '../../containers/FirestoreSlider';
import {GridList} from "../../containers";
// import {FlatGrid} from 'react-native-super-grid';
import {
    Card,
    ListItem,
    Button,
    Icon, 
} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {NavigationService} from '../../services';
import { Loading } from '../../components';
import logo from '../../assets/images/logo.png'
import FastImage from 'react-native-fast-image'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  Loader,
  Shine,
  ShineOverlay,
} from 'rn-placeholder';

const HomeView = ({
  lists,
  middleList,
  essentialList,
  popular_brands,
  new_in_products,
  weLoveProducts,
  entries,
  onClick,
  search,
  loading,
  openList,
  goToSeachAdvancedScreen,
  goToCart,
  goToTextSearch,
  navigateToProductInfo,

  toggleFavorite,
  isFavorite,
  weLoveProductPress,
  onBrandCardPress
}) => {

  let loadedImages = {
    
  }
  // const _renderItem = ({item, index}) => {
  //     return (
  //         <View key={item.title + index} >
  //             {/* style={S.slide} */}
  //             <Image
  //                     source={{ uri : item.illustration}}
  //                     // source={{uri : item.illustration}}
  //                     style={{...StyleSheet.absoluteFill, width:'100%', height :'100%'}}
  //                     // resizeMode="stretch"
  //                     />
  //             <Text style={S.title}>{ item.title }</Text>
  //         </View>
  //     );
  // }


  const _renderCategory = item => {
    // console.log('item',item)
    return (
      <TouchableOpacity onPress={() => onClick(item)} style={S.categoryBox}>
        <View style={{flex: 0.5}}>
          <Image
            resizeMode="contain"
            style={{width: 150, height: 90}}
            source={{uri: item.image.src || item.image}}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Text style={S.categoryTitle}>{item.title || item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const _renderWeLoveSection = () => {
    return (
      <View style={[S.listBox, {backgroundColor: colors.lightGray}]}>  
        <GridList 
          title="We love"
          items={weLoveProducts} 
          />
        <View style={{paddingHorizontal: 15}}>
          <Button
            title="view all"
            titleStyle={{color: 'white'}}
            onPress={weLoveProductPress}
            buttonStyle={{backgroundColor: '#cc815e'}}
          />
        </View>
      </View>
    );
  };

  const _renderFavoriteProducts = () => null;

  const _renderPopularBrands = () => (
    <View style={[S.listWhiteBox]}>
      <Text style={S.listTitle}>{'Popular Brands'}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {popular_brands.map(b => (
          <TouchableOpacity onPress={() => onBrandCardPress(b)}>
              <Card
                key={b.title}
                title={b.title}
                titleStyle={S.cardTitle}
                image={{uri: b.image.src}}
                imageProps={{resizeMode : "contain"}}
                containerStyle={{
                  width: constants.DEVICE_WIDTH * 0.35,
                  marginHorizontal: 5,
                }}
              />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const _renderNewIn = () => (
    <View style={[S.listBox]}>
      <GridList 
        title="New in"
        items={new_in_products}
        />
      {/* <Button title="view all" titleStyle={{ color: 'white'}} onPress={() => openList(constants.we_love)} buttonStyle={{backgroundColor:'#cc815e',}}/> */}
    </View>
  );

  if(loading){
    return <View style={{flex:1, justifyContent:'center'}}>
      <Loading />
    </View>
  }


  return (
    <View style={{flex:1}}>
      <ClothesSearchHeader
        onLeftButtonPress={() => NavigationService.navigateToCategorySearch()}
        onSearchClick={() => NavigationService.navigateToSearchHistory()}
        onCartClick={() => NavigationService.navigateToCart()}
      />
      {loading ? <ActivityIndicator /> 
        :(
      <Animatable.View
        animation="fadeInUp"
        style={{flex: 1}}
        duration={2000}
        delay={1000}>
          <ScrollView style={{flex: 1, height: '100%', padding: 0}}>
          <View
            style={{
              flex: 1,
              width: '100%',
              padding: 0,
              backgroundColor: colors.lightGray,
            }}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={[S.topLists]}
                horizontal={true}
                >
                {lists.map((list : any, i  : number) => {
                console.log('list',list)
                return (
                  <TouchableOpacity
                    // onPress={() => NavigationService.navigateToFilterList({title:  'Test list'})}
                    onPress={() => {
                      search(list.title, {
                        // title: list.title,
                          refinementList: {
                            tag_ids:  [list.tag_id]
                          }
                        },
                        constants.clothes
                      )
                    }}
                    key={list.title + i}  
                    style={S.topListItem}>
                    {/* <View key={list.title + i} style={S.topListItem}> */}
                    {loadedImages[i] === false ? (
                        <Placeholder
                          Left={PlaceholderMedia}
                          Animation={Shine}>
                        </Placeholder>
                      ) : (
                        <FastImage
                          onLoadStart={(e) => loadedImages[i] = false}
                          onLoadEnd={(e) => loadedImages[i] = true}
                          source={{uri: list.image}}
                          style={S.topListImage}
                          resizeMode="cover"
                        />
                    )}
                    <Text style={S.topListTitle}>{list.title}</Text>
                    {/* </View> */}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <FirestoreSlider 
                collection="slides"
                queries={[['type','==','main']]}>
                {(slides) => <FirestoreSlider.Slides 
                        onSlidePress={(slide) => {
                            search(slide.title, {
                              // title: slide.title,
                              refinementList: {
                                tag_ids:  [slide.tag_ids]
                              }
                            }, constants.clothes)
                        }}
                        // onSlidePress={(slide) => NavigationService.navigateToSearchResult({
                        //     title: slide.title,
                        //     options: {tag_ids: slide.tag_ids},
                        //   })
                        // } 
                        LoadingComponent={Loading}
                        entries={slides}
                        />}
            </FirestoreSlider>
            <View>
                {
                  essentialList && essentialList.subtypes &&
                  <View key={essentialList.title} style={S.listBox}>
                    <Text style={S.listTitle}>{essentialList.title}</Text>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      containerStyle={{paddingLeft: 15}}
                      >
                      {essentialList.subtypes && 
                        essentialList.subtypes.map((st, i) => (
                          <TouchableOpacity
                            // onPress={() => NavigationService.navigateToSearchResult({title :st.title,  options: {type_id:  st.id}})}
                            onPress={() => search(st.title, 
                              {
                                // title: st.title,
                                refinementList: {
                                  type_id : st.id
                                }
                              }, 
                            constants.clothes)}
                            >
                            <Card
                              key={i}
                              title={st.title}
                              imageProps={{resizeMode: 'contain'}}
                              image={{uri: st.image ? st.image.src : ''}}
                              containerStyle={S.listCard}
                            />
                        </TouchableOpacity>

                        // <View style={S.typeBox}>
                        //     <Image source={{uri : t.image}} style={S.typeImage} resizeMode="contain"/>
                        //     <Text>{t.title}</Text>
                        // </View>
                      ))}
                    </ScrollView>
                  </View>
                }
            </View>
            {_renderWeLoveSection()}
            {_renderFavoriteProducts()}
            {_renderPopularBrands()}
            {_renderNewIn()}
          </View>
        </ScrollView>
      </Animatable.View>)}
    </View>
  );
};

export default HomeView;
