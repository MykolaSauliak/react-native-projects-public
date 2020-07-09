import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import constants from '../../constants';
import toTimestamp from '../../utils/getDiscountEndTs';
import NumericInput from 'react-native-numeric-input';
import T from 'prop-types';
import {   Text } from "..";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Avatar from '../Avatar/Avatar';
import { RadioButton } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Shop } from '../../types/Shop.type';
import S from './style'

type Props = Shop.Product & {
  inCart?:boolean,
  showCounter?:boolean,
  onCheckBoxClick?:() =>void,
  onCountChange?: (count: number) => void,
}


const ProductListItem = ({
  item,
  id,
  image,
  brand_name,
  type_name,
  subtype_name,
  images,
  price,
  currency,
  title,
  subtitle,
  desc,
  count = 0,
  waranty,
  discount,
  discountEnd,
  discountEndTs,

  showNumber,
  showCartIcon,
  showRightPrice,
  showCounter,
  showCheckBox,
  checked,
  onCheckBoxClick,
  onCountChange,

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
  priceStyle,
  ...props
} : Props) => {
  // console.log('inCart',inCart)
  // console.log('image',image)
  // const getDiscountPrice = (price) => {
  //     return pri
  // }

  const getImageURI = () => {
    return (image && image.src) || (images && images[0] && images[0].src);
  };

  const getDiscountPrice = (price, discount) => {
    return (price * ((100 - discount) / 100)).toFixed(1);
  };

  const renderRightElement = () => {
    return (
      <View
        style={{
          flex: 0.3,
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        }}>
        {showRightPrice ? (
          <View style={S.priceContainer}><Text style={[S.price, priceStyle]}>{`${price} ${constants.MONEY_SYMBOL}`}</Text></View>
        ) : inWishlist == true ? (
          <TouchableOpacity onPress={() => fromWishlist(id)}>
            <AntDesign name="star" size={25} color={'gray'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => toWishlist(item)}>
            <AntDesign name="staro" size={25} />
          </TouchableOpacity>
        )}
        {showCounter === true ? (
          <NumericInput
            iconSize={5}
            containerStyle={{marginTop: 15, backgroundColor: 'white'}}
            value={count}
            maxValue={999}
            minValue={1}
            // iconStyle={{}}
            onChange={(value:number) => onCountChange && onCountChange(value)}
          />
        ) : showCartIcon ? (
          inCart === true ? (
            <TouchableOpacity
              style={[S.cartBtn, {backgroundColor: 'gray'}]}
              onPress={() => fromCart({id})}>
              <AntDesign name="shoppingcart" size={25} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[S.cartBtn]} onPress={() => toCart({id})}>
              <AntDesign name="shoppingcart" size={25} color="white" />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    );
  };

  return (
    <ListItem
      {...props}
      Component={TouchableWithoutFeedback}
      leftElement={
        <View
          style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
          {showCheckBox && (
            <RadioButton active={checked} onPress={onCheckBoxClick}/>
          )}
          <TouchableOpacity 
          style={{width: '100%', height: 75}}
          onPress={onPress}>
            <Image
              source={{
                uri: getImageURI(),
              }}
              resizeMode="contain"
              style={{width: '100%', height: 75}}
            />
          </TouchableOpacity>

        </View>
      }
      // leftAvatar={{
      //     title: id,
      //     source: { uri: image },
      //     showEditButton: false,
      //     rounded: false,
      //     titleStyle : {
      //         color: 'black'
      //     }
      //   }}

      // onPress={onPress}
      containerStyle={{
        flex: 0.3,
        backgroundColor: 'white',
        minHeight: 100,
        ...containerStyle,
      }}
      title={
        <View style={{flex: 1}}>
          {/* {id && <Text style={S.id}>{id}</Text>} */}
          <Text style={S.title}>
            {brand_name} {type_name} {subtype_name}
          </Text>
          {desc && <Text style={S.desc}>{desc}</Text>}
          {/* {toTimestamp(discountEnd) > Date.now() / 1000 ? (
            <>
              <View style={{flexDirection: 'row'}}>
                <Text style={[S.price, S.discountPrice]}>
                  {price} {constants.MONEY_SYMBOL}
                </Text>
                <Text style={S.discount}>- {discount} %</Text>
              </View>
              <Text style={[S.newPrice]}>
                {getDiscountPrice(price, discount)} {constants.MONEY_SYMBOL}
              </Text>
            </>
          ) : (
            <Text style={S.price}>
              {price} {currency || constants.MONEY_SYMBOL}
            </Text>
          )} */}
        </View>
      }
      // subtitle={
      //   <View style={{width: '100%', marginTop: 5}}>
      //     {/* {subtitle && <Text>{subtitle}</Text>} */}  
      //   </View>
      // }
      rightElement={renderRightElement()}
      bottomDivider
    />
  );
};

ProductListItem.propTypes = {
  containerStyle: T.object,
  image: T.string,
  type_name: T.string,
  subtype_name: T.string,
  showCounter: T.bool,
  showCartIcon: T.bool,
  onCountChange: T.func,
};

ProductListItem.defaultProps = {
  containerStyle: {},
  image: '',
  type_name: '',
  subtype_name: '',
  showCounter: false,
  showCartIcon: true,
  onCountChange: (count:number) => console.log('new count - ', count),
};

export default ProductListItem;
