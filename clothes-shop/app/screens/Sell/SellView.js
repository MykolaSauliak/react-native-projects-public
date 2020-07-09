import React from 'react';
import {View, FlatList, StatusBar, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Icon} from 'react-native-elements';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import NotSignedIn from '../../components/NotSignedIn';
import DraftListItem from '../../containers/DraftListItem';
import {isInWishlist} from '../../features/wishlist/selectors';
import {isInCart} from '../../features/cart/selectors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../styles';
import colors from '../../styles/colors';
import i18n from '../../i18n';
import getStepRemained from '../../utils/getStepRemained';
import {NavigationService} from '../../services';
import {  Text, BackHeaderCenter} from '../../components';
import S from './Sell.styles'
import ButtonBlack from '../../components/Button/ButtonBlack';

const SellView = ({
  wishlist,
  seller,
  drafts,
  cartItems,
  showEdit,
  setShowEdit,
  markedItems,
  isSignedIn,
  // toWishlist,
  // fromWishlist,
  // toCart,
  fromDrafts,
  openDraftInfo,
  toggleItemMark,

  markedToWishlist,
  markedToCart,
  markedDelete,
  openAddItemScreen,
}) => {
  console.log('isSignedIn', isSignedIn);
  // const _renderHeader = (cart = false) => (
  //   <View style={S.header}>
  //     <View
  //       style={{
  //         flex: 0.25,
  //         flexDirection: 'row',
  //         justifyContent: 'space-around',
  //       }}>
  //       {showEdit === true && (
  //         <>
  //           <TouchableOpacity
  //             style={{paddingHorizontal: 5}}
  //             onPress={markedDelete}>
  //             <Icon name="delete" color="black" size={30} />
  //           </TouchableOpacity>
  //           {/* {
  //                               cart == false
  //                               ? <TouchableOpacity  style={{paddingHorizontal: 5}} onPress={markedToCart}>
  //                                   <Icon name="shopping-cart" color="black" size={30}/>
  //                               </TouchableOpacity>
  //                               :  <TouchableOpacity  style={{paddingHorizontal: 5}} onPress={markedToWishlist}>
  //                               <Icon name="star" color="black" size={30}/>
  //                           </TouchableOpacity>
  //                           } */}
  //         </>
  //       )}
  //     </View>
  //     <Text style={[globalStyles.text, {flex: 0.5, textAlign: 'center'}]}>
  //       {'Drafts'}{' '}
  //     </Text>
  //     {/* <Text style={[globalStyles.text, {flex: 0.5, textAlign:'center'}]}>{ i18n.t('wishlist.mywishlist')}</Text> */}
  //     <View style={{flex: 0.25}}>
  //       {showEdit == false ? (
  //         <TouchableOpacity onPress={() => setShowEdit(true)}>
  //           <Text>{i18n.t('edit')}</Text>
  //         </TouchableOpacity>
  //       ) : (
  //         <TouchableOpacity onPress={() => setShowEdit(false)}>
  //           <Text>{i18n.t('done')}</Text>
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   </View>
  // );

  if (!isSignedIn) {
    return <NotSignedIn onPress={() => NavigationService.navigateToAuth()} />;
  }
  //console.log('wishlist',wishlist)
  return (
    <>
      <View style={{flex: 1, paddingBottom: 75}}>
        <View style={S.bottomButtonContainer}>
          <ButtonBlack
            onPress={openAddItemScreen}            
            containerStyle={S.bottomButton} 
            titleStyle={S.bottomButtonTitle} 
            title="+ sell an item"
            />
        {/* <View style={{position: 'absolute', right: 15, bottom: 15, zIndex: 2}}> */}
          {/* <TouchableOpacity onPress={openAddItemScreen}>
            <AntDesign name="pluscircle" size={50} />
          </TouchableOpacity> */}
        </View>
        {/* <StatusBar backgroundColor={colors.gray}/> */}
        {/* {_renderHeader()} */}
        <BackHeaderCenter containerStyle={{borderBottomWidth: 0}} hideBack title="Sell"/>
        <FlatList
          keyExtractor={item => item.id + showEdit}
          data={drafts}
          renderItem={({item}) => (
            <DraftListItem
              steps={getStepRemained({...item, seller})}
              showCheckBox={showEdit}
              checked={
                markedItems.filter(i => i.id == item.id).length > 0
                  ? true
                  : false
              }
              onCheckBoxClick={toggleItemMark}
              // toWishlist={toWishlist}
              // fromWishlist={fromWishlist}
              // fromCart={fromCart}
              // toCart={toCart}
              {...item}
              item={item}
              // inWishlist={isInWishlist({wishlist, id: item.id})}
              // inCart={isInCart({cartItems, id: item.id})}
              onPress={() => openDraftInfo(item)}
            />
          )}
        />
      </View>
    </>
  );
};

export default SellView;
