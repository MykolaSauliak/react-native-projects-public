import React, {useState, Suspense} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
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
import {Text, Touchable} from '../../components'
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
import Button from '../../components/Button/Button';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FavoriteButton from '../../containers/FavoriteButton'
import { ActivityIndicator } from '../../components';
import AuthenticationModal from "./components/AuthenticationModal";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { NavigationService, ShopService } from '../../services';
import _ from 'lodash'
import Gallery from 'react-native-image-gallery';
import AntDesign from 'react-native-vector-icons/AntDesign'
import RemoveFromSold from '../../containers/Buttons/RemoveFromSold/RemoveFromSold';
import TwoStateButton from '../../components/TwoStateButton/TwoStateButton';

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
    measurements,
    condition,

    description,
    price,
    currency,
    discount,
    discountEnd,
    we_love,
    vintage,
    shipping_country = "",
    no_negotiation = false,
    status,
    sale_status,
    status_updated_at,
  },
  sellerInfo: {
    avatar, 
    name, 
    last_name, 
    email, 
    sold_item, 
    uid,
    reputation,
    holidaymode,
    receive_negotiation 
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
  loggedInUser,
  loading,
} : Props) => {

  if(!AUTHENTICATION_FEES){
    // AUTHENTICATION_FEES = (price * 0.1).toFixed(2)
    AUTHENTICATION_FEES = 9.99
  }
  // console.log('item',item)
  let getMeasurementString = (measurements = {}) => {
      return `${measurements.width}x${measurements.height} ${measurements.unit} `
  }

  let [activeImage, setActiveImage] = useState(0)
  let [chatVisibile, setChatVisible] = useState(false)
  let [learnMoreVisible, setLearnMoreVisible] = useState(false)
  let [detailsVisible, setDetailsVisible] = useState(false)
  let [informationItemVisible, setInformationItemVisible] = useState(null)

  let imagesURI = images && images.map(i => ({source : {uri: i.src}}));
  // let imagesURI = images && images.map(i => ({url: i.src}));
  imagesURI = imagesURI || []

  const renderHeader = () => {
    return (
      <HeaderWithCart
        title={title}
      />
    );
  };


  const isNgtntCnBCrtd = () => {
    return loggedInUser?.uid && 
    !holidaymode && 
    !no_negotiation && 
    receive_negotiation != 'neither' && 
    uid != loggedInUser?.uid
  }

  const shBuyBtn = () => {
    return !holidaymode
  }

  // console.log('no_negotiation',no_negotiation)
  // console.log('holidaymode',holidaymode)
  // console.log('receive_negotiation',receive_negotiation)

  const _renderBottomBtns = () => (
    <>
    {status == constants.sold ? (
      <View style={styles.btnRow}>
        <ButtonBlack 
          inverse={true}
          title={'Create an alert'}
          onPress={() => NavigationService.navigateToAlertCreate({item: { brand_name, category_name, type_name}})}
          titleStyle={styles.buyBtn}
          containerStyle={styles.whiteBtn}
          />
      </View>
        ): (
      <>
        {(isNgtntCnBCrtd() || shBuyBtn()) && (<View style={styles.btnRow}>
          {isNgtntCnBCrtd() && (<ButtonBlack 
            inverse={true}
            title={isSignedIn ? i18n.t('product.makeanoffer') : 'Login to make an offer'}
            onPress={toNegotiation}
            disabled={!isSignedIn}
            titleStyle={styles.buyBtn}
            containerStyle={styles.whiteBtn}
            />)}
        {shBuyBtn() && <ShoppingCartButton  id={id}/>}
        </View>)}
      </>
    )}
    {/* // }) */}
    </>
  );

  const _renderImages = () => {
    return <View style={styles.imageContainer}>
      <Gallery
        images={imagesURI}
        style={styles.imageContainer}
        imageComponent={(props, dimension) => <Image {...props} style={{height: constants.DEVICE_HEIGHT * 0.4, width: '100%'}} defaultSource={constants.defaultImage}/>}
        // imageComponent={(props) => <Image {...props} defaultSource={constants.defaultImage}/>}
        onPageSelected={(index : number) => setActiveImage(index)}
        // onPageSelected={(index : number) => setActiveImage(index)}
        // Version *1.15.0 update
        // onEndReached={() => {
        //     // add more images when scroll reaches end
        // }}
        // Change this to render how many items before it.
        // initialNumToRender={1}
        // Turning this off will make it feel faster
        // and prevent the scroller to slow down
        // on fast swipes.
        // sensitiveScroll={false}
        />  
      </View>
  }

  const renderPagination = () => (
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
  )

   const renderPrice = () => (
     <View>
       {status == constants.sold && <Text style={{color: 'red'}}>{`Sold, `}<Text>{`on ${status_updated_at[constants.sold]}`}</Text></Text>}
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
      <Text style={styles.feesText}>+ {AUTHENTICATION_FEES} {constants.MONEY_SYMBOL} Authentication fees</Text>
    </View>
   )

   const _renderLearnMore = () => (
      <ListItem 
        leftIcon={{name :'shield-check-outline', type: "material-community", color: colors.orange, size: 25}}
        containerStyle={{backgroundColor:null, marginTop: 10}}
        titleStyle={{color:'#f25d22'}} 
        // onPress={() => {}}
        title={
        <>
          <Text style={{color: colors.orange, fontSize: 13}}>Physical control and authentication by our experts</Text>
            <TouchableOpacity onPress={() => setLearnMoreVisible(true)}>
              <Text style={{color: colors.orange, fontWeight: 'bold'}}>Learn more</Text>
            </TouchableOpacity>
        </> 
        }
    />
   )

   const _renderShortInfo = () => (
      <View style={{marginTop:5}}>
        {!_.isEmpty(measurements) && <Text style={{fontSize: 20}}>{getMeasurementString(measurements)}</Text>}
        {condition && <Text style={{fontSize: 20}}>{condition}</Text>}
        {material && <Text style={{fontSize: 20}}>{material}</Text>}
        <View style={{height: 1, borderWidth:0.5, marginTop: 10, opacity:0.2}}/>
        {description && description.length > 0 && <Text numberOfLines={4} style={{fontSize: 20}}>{"\" " + description + " \""}</Text>}
        <TouchableOpacity onPress={() => {
            setDetailsVisible(!detailsVisible)
            setInformationItemVisible(null)
          }}>
          <Text style={{color: colors.orange, textAlign: 'center'}}>View more</Text>
        </TouchableOpacity>
    </View>
   )

  const paddingHorizontal = 15
  if(loading){
    return <ActivityIndicator />
  }
  return (
    <>
      <AuthenticationModal 
          isModalVisible={learnMoreVisible} 
          toggleModal={() => setLearnMoreVisible(!learnMoreVisible)}/>
      <ProductDetailsModal 
          {...item}
          isModalVisible={detailsVisible} 
          informationItemVisible={informationItemVisible}
          toggleModal={() => setDetailsVisible(!detailsVisible)}
          />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 0.8}}>
        {renderHeader()}
        <View style={styles.container}>
              {_renderImages()}
              {renderPagination()}
              <View style={{paddingBottom:10}}>
                <Product.Header   
                    paddingHorizontal={paddingHorizontal}
                    type_name={type_name}
                    subtype_name={subtype_name}
                    brand_name={brand_name}
                    color={color}
                    material={material}
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
            {/* price block */}
            <View style={[styles.itemDetailsBox, {paddingHorizontal}]}>
              {renderPrice()}
              {_renderLearnMore()}
              {_renderShortInfo()}
            </View> 
            <View style={{flexDirection:'row', backgroundColor:colors.gray, padding: 15, paddingTop: 25}}>
            {loggedInUser?.uid == uid?(
                <>
                  <View style={{flex:1}}>
                  <TwoStateButton 
                      iconProps={{type: 'antdesign', name: "pluscircleo"}}
                      title="Add photo"
                      onPress={async () => await ShopService.uploadPhoto({product_id: id})}
                      disabled={images.length > 8}
                      color={colors.orange}
                      // toggledD
                      />
                  </View>
                  <View style={{flex:1}}>
                    <PriceReductionButton onPress={() => NavigationService.navigateToPriceInput()} item={item} color={colors.orange}/>
                  </View>
                  <View style={{flex:1, justifyContent:'center'}}>
                      <RemoveFromSold id={id} status={status}/>
                      {/* <AlertButton item={item} color={colors.orange} /> */}
                  </View>
                </>
              ): (
                <>
                  <View style={{flex:1}}>
                      <PriceReductionButton item={item} color={colors.orange}/>
                  </View>
                  <View style={{flex:1}}>
                      <WishlistButton item={item} color={colors.orange} />
                  </View>
                  <View style={{flex:1}}>
                      <AlertButton item={item} color={colors.orange} />
                  </View>
                </>
            )}
            </View>
            {/* item details */}
            {/* <Product.Details  
                color={color}
                material={material}
                printed={printed}
                condition={condition}
                /> */}
          <SellerInfo 
              name={name}
              last_name={last_name}
              sold_item={sold_item}
              avatar={avatar}
              reputation={reputation}
              uid={uid}
              />
            <Button 
                containerStyle={{marginVertical: 5, paddingHorizontal}}
                titleStyle={{color: colors.orange}}
                // onPress={() => setChatVisible(true)}
                onPress={() => NavigationService.navigateToCommentList({
                  seller_id: uid,
                  id
                })}
                buttonStyle={{borderWidth: 1, borderColor: colors.orange}}    
                title="contact seller"
              />
            {/* info snippets */}
            <View style={{paddingHorizontal, marginTop: 25}}>
              <ListItem 
                // ref={refs[.]}
                leftIcon={{type: "evilicon", name:"check"}}
                containerStyle={styles.detailsRow}  
                title="Quality control" 
                onPress={() => {
                  setDetailsVisible(!detailsVisible)
                  setInformationItemVisible(1)
                }}
                chevron
                />
              <ListItem 
                leftIcon={{type: "evilicon", name:"location"}}
                containerStyle={styles.detailsRow}  
                title={shipping_country}
                onPress={() => {
                  setDetailsVisible(!detailsVisible)
                  setInformationItemVisible(0)

                }}
                chevron
                />
              <ListItem 
                leftIcon={{type: "material-icons", name:"local-shipping"}}
                containerStyle={styles.detailsRow}  
                title="Shipping and returns"
                onPress={() => {
                  setDetailsVisible(!detailsVisible)
                  setInformationItemVisible(3) // match index of listitem in information tab of Details modal
                }}
                chevron
                />
              <ListItem 
                leftIcon={{type: "materialicons", name:"payment"}}
                containerStyle={styles.detailsRow}  
                title="100% secure payment"
                onPress={() => {
                  setDetailsVisible(!detailsVisible)
                  setInformationItemVisible(4)
                }}
                chevron
                />
            </View>
            <CommentListProvider 
                id={id}
                collection="comments"
                >
                <CommentList 
                    id={id}
                    title="Chat"
                    chatModalVisible={chatVisibile}
                    seller_id={uid}
                    // onModalToggle={(value: boolean) => setChatVisible(value)}
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
