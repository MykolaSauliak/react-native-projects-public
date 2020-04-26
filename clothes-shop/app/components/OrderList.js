import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import constants from '../constants';

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
  title: {
    color: 'black',
    fontSize: 17,
  },
  price: {
    fontSize: 18,
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
});

const OrderList = ({
  city,
  country_code,

  image,
  total,
  items,

  title,
  desc,
  id,
  count = 0,
  waranty,
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
}) => {
  // //console.log('inCart',inCart)
  // //console.log('price',price)
  // const getDiscountPrice = (price) => {
  //     return pri
  // }
  const getDiscountPrice = (price, discount) => {
    return (price * ((100 - discount) / 100)).toFixed(1);
  };

  return (
    <ListItem
      leftElement={
        <View
          style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
          {showCheckBox === true && (
            <CheckBox checked={checked} onPress={() => onCheckBoxClick(item)} />
          )}
          <Image
            source={{uri: image}}
            resizeMode="contain"
            style={{width: '100%', height: 75}}
          />
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

      onPress={onPress}
      containerStyle={{minHeight: 100}}
      title={
        <View style={{flex: 1}}>
          <Text style={S.id}>{id}</Text>
          <Text style={S.title}>{title}</Text>
          <Text style={S.desc}>{desc}</Text>
        </View>
      }
      subtitle={
        <View style={{width: '100%', marginTop: 15}}>
          {discountEndTs > Date.now() / 1000 ? (
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
              {price} {constants.MONEY_SYMBOL}
            </Text>
          )}
        </View>
      }
      rightElement={
        <View
          style={{
            flex: 0.3,
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}>
          {inWishlist == true ? (
            <TouchableOpacity onPress={() => fromWishlist(id)}>
              <AntDesign name="star" size={25} color={colors.orange} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => toWishlist(item)}>
              <AntDesign name="staro" size={25} />
            </TouchableOpacity>
          )}
          {showNumber == true ? (
            <TouchableOpacity
              style={[S.cartBtn, S.countBox]}
              onPress={() => openBottomSheet(id)}>
              <Text style={{fontSize: 17, paddingHorizontal: 4}}>{count}</Text>
              <FontAwesome name="sort" size={25} color={colors.orange} />
            </TouchableOpacity>
          ) : inCart === true ? (
            <TouchableOpacity
              style={[S.cartBtn, {backgroundColor: 'green'}]}
              onPress={() => fromCart(id)}>
              <AntDesign name="shoppingcart" size={25} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[S.cartBtn]} onPress={() => toCart(id)}>
              <AntDesign name="shoppingcart" size={25} color="white" />
            </TouchableOpacity>
          )}
        </View>
      }
      bottomDivider
    />
  );
};

export default OrderList;
