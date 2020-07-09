import React, {useRef, useState} from 'react';
import {
  View,
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
import globalStyles from '../../styles';
import colors from '../../styles/colors';
import constants from '../../constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ClothesSearchHeader from '../../containers/Headers/ClothesSearchHeader';
import FirestoreSlider from '../../containers/FirestoreSlider';
import {GridList} from "../../containers";
import {Text} from "../../components";
// import {FlatGrid} from 'react-native-super-grid';
import {
    Card,
    Button,
    Icon, 
} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {NavigationService, ShopService} from '../../services';
import { Loading } from '../../components';
// import logo from '../../assets/images/logo.png'

import { Shop } from '../../types/Shop.type';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CategoriesCircles from '../../components/CategoriesCircles/CategoriesCircles';
import SearchCard from '../../components/SearchCard/SearchCard';
import ButtonBlack from '../../components/Button/ButtonBlack';



const Category = ({
  lists,
  title,
  tag_id,
  middleList,
  essentialList,
  popular_brands,
  categoryProducts,
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
  console.log('tag_id',tag_id)
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
          titleStyle={[{...globalStyles.title}, S.listTitle]}
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


  const onSearchCardPress = (searchCard : Shop.SearchCard) => {
    let refinementList = {}
    if(searchCard.brand_name){
      refinementList.brand_name = searchCard.brand_name
    }  
    if(searchCard.subtype_id){
      refinementList.subtype_id = searchCard.subtype_id
    }  
    if(searchCard.type_id){
      refinementList.type_id = searchCard.type_id
    }  
    if(searchCard.category_id){
      refinementList.category_id = searchCard.category_id
    }  
    search(searchCard.title, {  
      refinementList
      }, constants.clothes)
  }

  const _renderPopularBrands = () => (
    <View style={[S.listWhiteBox]}>
      <Text xxmediumSize style={[{...globalStyles.title},S.listTitle]}>{'Popular Brands'}</Text>
      <ScrollView style={{marginTop: 15}} 
        horizontal 
        showsHorizontalScrollIndicator={false}>
        {popular_brands.map((b : Shop.Brand) => (
            <SimplifiedCard 
              onPress={() => onBrandCardPress(b)}
              source={{uri: b.image.src}}
              title={b.title}
              />
        // <TouchableOpacity onPress={() => onBrandCardPress(b)}>
          //     <Card
          //       key={b.title}
          //       title={b.title}
          //       titleStyle={S.cardTitle}
          //       image={{uri: b.image.src}}
          //       imageProps={{resizeMode : "contain"}}
          //       containerStyle={{
          //         width: constants.DEVICE_WIDTH * 0.35,
          //         marginHorizontal: 5,
          //       }}
          //     />
          // </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const _renderCategoryProduct = () => (
    <View style={[S.listBox]}>
      <GridList 
        title={title}
        titleProps={{numberOfLines: 1}}
        listName={constants.newin}
        titleStyle={[{...globalStyles.title},S.listTitle]}
        items={categoryProducts}
        />
    </View>
  );

  const _renderEssential = () => (
    <>
        {
          essentialList && essentialList.subtypes &&
          <View key={essentialList.title} style={[S.listWhiteBox]}>
            <Text mediumSize style={[{...globalStyles.title},S.listTitle]}>{essentialList.title}</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{marginTop: 15}}
              contentContainerStyle={{paddingLeft: 15}}
              >
              {essentialList.subtypes && 
                essentialList.subtypes.map((st, i) => (
                  <SimplifiedCard 
                    onPress={() => search(st.title, 
                      {
                        // title: st.title,
                        refinementList: {
                          type_id : [st.id]
                        }
                      }, 
                    constants.clothes)}
                    source={{uri: st.image ? st.image.src : ''}}
                    title={st.title}
                    />
              ))}
            </ScrollView>
          </View>
        }
    </>
  )

  if(loading){
    return <View style={{flex:1, justifyContent:'center'}}>
      <Loading />
    </View>
  }


  return (
    <View style={{flex:1}}>
      <ClothesSearchHeader
        placeholder={title}
        showBack
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
            <FirestoreSlider 
                collection="slides"
                queries={[
                  ['tag_ids','array-contains',tag_id],
                  ['type','==','category']
                ]}
                transformItems={items  => items.sort((a,b) => a.priority - b.priority).slice(0,1)}
                >
                {(slides) => <FirestoreSlider.Slides 
                        titleStyle={[globalStyles.text,  {fontSize: wp(6)}]}
                        subtitleStyle={[globalStyles.text, {
                          fontSize: wp(4), 
                          marginTop: 15, 
                          textDecoration: "underline"
                        }]}
                        disabled={true}
                        onSlidePress={(slide) => {
                            // search(slide.title, {
                            //   // title: slide.title,
                            //   refinementList: {
                            //     tag_ids:  [slide.tag_ids]
                            //   }
                            // }, constants.clothes)
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

            <FirestoreSlider 
                // collection with high priority
                collection="collections"
                queries={[
                  ['tag_ids','array-contains',tag_id],
                ]}
                transformItems={items  => items.sort((a,b) => a.priority - b.priority).slice(0,1)}
                >
                {(collections : Shop.Collection[]) => collections && collections.length > 0 && (
                   <ScrollView>
                     {collections.map((collection) => (
                        <View style={[S.listWhiteBox]}>
                          <Text xxmediumSize style={[{...globalStyles.title},S.listTitle]}>{collection.title}</Text>
                          <ScrollView style={{marginTop: 15}} 
                            horizontal 
                            showsHorizontalScrollIndicator={false}>
                            {collection.searchCards && collection.searchCards.map((b : Shop.SearchCard) => (
                                <SearchCard 
                                  onPress={() => onSearchCardPress(b)}
                                  source={{uri: b.src}}
                                  title={b.title}
                                  />
                            ))}
                        </ScrollView>
                      </View>
                     ))}
                   </ScrollView>
                )}
            </FirestoreSlider>       

            <FirestoreSlider 
                collection="slides"
                queries={[
                  ['tag_ids','array-contains',tag_id],
                  ['type','==','category']
                ]}
                transformItems={items  => items.sort((a,b) => a.priority - b.priority).slice(1)}
                >
                {(slides) => slides && <FirestoreSlider.Slides 
                        titleStyle={[globalStyles.text,  {fontSize: wp(6)}]}
                        subtitleStyle={[globalStyles.text, {
                          fontSize: wp(4), 
                          marginTop: 15, 
                          textDecoration: "underline"
                        }]}
                        onSlidePress={(slide: Slide) => {
                          search(slide.title, {
                            // title: slide.title,
                            refinementList: {
                              tag_ids:  slide.tag_ids
                            }
                          }, constants.clothes)
                      }}
                        LoadingComponent={Loading}
                        entries={slides}
                      />}
            </FirestoreSlider>

            <FirestoreSlider 
                // other collections
                collection="collections"
                queries={[
                  ['tag_ids','array-contains',tag_id],
                ]}
                transformItems={items  => items.sort((a,b) => a.priority - b.priority).slice(1)}
                >
                {(collections : Shop.Collection[]) => collections && collections.length > 0 && (
                    <ScrollView>
                    {collections.map((collection) => (
                        <View style={[S.listWhiteBox]}>
                          <Text xxmediumSize style={[{...globalStyles.title},S.listTitle]}>{collection.title}</Text>
                          <ScrollView style={{marginTop: 15}} 
                            horizontal 
                            showsHorizontalScrollIndicator={false}>
                            {collection.searchCards && collection.searchCards.map((b : Shop.SearchCard) => {
                                console.log('b',b)
                                return (
                                  <SearchCard 
                                    onPress={() => onSearchCardPress(b)}
                                    source={{uri:  b.src}}
                                    title={b.title}
                                    />
                                )
                            })}
                        </ScrollView>
                      </View>
                    ))}
                  </ScrollView>
                )}
            </FirestoreSlider>    

            {_renderCategoryProduct()}
            <View style={{paddingHorizontal: 10}} >
              <ButtonBlack
                title="see all" 
                onPress={() => {
                  search(title, {
                      title,
                      refinementList: {
                          tag_ids:  [tag_id]
                      }
                      },
                    constants.clothes
                  )
                }}
                />
            </View>
          </View>
        </ScrollView>
      </Animatable.View>)}
    </View>
  );
};

export default Category;
