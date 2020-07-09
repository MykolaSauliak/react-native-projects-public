import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import globalStyles from '../../styles';
import constants from '../../constants';
import toTimestamp from '../../utils/getDiscountEndTs';
import T from 'prop-types';
import {NavigationService} from '../../services';
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
import S from './style'
import SellerReputationChip from '../SellerStatusChip/SellerStatusChip';
import Chip from '../Chip/Chip';

const ProductCard = ({
  item,
  images,
  price,
  newPrice = 0,
  title,
  desc,
  id,
  sale_status,
  status, 
  color,
  count = 0,
  type_name = "",
  subtype_name = "",
  brand_name,
  favorite_count,
  favorite,
  waranty,
  country,
  seller,
  shipping_country,
  material = '',
  reputation,
  we_love,
  location = 'Paris',
  discount,
  discountEnd,
  discountEndTs,
  directShipping = false,

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
      style={[S.container, containerStyle]}>
      <CardItem
        style={S.headerContainer}>
        <Left style={S.headerLeft}>
          {/* <View> */}
          {/* <Body style={{}}> */}
          <SellerReputationChip reputation={reputation}/>
          {/* </Body> */}
        </Left>
        <Right
          style={S.headerRight}>
          {favorite_count && favorite_count > 0 ? (
            <Text style={S.favoriteCount}>{favorite_count}</Text>
          ) : null}
          {onFavoriteToggle != null && (
            <TouchableOpacity
              style={{}}
              onPress={() => onFavoriteToggle({id})}>
              <AntDesign
                name={favorite === true ? 'heart' : 'hearto'}
                size={15}
              />
            </TouchableOpacity>
          )}
        </Right>
      </CardItem>
      <TouchableOpacity onPress={() => onPress(item)}>
        <CardItem cardBody>
          <Image
            source={{uri: images  && images[0] &&  images[0].src }}
            style={{height: 125, width: '100%', flex: 1}}
            resizeMode="contain"
            defaultSource={constants.defaultImage}
          />
          {status == constants.sold && (<View style={{position: 'absolute', left: 0, right: 0,top:0,bottom: 0, backgroundColor: 'rgba(235, 237, 235, 0.5)', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[globalStyles.text, {fontWeight: 'bold'}]}>sold</Text>
          </View>)}
        </CardItem>
        <CardItem>
          <View
            style={{flex:1, alignItems: 'flex-start', height: 100}}>
            {we_love && (
              <Chip textStyle={{...globalStyles.we_love, fontSize: 12, }}>We love</Chip>
              // <Text style={[S.text, globalStyles.we_love]}>We love</Text>
            )}
            <Text style={[globalStyles.boldText,S.title]} numberOfLines={1}>{brand_name}</Text>
            <Text numberOfLines={1} style={[globalStyles.text, S.text]}>{`${color || ""} ${material || ""} ${subtype_name || ""}`}</Text>
            {/* <Text numberOfLines={1} style={[globalStyles.text, S.text]}>{`${type_name.length > 0 ? type_name + " " : ""}${material.length > 0 ? material + " " :""}${subtype_name.length> 0 ? subtype_name + ' ' : ""}`}</Text> */}
            {newPrice > 0 ? (
              // <View style={{}}>
              //   <Text style={[globalStyles.text, S.priceOld]}>
              //     {price} {constants.MONEY_SYMBOL}
              //   </Text>
                <Text numberOfLines={1} style={[globalStyles.text]}>
                  {newPrice} {constants.MONEY_SYMBOL}
                </Text>
            // {/* </View> */}
            ): (
              <Text numberOfLines={1} style={[globalStyles.text, S.text]}>
                {price} {constants.MONEY_SYMBOL}
              </Text>
            )}
          </View>
        </CardItem>
        <CardItem style={{flexDirection: 'column',  height: 65, justifyContent: 'flex-end'}}>
          {directShipping && (<Left>
                <View style={S.locationBox}>
                  <FontAwesome5 size={13} color='black
                  ' name="handshake" />
                  <Text numberOfLines={1} style={[globalStyles.text, S.text, S.bottomText]}>
                    Direct Shipping 
                    {/* {seller ? seller.shipping_country : shipping_country} */}
                  </Text>
                </View>
            </Left>)}
            {((seller && shipping_country) || shipping_country) && (<Left>
              <View style={S.locationBox}>
                <MaterialIcons size={15} color={colors.orange} name="place" />
                <Text numberOfLines={1} style={[globalStyles.text, S.text, S.bottomText]}>
                  {shipping_country}
                  {/* {seller ? seller.shipping_country : shipping_country} */}
                </Text>
              </View>
          </Left>)}
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
