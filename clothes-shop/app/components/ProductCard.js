import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import globalStyles from '../constants/styles';
import constants from '../constants';
import toTimestamp from '../utils/getDiscountEndTs';
import T from 'prop-types';
import {NavigationService} from '../services';
import {
  Container,
  Header,
  Content,
  Card,
  Left,
  Right,
  CardItem,
  Body,
  Text,
} from 'native-base';
import {SharedElement} from 'react-native-motion';

const S = StyleSheet.create({
  cartBtn: {
    padding: 12,
    // position: "absolute",
    bottom: 0,
    backgroundColor: colors.orange,
    borderRadius: 5,
    marginTop: 20,
  },
  id: {
    // color: colors.gray,
    color: 'gray',
    fontSize: 13,
  },
  text: {
    fontSize: 14,
  },
  title: {
    color: 'black',
    fontSize: 17,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
  },
  newPrice: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  discountPrice: {
    color: 'gray',
    marginHorizontal: 3,

    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  desc: {
    fontSize: 15,
    color: 'gray',
  },
  discount: {
    fontWeight: 'bold',
    backgroundColor: 'red',
    borderRadius: 5,
    color: 'white',
    padding: 3,
    // padding: 5
  },
  countBox: {
    backgroundColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoriteCount: {
    borderRadius: 5,
    fontSize: 10,
    marginTop: 2,
    backgroundColor: colors.gray,
    textAlign: 'center',
    padding: 2,
  },
  trusted_seller: {
    // position: 'absolute',
    // left: 2,
    // top: 2,
    backgroundColor: colors.sepiaLight,
    borderRadius: 3,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trusted_seller_text: {
    fontSize: 9,
    textAlign: 'center',
    color: colors.sepiaDark,
    // marginRight:2
  },
  favoriteBox: {
    // position: 'absolute',
    // right: 2,
    // top: 2,
  },
  locationBox: {
    width: '100%',
    // justifyItems:
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const ProductCard = ({
  item,
  images,
  price,
  title,
  desc,
  id,
  count = 0,
  type_name,
  subtype_name,
  brand_name,
  favorite_count,
  favorite,
  waranty,
  country,
  seller,
  shipping_country,
  material,
  reputation,
  we_love,
  location = 'Paris',
  discount,
  discountEnd,
  discountEndTs,

  showNumber,
  showCheckBox,
  checked,
  onCheckBoxClick,

  toWishlist,
  fromWishlist,
  toCart,
  fromCart,

  inWishlist,
  inCart,

  onPress,
  numberSheetVisible,
  setNumberSheetVisible,
  openBottomSheet,
  containerStyle,

  onFavoriteToggle,
}) => {
  // //console.log('inCart',inCart)
  // console.log('image',image)
  // const getDiscountPrice = (price) => {
  //     return pri
  // }

  // console.log('favorite_count', favorite_count);

  const getDiscountPrice = (price, discount) => {
    return (price * ((100 - discount) / 100)).toFixed(1);
  };
  // console.log('images ? images[0].src : ',images)
  return (
    <Card
      style={[
        {
          maxWidth: constants.DEVICE_WIDTH * 0.5,
          borderColor: 'white',
          elevation: 2,
        },
      ]}>
      <CardItem
        style={{
          width: '100%',
          margin: 5,
          top: 0,
          backgroundColor: null,
          position: 'absolute',
          zIndex: 2,
        }}>
        <Left style={{position: 'absolute', left: 0, top: 0}}>
          {/* <View> */}
          <Body style={{alignItems: 'center', justifyContent: 'center'}}>
            {reputation === 'trusted_seller' && (
              <View style={S.trusted_seller}>
                <AntDesign name="check" size={15} color={colors.sepiaDark} />
                <Text style={S.trusted_seller_text}> Trusted Seller</Text>
              </View>
            )}
            {reputation === 'expert_seller' && (
              <View style={S.trusted_seller}>
                <FontAwesome5 name="award" size={15} color={colors.sepiaDark} />
                <Text style={S.trusted_seller_text}> Expert Seller</Text>
              </View>
            )}
          </Body>
        </Left>
        <Right
          style={{
            position: 'absolute',
            right: 5,
            top: 0,
            alignItems: 'center',
          }}>
          {onFavoriteToggle != null && (
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => onFavoriteToggle({id})}>
              <AntDesign
                name={favorite === true ? 'heart' : 'hearto'}
                size={15}
              />
            </TouchableOpacity>
          )}
          {favorite_count && favorite_count > 0 ? (
            <Text style={S.favoriteCount}>{favorite_count}</Text>
          ) : null}
        </Right>
      </CardItem>
      <TouchableOpacity style={{marginTop: 30}} onPress={() => onPress(item)}>
        <CardItem cardBody>
          <Image
            source={{uri: images  && images[0] &&  images[0].src }}
            style={{height: 150, width: null, flex: 1}}
            resizeMode="contain"
            defaultSource={constants.defaultImage}
          />
        </CardItem>
        <CardItem>
          <View
            style={{width: '100%', alignItems: 'flex-start', minHeight: 90}}>
            {we_love && (
              <Text style={[S.text, globalStyles.we_love]}>We love</Text>
            )}
            {/* <SharedElement id="product_title"> */}
            <Text style={[S.text, {fontWeight: 'bold'}]}>{brand_name}</Text>
            {/* </SharedElement> */}
            <Text style={[S.text]}>
              {type_name} {material} {subtype_name}
            </Text>
            {/* <Text style={S.text}>{title}</Text> */}
            <Text style={[S.text]}>
              {price} {constants.MONEY_SYMBOL}
            </Text>
          </View>
        </CardItem>
        <CardItem>
          <Left style={{height: 30}}>
            {((seller && shipping_country) || shipping_country) && (
              <View style={S.locationBox}>
                <MaterialIcons color={colors.sepiaDark} name="place" />
                <Text style={S.text}>
                  {seller ? seller.shipping_country : shipping_country}
                </Text>
              </View>
            )}
          </Left>
        </CardItem>
      </TouchableOpacity>
    </Card>
    // <Card
    //   containerStyle={{margin: 4, flex:0.5}}
    //   // image={{uri: images ? images[0].src : ''}}
    //   // imageProps={{resizeMode: 'contain'}}
    //   // imageWrapperStyle={{onPress: () => Alert.alert('click')}}
    //   >
    //   <View style={S.favoriteBox}>
    //     {onFavoriteToggle != null && (
    //       <TouchableOpacity
    //         style={{padding: 5}}
    //         onPress={() => onFavoriteToggle({id})}>
    //         <AntDesign name={favorite ? 'heart' : 'hearto'} size={15} />
    //       </TouchableOpacity>
    //     )}
    //     {favorite_count && (
    //       <Text style={S.favoriteCount}>{favorite_count}</Text>
    //     )}
    // </View>
    //   <TouchableOpacity
    //       onPress={() => onPress(item)}
    //       // style={{
    //       //    alignItems:'center',
    //       //      backgroundColor: 'white',
    //       //   padding: 10
    //       // }}
    //     >
    //     {/* <View> */}
    //     <Image
    //         source={{uri : images ? images[0].src : ''}}
    //         style={{ width: '100%' }}
    //         resizeMode="contain"
    //         PlaceholderContent={<ActivityIndicator />}
    //         />
    //     <View style={{flexDirection: 'row', width: '100%', marginBottom: 25}}>
    //

    //     </View>
    //     {/* <TouchableOpacity style={{alignItems:'center', backgroundColor: 'white'}} onPress={onPress}> */}
    //     {/* <Image source={{uri : images ? images[0].src : images}} style={{width: "90%", height: 100}} resizeMode="contain"/> */}
    //     <View style={{width: '100%', alignItems: 'flex-start', minHeight: 120}}>
    //       {we_love && (
    //         <Text style={[S.text, globalStyles.we_love]}>We love</Text>
    //       )}
    //       <Text style={[S.text, {fontWeight: 'bold'}]}>{brand_name}</Text>
    //       <Text style={[S.text, {fontWeight: 'bold'}]}>{material}</Text>
    //       {/* <Text style={S.text}>{title}</Text> */}
    //       <Text style={[S.text, S.price]}>
    //         {price} {constants.MONEY_SYMBOL}
    //       </Text>
    //     </View>
    //     {(seller && seller.shipping_country || shipping_country) && (
    //       <View style={S.locationBox}>
    //         <MaterialIcons color={colors.sepiaDark} name="place" />
    //         <Text style={S.text}>{seller.shipping_country || shipping_country}</Text>
    //       </View>
    //     )}
    //   </TouchableOpacity>
    //   {/* </View> */}
    // </Card>
    // </View>
  );
};

ProductCard.propTypes = {
  onFavoriteToggle: T.func,
};

ProductCard.defaultProps = {
  onPress: item => NavigationService.navigateToProduct({...item}),
  reputation : "",
  we_love: false,
};

export default ProductCard;
