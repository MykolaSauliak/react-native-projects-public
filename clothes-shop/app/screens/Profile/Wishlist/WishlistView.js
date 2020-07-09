import React from 'react';
import {
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import ProductListItem from '../../../components/ProductListItem/ProductListItem';
import globalStyles from '../../../styles';
import colors from '../../../styles/colors';
import i18n from '../../../i18n';
import {NavigationService} from '../../../services';
import { BackHeaderCenter } from '../../../components';
import { GridList } from '../../../containers';
import {  Text} from '../../../components';

const S = StyleSheet.create({
  header: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width:'100%',
    marginVertical: 10,
  },
});

const WishlistView = ({
  wishlistItems,
  cartItems,
  showEdit,
  setShowEdit,
  markedItems,

  toWishlist,
  fromWishlist,
  isInWishlist,
  isInCart,
  toCart,
  fromCart,
  openProductInfo,
  toggleItemMark,

  markedToWishlist,
  markedToCart,
  markedDelete,
}) => {

  // const _renderHeader = (cart = false) => (
  //   <Header
  //     containerStyle={{backgroundColor: 'white'}}
  //     leftComponent={
  //       showEdit ? (
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             justifyContent: 'space-around',
  //           }}>
  //           {showEdit === true && (
  //             <>
  //               <TouchableOpacity
  //                 style={{paddingHorizontal: 5}}
  //                 onPress={markedDelete}>
  //                 <Icon name="delete" color="black" size={30} />
  //               </TouchableOpacity>
  //               <TouchableOpacity
  //                 style={{paddingHorizontal: 5}}
  //                 onPress={markedToCart}>
  //                 <Icon name="shopping-cart" color="black" size={30} />
  //               </TouchableOpacity>
  //             </>
  //           )}
  //         </View>
  //       ) : (
  //         {
  //           icon: 'arrow-back',
  //           color: 'black',
  //           onPress: () => NavigationService.navigateToProfile(),
  //         }
  //       )
  //     }
  //     centerComponent={{
  //       text: 'My wishlist',
  //       style: {color: 'black', fontSize: 20},
  //     }}
  //     rightComponent={{
  //       text: showEdit ? 'done' : 'edit',
  //       color: 'black',
  //       onPress: () => setShowEdit(!showEdit),
  //     }}
  //   />
  // );

  //console.log('wishlist',wishlist)
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar backgroundColor={colors.gray}/> */}
      {/* {_renderHeader()} */}
      <BackHeaderCenter title="My WishList" />
      <GridList 
        items={wishlistItems}
        />
      {/* <FlatList
        keyExtractor={item => item.id + showEdit}
        data={wishlistItems}
        renderItem={({item}) => (
          <ProductListItem
            showCheckBox={showEdit}
            checked={
              markedItems.filter(i => i.id == item.id).length > 0 ? true : false
            }
            onCheckBoxClick={toggleItemMark}
            toWishlist={toWishlist}
            fromWishlist={fromWishlist}
            fromCart={fromCart}
            toCart={toCart}
            {...item}
            item={item}
            inWishlist={isInWishlist({id: item.id})}
            inCart={isInCart({id: item.id})}
            onPress={() => openProductInfo(item)}
          />
        )}
      /> */}
    </View>
  );
};

export default WishlistView;
