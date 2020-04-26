import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import constants from '../constants';
import toTimestamp from '../utils/getDiscountEndTs';

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

const DraftListItem = ({
  id,
  steps,
  item,
  created_time,
  image,
  imageFirst,
  imageSecond,
  imageThird,
  imageFourth,
  imageFifth,
  category,
  type,
  subtype,
  brand,

  price,
  title,
  description,
  condition,

  count = 0,
  waranty,
  discount,
  discountEnd,
  discountEndTs,

  showNumber,
  showCheckBox,
  checked,
  onCheckBoxClick,

  // toWishlist,
  // fromWishlist,
  // fromDrafts,
  // toCart,
  // fromCart,

  // inWishlist,
  // inCart,

  onPress,
  numberSheetVisible,
  setNumberSheetVisible,
  openBottomSheet,
}) => {
  // console.log('id', id);
  // console.log('item',item)
  // const getDiscountPrice = (price) => {
  //     return pri
  // }
  const getDiscountPrice = (price, discount) => {
    return (price * ((100 - discount) / 100)).toFixed(1);
  };

  const getImage = () => {
    return imageFirst
      ? imageFirst.path
      : imageSecond
      ? imageSecond.path
      : imageThird
      ? imageThird.path
      : imageThird
      ? imageThird.path
      : imageFifth
      ? imageFifth.path
      : '';
  };
  // console.log('getImage', getImage());
  return (
    <ListItem
      key={id || item.created_time}
      leftElement={
        <View
          style={{
            flex: 0.4,
            alignItems: 'center',
            justifyContent: 'center',
            height: 75,
          }}>
          {showCheckBox === true && (
            <CheckBox checked={checked} onPress={() => onCheckBoxClick(item)} />
          )}
          <Image
            source={{
              uri: getImage()
                ? getImage()
                : 'https://via.placeholder.com/250x250?text=image+not+found',
            }}
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
          />
        </View>
      }
      // leftAvatar={{
      //     title: id,
      //     source: { uri: image || "https://via.placeholder.com/250x250?text=image+not+found" },
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
          <Text style={S.id}>
            {created_time ? `${created_time},` : ''}{' '}
            {item.selectedSellCategory ? item.selectedSellCategory.title : ''}
          </Text>
          <Text style={S.title}>
            {type ? type.title : type} {subtype ? subtype.title : subtype}
            {item.selectedSellType ? item.selectedSellType.title : ''}{' '}
            {item.selectedSellSubtype ? item.selectedSellSubtype.title : ''}
          </Text>
          <Text style={S.desc}>{item.selectedSellDescription}</Text>
          {/* <Text style={S.desc}>{condition}</Text> */}
          <Text style={S.desc}>{`${steps} step(s) remaining`}</Text>
        </View>
      }
      // subtitle={<View style={{width: '100%', marginTop: 15}}>
      //     {
      //         toTimestamp(discountEnd) > (Date.now() / 1000)
      //         ?   <>
      //             <View style={{flexDirection:'row'}}>
      //                 <Text style={[S.price, S.discountPrice]}>{price} {constants.MONEY_SYMBOL}</Text>
      //                 <Text style={S.discount}>- {discount} %</Text>
      //             </View>
      //             <Text style={[S.newPrice]}>{getDiscountPrice(price, discount)} {constants.MONEY_SYMBOL}</Text>
      //         </>
      //         : <Text style={S.price}>{price} {constants.MONEY_SYMBOL}</Text>
      //     }
      // </View>}
      bottomDivider
    />
  );
};

export default DraftListItem;
