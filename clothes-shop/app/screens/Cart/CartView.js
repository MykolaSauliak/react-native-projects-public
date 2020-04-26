import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import ProductListItem from '../../components/ProductListItem';
import Loading from '../../components/Loading';
import Button from '../../components/Button/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../constants/styles';
import colors from '../../styles/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import constants from '../../constants';
import NumericInput from 'react-native-numeric-input';
import {WebView} from 'react-native-webview';
import {Icon, Header, ListItem} from 'react-native-elements';
import axios from 'axios';
import {getTotalValue} from '../../features/cart/operations';
import i18n from '../../i18n';
import T from 'prop-types';
import {NavigationService} from '../../services';
import {DataTable} from 'react-native-paper';
const pluralize = require('pluralize');

const paypal_logo = require('../../assets/images/paypal_logo.png');
const bag_background = require('../../assets/images/bag_background.png');

// let selectedid = '';
// let selectedItemCount = 1;
const CartView = ({
  wishlist,
  cartItems,
  products,
  markedItems,

  showEdit,
  setShowEdit,
  count,
  changeCount,
  setLocalCount,

  toWishlist,
  fromWishlist,
  isInWishlist,
  toCart,
  fromCart,
  isInCart,
  openProductInfo,

  selectedItem,
  setSelectedItem,

  isLoggedIn,
  accessToken,
  approvalUrl,
  setApprovalUrl,
  checkout,
  toggleItemMark,
  getTotalWithTaxes,
  markedToWishlist,
  markedDelete,
  onPaypal,
  cartLoading,
  getTotalValue,
  toCheckout,
  setCount,
  getAuthenticationFees,
}) => {
  console.log('markedItems', markedItems);

  const isMarked = ({id}) => {
    return markedItems && markedItems.filter(i => i.id == id).length > 0;
  };

  let selectedItemCount;
  try {
    selectedItemCount = cartItems.filter(c => c.id == selectedItem)[0].count;
    selectedItemCount = selectedItemCount > 0 ? selectedItemCount : 1;
  } catch (err) {
    // //console.log('err',err)
    selectedItemCount = 1;
  }

  const _renderHeader = () => (
    <Header
      containerStyle={{backgroundColor: 'white'}}
      leftComponent={
        showEdit ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {showEdit === true && (
              <>
                <TouchableOpacity
                  style={{paddingHorizontal: 5}}
                  onPress={markedDelete}>
                  <Icon name="delete" color="black" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 5}}
                  onPress={markedToWishlist}>
                  <Icon name="star" color="black" size={30} />
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : (
          {
            icon: 'arrow-back',
            color: 'black',
            onPress: () => NavigationService.goBack(),
          }
        )
      }
      centerComponent={{text: 'Cart', style: {color: 'black', fontSize: 20}}}
      rightComponent={{
        text: showEdit ? 'done' : 'edit',
        color: 'black',
        onPress: () => setShowEdit(!showEdit),
      }}
    />
    // <View style={S.header}>
    //   <View
    //     style={{
    //       flex: 0.25,
    //       flexDirection: 'row',
    //       justifyContent: 'space-around',
    //     }}>
    //     {showEdit === true && (
    //       <>
    //         <TouchableOpacity
    //           style={{paddingHorizontal: 5}}
    //           onPress={markedDelete}>
    //           <Icon name="delete" color="black" size={30} />
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={{paddingHorizontal: 5}}
    //           onPress={markedToWishlist}>
    //           <Icon name="star" color="black" size={30} />
    //         </TouchableOpacity>
    //       </>
    //     )}
    //   </View>
    //   <Text style={[globalStyles.text, {flex: 0.5, textAlign: 'center'}]}>
    //     {i18n.t('cart.carttitle')}
    //   </Text>
    //   <View style={{flex: 0.25}}>
    //     {showEdit == false ? (
    //       <TouchableOpacity onPress={() => setShowEdit(true)}>
    //         <Text>{i18n.t('edit')}</Text>
    //       </TouchableOpacity>
    //     ) : (
    //       <TouchableOpacity onPress={() => setShowEdit(false)}>
    //         <Text>{i18n.t('done')}</Text>
    //       </TouchableOpacity>
    //     )}
    //   </View>
    // </View>
  );

  if (!isLoggedIn) {
    return (
      <ImageBackground
        source={bag_background}
        style={{...StyleSheet.absoluteFill}}>
        {_renderHeader()}
        <View style={S.container}>
          <Text style={{textAlign: 'center'}}>{i18n.t('loginorregister')}</Text>
        </View>
      </ImageBackground>
    );
  }
  if (cartLoading){
    return (
      <>
        {_renderHeader()}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading />
        </View>
      </>
    );
  }

  return (
    <>
      {/* <ImageBackground
        source={bag_background}
        style={{...StyleSheet.absoluteFill}}> */}
      {/* TODO : replace by device height */}
      <View style={{flex: 0.85, backgroundColor: colors.lightGray}}>
        {/* Cart Header */}
        {_renderHeader()}
        {cartLoading ? (
          <Loading />
        ) : (
          <ScrollView>
            <FlatList
              containerStyle={{flexGrow: 1, marginBottom: 50}}
              keyExtractor={item => item.id + showEdit}
              data={cartItems}
              renderItem={({item}) => {
                return (
                  <>
                    <ProductListItem
                      showRightPrice
                      // containerStyle={{backgroundColor: null}}
                      showCheckBox={showEdit}
                      showCartIcon={false}
                      checked={isMarked({id: item.id})}
                      onCheckBoxClick={toggleItemMark}
                      // openBottomSheet={openBottomSheet}
                      toWishlist={toWishlist}
                      fromWishlist={fromWishlist}
                      fromCart={fromCart}
                      toCart={toCart}
                      title={item.brand_name}
                      subtitle={
                        (item.color || '') +
                        ' ' +
                        (item.material || '') +
                        ' ' +
                        (item.type_name || '')
                      }
                      inWishlist={isInWishlist({id: item.id})}
                      inCart={isInCart({id: item.id})}
                      onPress={() => openProductInfo(item)}
                      // onCountChange={(count) => setCount({id : item.id, count})}
                      {...item}
                      item={item}
                      count={item.count || 1}
                      containerStyle={{marginTop: 25}}
                    />
                    <ListItem
                      containerStyle={{padding: 10}}
                      title="Shipping and insurance"
                      titleStyle={{fontSize: 13}}
                      rightElement={<Text style={{color: 'red'}}>Free</Text>}
                    />
                    <ListItem
                      containerStyle={{padding: 10}}
                      title="Control and authentication"
                      titleStyle={{fontSize: 13}}
                      rightElement={
                        <Text>{`9.99 ${constants.MONEY_SYMBOL}`}</Text>
                      }
                    />
                  </>
                );
              }}
            />
            <ListItem
              containerStyle={{padding: 10, marginTop: 15, opacity: 0.5}}
              title={`${cartItems.length} ${pluralize(
                'item',
                cartItems.length,
              )}`}
              titleStyle={{fontSize: 13}}
              rightElement={<Text style={{}}>{getTotalValue()}</Text>}
            />
            <ListItem
              containerStyle={{padding: 10, opacity: 0.5}}
              title="Authentication and control fees"
              titleStyle={{fontSize: 13}}
              rightElement={<Text style={{}}>{getAuthenticationFees()}</Text>}
            />
            {/* <ListItem
                containerStyle={{padding:10}}
                title="Shipping and insurance"
                titleStyle={{fontSize: 13}}
                rightElement={<Text style={{color: 'red'}}>Free</Text>}
                /> */}
          </ScrollView>
        )}
      </View>
      <View
        style={{
          flex: 0.15,
          padding: 5,
          paddingVertical: 10,
          borderTopWidth: 1,
        }}>
        {/* <Text>{}</Text> */}
        <DataTable.Row>
          <DataTable.Cell style={{color: 'white', fontSize: 18}}>
            Total include taxes:
          </DataTable.Cell>
          <DataTable.Cell
            style={{color: 'white', fontSize: 18}}
            numeric>{`${getTotalWithTaxes()} ${
            constants.MONEY_SYMBOL
          }`}</DataTable.Cell>
        </DataTable.Row>
        <Button
          disabled={!cartItems || cartItems.length == 0}
          onPress={() => NavigationService.navigateToCheckout()}
          title="Checkout"
          buttonStyle={{backgroundColor: 'black'}}
          titleStyle={{color: 'white'}}
        />
      </View>
      {/* <BottomSheet
          snapPoints={[200, 100]}
          renderContent={() => (
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                height: constants.DEVICE_HEIGHT * 0.2,
              }}>
              <TouchableOpacity onPress={toCheckout} style={S.ckeckoutBtn}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                  Checkout
                </Text>
              </TouchableOpacity>
            </View>
          )}
          renderHeader = {() => (
              <View style={{ backgroundColor: colors.dark,  width:'100%', height: 50, justifyContent:'center', paddingHorizontal: 15}}>
                  <Text style={{fontSize: 16, textAlign:'center',fontWeight: 'bold', color: 'white', top: -5, position: 'absolute', left: '50%'}}>. . .</Text>
                  <Text style={{color: 'white', fontWeight: "bold"}}>{i18n.t('cart.totalvalue')} {getTotalValue()} {constants.MONEY_SYMBOL}</Text>
              </View>
          )}
          initialSnap={0}
          enabledGestureInteraction={true}
        /> */}
      {/* </View> */}
      {/* <BottomSheet
                    ref={bottomSheet}
                    snapPoints={[-100, 300]}
                    renderContent = {renderContent}
                    renderHeader = {renderHeader}
                    initialSnap={0}
                    // overdragResistanceFactor={1}
                    // enabledGestureInteraction={true}
                    /> */}
      {/* </View> */}
      {/* </ImageBackground> */}
    </>
  );
};

CartView.defaultProps = {
  cartItems: [],
  wishlist: [],
  toCheckout: () => NavigationService.navigateToCheckout(),
};

CartView.propTypes = {
  cartItems: T.array,
};

export default CartView;

const S = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomSheet: {
    flexDirection: 'row',
    height: 45,
    zIndex: 100,
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    width: constants.DEVICE_WIDTH,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  paypalBtn: {
    // borderColor:colors.gray,
    // borderWidth: 1,
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginVertical: 10,
    // paddingVertical : 15,
    borderRadius: 15,
    backgroundColor: colors.gray,
  },
  ckeckoutBtn: {
    width: constants.DEVICE_WIDTH * 0.8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: colors.lightGray,
    borderColor: 'black',
    borderWidth: 0.5,
    // backgroundColor: 'rgb(241,130,84)',
  },
  header: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width:'100%',
    marginVertical: 10,
  },
});
