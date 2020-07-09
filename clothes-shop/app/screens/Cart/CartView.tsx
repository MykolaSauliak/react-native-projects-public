import React from 'react';
import {
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import Loading from '../../components/Loading';
import Button from '../../components/Button/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../styles';
import colors from '../../styles/colors';
import BottomSheet from 'reanimated-bottom-sheet';
import constants from '../../constants';
import NumericInput from 'react-native-numeric-input';
import {WebView} from 'react-native-webview';
import {Icon, Header, ListItem} from 'react-native-elements';
import axios from 'axios';
import {getTotalValue, updateCart} from '../../features/cart/operations';
import i18n from '../../i18n';
import T from 'prop-types';
import {NavigationService} from '../../services';
import {DataTable} from 'react-native-paper';
import {  Text, Checkbox, BackHeader, BackHeaderCenter} from '../../components';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {Shop} from "../../types/Shop.type";
import RadioButton from '../../components/RadioButton/RadioButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const pluralize = require('pluralize');

const paypal_logo = require('../../assets/images/paypal_logo.png');
const bag_background = require('../../assets/images/bag_background.png');

// let selectedid = '';
// let selectedItemCount = 1;
const CartView = ({
  wishlist,
  cartItems,
  lastCartUpdate,
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
  setShippingOption,
  getAuthenticationFees,
  setLoading,
  loading
}) => {
  console.log('markedItems', markedItems);

  const isMarked = ({id}) => {
    console.log('markedItems',markedItems)
    return markedItems && markedItems.filter((i:Shop.Product) => i.id == id).length > 0;
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
      <BackHeaderCenter 
        title="Bag"
        rightComponent={{
          text: showEdit ? 'done' : 'edit',
          color: 'black',
          onPress: () => setShowEdit(!showEdit),
        }}
        />
  );

  const _renderEmptyHeader  = () => (
      <BackHeaderCenter title="Bag"/>
  );

  if (!isLoggedIn) {
    return (
      <ImageBackground
        source={bag_background}
        style={{...StyleSheet.absoluteFill}}>
        {_renderEmptyHeader()}
        <View style={S.container}>
          <Text style={{textAlign: 'center'}}>{i18n.t('loginorregister')}</Text>
        </View>
      </ImageBackground>
    );
  }
  else if(cartItems.length == 0){
    return (
      <ImageBackground
        source={bag_background}
        style={{...StyleSheet.absoluteFill}}>
        {_renderHeader()}
        <View style={S.container}>
        <Text style={[S.emptyTitle, globalStyles.boldText]}>{i18n.t('cart.yourbagisempty')}</Text>
          <Text style={[S.emptySubtitle]}>{i18n.t('cart.butnotforlong')}</Text>
        </View>
      </ImageBackground>
    );
  }
  else if (cartLoading){
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
            {loading && (<Loading />)}              
            <FlatList
              containerStyle={{flexGrow: 1, marginBottom: 50}}
              keyExtractor={item => item.id + showEdit}
              data={cartItems}
              extraData={cartItems}
              renderItem={({item}) => {
                console.log('shippingOption',item.shippingOption)
                return (
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    {showEdit && (
                        <TouchableOpacity
                        style={{width:45}}
                        onPress={() => {
                          toggleItemMark(item)
                          setLoading(true)
                          setTimeout(() => {
                            markedDelete()
                            setLoading(true)
                          }, 200)
                        }}>
                        <Icon type="antdesign" name="minuscircle" color="red" size={20} />
                      </TouchableOpacity>
                    )}
                    <View style={{flex:1}}>
                      <ProductListItem
                        showRightPrice
                        showCartIcon={false}
                        title={item.brand_name}
                        subtitle={
                          (item.color || '') +
                          ' ' +
                          (item.material || '') +
                          ' ' +
                          (item.type_name || '')
                        }
                        inCart={isInCart({id: item.id})}
                        onPress={() => openProductInfo(item)}
                        // onCountChange={(count) => setCount({id : item.id, count})}
                        {...item}
                        item={item}
                        count={item.count || 1}
                        containerStyle={{marginTop: 25}}
                      />
                       <ListItem 
                        bottomDivider
                        leftElement={<RadioButton 
                            active={item.shippingOption == 'withAuthentication' || !item.shippingOption}
                            onPress={() => setShippingOption({id: item.id, option: constants.withAuthentication})}
                          />}
                        title={(
                          <View style={{justifyContent:'space-between', height: 50}}>
                          <Text style={S.title}>
                            Shipping and insurance
                          </Text>
                          <Text style={[S.title,]}>
                            Control and authentication
                          </Text>
                          </View>)
                        }
                        rightElement={
                          <View style={{flexDirection:'column', justifyContent:'space-around',minHeight: 65}}>
                            <Text numberOfLines={1} style={S.price}>4.99 USD</Text>
                            <Text numberOfLines={1} style={S.price}>{`4.99 ${constants.MONEY_SYMBOL}`}</Text>
                          </View>
                        }
                      />

                      <ListItem 
                        
                        leftElement={<RadioButton 
                          active={item.shippingOption == constants.withoutAuthentication}
                          onPress={() => setShippingOption({id: item.id, option: constants.withoutAuthentication})}
                        />}
                      //   leftElement={<TouchableOpacity
                      //     style={[globalStyles.radioCircle, item.shippingOption == constants.withoutAuthentication ? {borderColor: colors.orange} : {borderColor:'black'}]}
                      //     onPress={() => setShippingOption({id: item.id, option: constants.withoutAuthentication})}
                      //     >
                      //     {item.shippingOption == constants.withoutAuthentication && <View style={styles.selectedRb} />}
                      // </TouchableOpacity>}
                        title={(
                          <>
                          <View style={{flexDirection:'row', alignItems:'center'}}>
                            <FontAwesome5Icon style={{paddingRight: 5}} size={16} color='black'  name="handshake" />
                            <Text style={S.title}>Direct shipping</Text>
                          </View>
                          <Text style={[S.title, {textDecorationLine: 'line-through'}]}>
                            Control and authentication
                          </Text>
                          <Text style={S.title}>
                            Shipping and insurance
                          </Text>
       
                          {/* <ListItem
                            containerStyle={{padding: 10}}
                            title="Shipping and insurance"
                            titleStyle={S.title}
                            titleProps={{numberOfLines:1}}
                            // rightElement={<Text style={{color: 'red'}}>Free</Text>}
                            />
                          <ListItem
                            containerStyle={{padding: 10}}
                            title="Control and authentication"
                            titleStyle={[S.title, {textDecorationLine: 'line-through'}]}
                            titleProps={{numberOfLines:1}}
                            // rightElement={
                            //   <Text style={S.price}>FREE</Text>
                            // }
                          /> */}
                          </>)
                          }
                          rightElement={
                            <View style={{flexDirection:'column', justifyContent:'space-evenly',}}>
                              <Text numberOfLines={1} style={S.price}>FREE</Text>
                            </View>
                        }
                      />
                    </View>
                    
                  </View>
                );
              }}
            />
            <ListItem
              containerStyle={{padding: 10, marginTop: 15, opacity: 0.5}}
              title={`${cartItems.length} ${pluralize(
                'item',
                cartItems.length,
              )}`}
              titleStyle={S.title}
              rightElement={<Text style={S.price}>{`${getTotalValue()} USD`}</Text>}
            />
            <ListItem
              containerStyle={{padding: 10, opacity: 0.5}}
              title="Authentication and control fees"
              titleStyle={S.title}
              rightElement={<Text style={S.price}>{`${getAuthenticationFees()} USD`}</Text>}
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
          <DataTable.Cell style={{color: 'white', fontSize: 22}}>
            Total include taxes:
          </DataTable.Cell>
          <DataTable.Cell
            style={{color: 'white', fontSize: 22}}
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
  emptyTitle: {
    textAlign: 'center', 
    fontSize: widthPercentageToDP(6),
    lineHeight : 35
  },
  emptySubtitle: {
    textAlign: 'center', 
    fontSize: widthPercentageToDP(5),
    // lineHeight : 3
  },
  title: {
    fontSize: widthPercentageToDP(4.5),
    lineHeight: 25
  },
  price: {
    fontSize: widthPercentageToDP(4.5),
  }
});
