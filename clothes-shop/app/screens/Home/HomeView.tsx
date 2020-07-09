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

const SimplifiedCard = ({
  onPress = () => {},
  source,
  title
}) => (
  <TouchableOpacity
    style={[S.listCard]}
    onPress={onPress}
    >
    <View style={{backgroundColor: colors.gray,padding:10, }}>
      <Image 
        source={source}
        resizeMode="contain"
        style={{width: constants.DEVICE_WIDTH * 0.3, aspectRatio: 1/1,  }}
        
        />
    </View>
    <Text style={{marginVertical: 10, fontSize: wp(5)}}>{title}</Text>
</TouchableOpacity>
)

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
    if(!weLoveProducts || weLoveProducts.length == 0){
      return null
    }
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

  const _renderNewIn = () => (
    <View style={[S.listBox]}>
      <GridList 
        title="New in"
        // items={[]}
        listName={constants.newin}
        fetchMore={async (listItem) => {
          if(!listItem){
            console.log('fetch items')
            const {items: new_in = [], new_in_count } = await ShopService.getGoods({
              [constants.clothes_fields.status] : Shop.Status[2]
            });
            return new_in || []
          }else{
            console.log(listItem?.created_time)
            let {items : products} = await ShopService.getGoods({
              [constants.clothes_fields.status] : Shop.Status[2]
            }, {}, 5, {field: 'created_time', direction: "desc"}, listItem?.created_time);
            return products || []
          }
          
        }}
        titleStyle={[{...globalStyles.title},S.listTitle]}
        // items={new_in_products}
        />
      {/* <Button title="view all" titleStyle={{ color: 'white'}} onPress={() => openList(constants.we_love)} buttonStyle={{backgroundColor:'#cc815e',}}/> */}
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
                queries={[['type','==','topBanner']]}
                >
                {(banners :  Shop.TopBanner[]) => {
                  console.log(banners)
                  return banners.length> 0 && (<View style={{backgroundColor: 'black',padding:5}}>
                    <Text style={S.topBanner}>{banners[0].title}</Text>
                  </View>)}
                }
            </FirestoreSlider>
            <CategoriesCircles lists={lists} onPress={(list) => {
                  NavigationService.navigateToCategory({
                    title: list.title,
                    tag_id: list.tag_id
                  })
            }}/>
            <FirestoreSlider 
                collection="slides"
                queries={[['type','==','main']]}>
                {(slides) => <FirestoreSlider.Slides 
                        titleStyle={[globalStyles.text,  {fontSize: wp(6)}]}
                        subtitleStyle={[globalStyles.text, {fontSize: wp(4), marginTop: 15, textDecoration: "underline"}]}
                        
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
            {_renderPopularBrands()}
            {_renderWeLoveSection()}
            {_renderEssential()}
            {_renderFavoriteProducts()}
            {_renderNewIn()}
          </View>
        </ScrollView>
      </Animatable.View>)}
    </View>
  );
};

export default HomeView;
