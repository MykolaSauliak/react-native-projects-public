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

type Props = {
  item: Shop.Product,
  similar_items: string[],
}

const ProductInfoView = ({
  item,
  item: {
    similar_items,
    favorite_count = 0,
    images,
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
  imageModalVisible,
  setImageModalVisible,
  imageIndex,
  setImageIndex,

  toNegotiation,
  setLastUpdate,
  lastUpdate, 
  isSignedIn,
  onProductPress,
  discountCount = 13.30,
  purchaseOver = 150,
  discountCode = 'RFO11',
  AUTHENTICATION_FEES,
} : Props) => {

  if(!AUTHENTICATION_FEES){
    AUTHENTICATION_FEES = (price * 0.1).toFixed(2)
  }

  const imagesURI = images && images.map(i => ({uri: i.src}));
  
  const renderHeader = () => {
    return (
      <HeaderWithCart
        title={title}
      />
    );
  };

  const _renderBottomBtns = () => (
    <View style={styles.btnRow}>
      <TouchableOpacity
        disabled={!isSignedIn}
        onPress={toNegotiation}
        style={[styles.cartBtn, {borderWidth: 1, backgroundColor: 'white'}]}>
        <Text style={[styles.buyBtn, {color: 'black'}]}>
          {isSignedIn ? i18n.t('product.makeanoffer') : 'Login to make an offer'}
        </Text>
      </TouchableOpacity>
    <ShoppingCartButton id={id}/>
    </View>
  );

  const paddingHorizontal = 15

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 0.8}}>
        {renderHeader()}
        <View style={{flex: 1, backgroundColor: colors.gray, paddingVertical: 15, paddingHorizontal}}>
            <GallerySwiper
              images={imagesURI}
              style={{height: constants.DEVICE_HEIGHT * 0.5}}
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
            <View style={{paddingBottom: 50}}>
                <Product.FavoriteRow item={item}/>
                <Product.Header   
                    type_name={type_name}
                    subtype_name={subtype_name}
                    brand_name={brand_name}
                    category_name={category_name}
                    />
                <Product.Chips 
                  we_love={we_love} 
                  vintage={vintage}
                  />
                <Product.Warantly 
                    warranty={warranty}
                    />
            </View>
          
            <View
              style={[
                styles.itemDetailsBox,
                {backgroundColor: null, borderRadius: 10, marginVertical: 15,paddingHorizontal},
              ]}>
              {toTimestamp(discountEnd) > Date.now() / 1000 ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
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
                  <PriceReductionButton item={item} />
              </View>
              <View style={{flex:1}}>
                  <WishlistButton item={item} />
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
