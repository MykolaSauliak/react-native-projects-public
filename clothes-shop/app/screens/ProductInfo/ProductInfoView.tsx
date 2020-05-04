import React, {useState, Suspense} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../../styles/colors';
import constants from '../../constants';
import globalStyles from '../../constants/styles';
import T from 'prop-types';
import i18n from '../../i18n';
import toTimestamp from '../../utils/getDiscountEndTs';
import {ListItem} from 'react-native-elements';
import styles from './ProductInfo.style.js';
import GallerySwiper from 'react-native-gallery-swiper';
import Loading from '../../components/Loading'
import {
  AlertButton,
  WishlistButton,
  PriceReductionButton,
  CommentList,
  RecentlyViewed,
  HeaderWithCart,
  DiscoverMoreProducts
} from '../../containers'
import CommentListProvider from '../../containers/Comments/CommentListProvider';
import {Shop} from '../../types/Shop.type';
import Product from '../../components/Product/Product';
import SellerInfo from '../../components/SellerInfo/SellerInfo';
import ShoppingCartButton from '../../containers/ShoppingCartButton/ShoppingCartButton';
import { payments } from "../../utils";
import ButtonBlack from '../../components/Button/ButtonBlack';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FavoriteButton from '../../containers/FavoriteButton'
import { ActivityIndicator } from '../../components';

type Props = {
  item: Shop.Product,
  similar_items: string[],
}

const ProductInfoView = ({
  item,
  item: {
    similar_items,
    favorite_count = 0,
    images = [],
    brand_name = '',
    brand_id,
    category_name,
    category_id,
    type_name = '',
    type_id,
    subtype_name = '',
    subtype_id,
    id,
    warranty,
    title,
    color,
    material,
    printed,
    condition,

    description,
    price,
    currency,
    discount,
    discountEnd,
    we_love,
    vintage,
  },
  sellerInfo: {
    avatar, 
    name, 
    last_name, 
    email, 
    sold_item, 
    uid,
    reputation,
  },
  toNegotiation,
  setLastUpdate,
  lastUpdate, 
  isSignedIn,
  onProductPress,
  discountCount = 13.30,
  purchaseOver = 150,
  discountCode = 'RFO11',
  AUTHENTICATION_FEES,

  loading,
} : Props) => {

  if(!AUTHENTICATION_FEES){
    AUTHENTICATION_FEES = (price * 0.1).toFixed(2)
  }

  let [activeImage, setActiveImage] = useState(0)

  let imagesURI = images && images.map(i => ({uri: i.src}));
  imagesURI = imagesURI || []

  const renderHeader = () => {
    return (
      <HeaderWithCart
        title={title}
      />
    );
  };

  const _renderBottomBtns = () => (
    <View style={styles.btnRow}>
      <ButtonBlack 
        inverse={true}
        title={isSignedIn ? i18n.t('product.makeanoffer') : 'Login to make an offer'}
        onPress={toNegotiation}
        disabled={!isSignedIn}
        titleStyle={styles.buyBtn}
        containerStyle={{borderColor: 'black', borderWidth: 1, marginRight: 2,}}
        
        />
      {/* <TouchableOpacity
        disabled={!isSignedIn}
        onPress={toNegotiation}
        style={[styles.cartBtn, {borderWidth: 1, backgroundColor: 'white'}]}>
        <Text style={[styles.buyBtn, {color: 'black'}]}>
          {isSignedIn ? i18n.t('product.makeanoffer') : 'Login to make an offer'}
        </Text>
      </TouchableOpacity> */}
    <ShoppingCartButton  id={id}/>
    </View>
  );

  const paddingHorizontal = 15
  if(loading){
    return <ActivityIndicator />
  }
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 0.8}}>
        {renderHeader()}
        <View style={{flex: 1, backgroundColor: colors.gray, paddingVertical: 15}}>
            <View style={{height: constants.DEVICE_HEIGHT * 0.4}}>
              <GallerySwiper
                images={imagesURI}
                style={{height: constants.DEVICE_HEIGHT * 0.4}}
                onPageSelected={(index : number) => setActiveImage(index)}
                // Version *1.15.0 update
                // onEndReached={() => {
                //     // add more images when scroll reaches end
                // }}
                // Change this to render how many items before it.
                // initialNumToRender={2}
                // Turning this off will make it feel faster
                // and prevent the scroller to slow down
                // on fast swipes.
                sensitiveScroll={false}
                />  
              </View>

              <View style={{paddingBottom: 20}}>
                <View
                    style={styles.favoriteRow}
                    > 
                    <View style={{flex:1, justifyContent:'flex-start', marginLeft: -20}}>
                      <Pagination
                        dotsLength={images.length}
                        activeDotIndex={activeImage}
                        containerStyle={{ backgroundColor: null , margin: 0, padding: 0}}
                        dotStyle={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginHorizontal: 1,
                            margin:0,
                            backgroundColor: 'black'
                        }}
                        inactiveDotStyle={{
                            // Define styles for inactive dots here
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                      />
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end', alignItems:'flex-start'}}>
                      <FavoriteButton 
                          containerStyle={{padding: 5}}
                          item={item}
                          count={item.favorite_count}
                          color={colors.orange}
                          />  
                    </View>
                </View>
                <Product.Header   
                    paddingHorizontal={paddingHorizontal}
                    type_name={type_name}
                    subtype_name={subtype_name}
                    brand_name={brand_name}
                    category_name={category_name}
                >
                  <Product.Chips 
                    we_love={we_love} 
                    vintage={vintage}
                    />
                </Product.Header>
                <Product.Warantly 
                    warranty={warranty}
                    />
            </View>
            <View
              style={[
                styles.itemDetailsBox,
                {backgroundColor: null, borderRadius: 10, marginVertical: 5,paddingHorizontal},
              ]}>
              {toTimestamp(discountEnd) > Date.now() / 1000 ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={[globalStyles.price, globalStyles.discountPrice]}>
                      {price} {constants.MONEY_SYMBOL}
                    </Text>
                    <Text style={globalStyles.discount}>- {discount} %</Text>
                  </View>
                  <Text style={[globalStyles.newPrice]}>
                    {payments.getDiscountPrice(price, discount)} {constants.MONEY_SYMBOL}
                  </Text>
                </>
              ) : (
                <Text style={globalStyles.price}>
                  {price} {constants.MONEY_SYMBOL}
                </Text>
              )}
              <Text>+ {AUTHENTICATION_FEES} {constants.MONEY_SYMBOL} Authentication fees</Text>
                <ListItem 
                  leftIcon={{name :'shield-check-outline', type: "material-community", color: "#f25d22", size: 35}}
                  containerStyle={{backgroundColor:null, marginVertical: 10}}
                  titleStyle={{color:'#f25d22'}} 
                  // onPress={() => {}}
                  title="Physical control and authentication by our experts"
                  />
                <View style={{marginVertical:25}}>
                  <Text style={{fontSize: 20}}>{condition}</Text>
                  <Text style={{fontSize: 20}}>{material}</Text>
                  <View style={{height: 1, borderWidth:0.5, marginVertical: 10, opacity:0.2}}/>
                  <Text style={{fontSize: 20}}>{description}</Text>
                </View>
            </View> 

            <View style={{flexDirection:'row', backgroundColor:'white',padding: 15, marginVertical: 15}}>
              <View style={{flex:1}}>
                  <PriceReductionButton item={item} color={colors.orange}/>
              </View>
              <View style={{flex:1}}>
                  <WishlistButton item={item} color={colors.orange} />
              </View>
            </View>
            {/* item details */}
            <Product.Details  
                color={color}
                material={material}
                printed={printed}
                condition={condition}
                />
            <SellerInfo 
              name={name}
              last_name={last_name}
              sold_item={sold_item}
              avatar={avatar}
              reputation={reputation}
              uid={uid}
              />
            <CommentListProvider 
              id={id}
              collection="comments">
                  <CommentList 
                    id={id}
                    title="Comments"
                    // comments={comments}
                    containerStyle={{paddingHorizontal, paddingVertical: paddingHorizontal}}
                    />
            </CommentListProvider>
            <Suspense fallback={<Loading />}>
                <DiscoverMoreProducts
                    collection="clothes"
                    onLoaded={() => setLastUpdate(Date.now())}
                    containerStyle={{paddingHorizontal}}
                    onPress={onProductPress}
                    product_ids={similar_items}
                    />  
            </Suspense>
            <RecentlyViewed 
                containerStyle={{paddingLeft: paddingHorizontal, paddingVertical: paddingHorizontal}}
                onPress={onProductPress}
                />    
        </View>
      </ScrollView>
      {_renderBottomBtns()}
    </>
  );
};

ProductInfoView.deafaultProps = {
  item: {},
  brand_name: '',
  type_name:'',
  subtype_name:'',
  condition: 'Good condition',
  price: 90,
  images: [],
  vintage: true,
  similar_items: [],
  specs: [
    {
      key: 'height',
      value: '90cm',
    },
  ],
  we_love: true,
  recently_viewed: [],
  seller: {
    image: {
      uri:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    },
    name: 'Georg',
    sold_item: 1,
  },
};

ProductInfoView.propTypes = {
  id: T.string,
};

export default ProductInfoView;
