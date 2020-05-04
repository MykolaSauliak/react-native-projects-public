import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ListItem, CheckBox} from 'react-native-elements';
import ProductListItem from '../../../../components/ProductListItem';
import S from './styles';
import globalStyles from '../../../../constants/styles';
import constants from '../../../../constants';
import colors from '../../../../styles/colors';
import {
  NavigationService,
  StripeService,
  ShopService,
} from '../../../../services';
import i18n from '../../../../i18n';
import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal'
import { BackHeader } from '../../../../components';
import PaymentWebview from '../PaymentWebview/PaymentWebview'
import { getTotalWithTaxes } from '../../../../features/cart/operations';
import {Order} from '../../../../types/types'

const pluralize = require('pluralize')

const Row = ({left, right, ceilStyle, textStyle}) => (
  <View style={{width: '100%', flexDirection: 'row', paddingVertical: 4}}>
    <View style={[globalStyles.tableCeil, ceilStyle]}>
      <Text style={[{textAlign: 'left'}, textStyle]}>{left}</Text>
    </View>
    <View style={[globalStyles.tableCeil, ceilStyle]}>
      <Text style={[{textAlign: 'right'}, textStyle]}>{right}</Text>
    </View>
  </View>
);

Row.defaultProps = {
  left: '',
  right: '',
  ceilStyle: {},
  textStyle: {},
};

const Review = ({
  cartItems,
  setCartItems,
  showCoupon,
  shippingAddress,
  billingAddress,
  paymentMethod,
  token,
  safeOrderChange,
  safe_order,
  // createOrder,

  toWishlist,
  fromWishlist,
  setCount,
  toCart,
  fromCart,
  resetCart,
  getTotalValue,
  getTotalWithTaxes,
  getAuthenticationFees,
  isInWishlist,
  isInCart,

  openProductInfo,
  updateIndex,
}) => {

  let [isPaymentModalVisible, setPaymentModalVisible] = useState(false)

  if (!shippingAddress) {
    shippingAddress = {};
  }

  const getDeliveryCost = () => {
    return 9.6;
  };

  const totalValue = (decimal = 2) => {
    return (getTotalValue() + getSafeOrderCost() + getDeliveryCost()).toFixed(
      decimal,
    );
  };

  const getSafeOrderCost = () => {
    if (safe_order) {
      return 4.352;
    }
    return 0;
  };

  const createOrder = async (token) => {
    try{
      await ShopService.createOrder({
        shippingAddress,
        token,
        amount : getTotalWithTaxes(),
        items: cartItems,
        payment_method : paymentMethod,
        create_time : Date.now(),
      })
      setPaymentModalVisible(false)
      resetCart()
      NavigationService.navigateToHome()
      // console.log('done ...')
    }catch(err){
      console.log('error',err)
      Alert.alert('Some error occurred. Contact administrators or try later')
    }

  }

  const handlePayPress = async () => {
    // let paymentRequest;
    // console.log('paymentMethod',paymentMethod)
    let response;
    let token;
    try {
      switch (paymentMethod) {
        case 'creditcard':
          setPaymentModalVisible(true)
          // setPaymentModalVisible(true)
          // console.log('selectedBillingAddress',selectedBillingAddress)
          // token = await StripeService.paymentRequestWithCardForm({
          //   smsAutofillDisabled: true,
          //   requiredBillingAddressFields: 'full',
          //   prefilledInformation: {
          //     billingAddress: {
          //       name: 'Gunilla Haugeh',
          //       line1: 'Canary Place',
          //       line2: '3',
          //       city: 'Macon',
          //       state: 'Georgia',
          //       country: 'US',
          //       postalCode: '31217',
          //       email: 'ghaugeh0@printfriendly.com',
          //     },
          //   },
          // });
          // Alert.alert('test')
          // const params = {
          //     // mandatory
          //     number: '4242424242424242',
          //     expMonth: 11,
          //     expYear: 17,
          //     cvc: '223',
          //     // optional
          //     name: 'Test User',
          //     currency: 'usd',
          //     addressLine1: '123 Test Street',
          //     addressLine2: 'Apt. 5',
          //     addressCity: 'Test City',
          //     addressState: 'Test State',
          //     addressCountry: 'Test Country',
          //     addressZip: '55555',
          //   }
          // token = await StripeService.createTokenWithCard({
          // })
          // console.log('paymentRequest',paymentRequest)
          // console.log('token',token.tokenId)
          // console.log('card id',token.card)
          // token = JSON.parse(token)
          // if (token) {
          //   // response = await StripeService.addPayment(token)
          //   response = await StripeService.createCharge({
          //     amount: totalValue(0) * 100, //cents
          //     source: token ? token.tokenId : token,
          //   });
          //   // console.log('response',response)
          //   // console.log('response',response.path)
          //   const chargeId = response.path.split('/')[3];
          //   // await StripeService.addPayment(token ? token.tokenId : token)
          //   await ShopService.createOrder({
          //     payid: chargeId,
          //     items: cartItems,
          //     total_cost: getTotalValue(2),
          //     first_name: shippingAddress.first_name,
          //     last_name: shippingAddress.last_name,
          //     create_time: Date.now(),
          //     country_code: shippingAddress.country_code,
          //     country: shippingAddress.country
          //       ? shippingAddress.country.name
          //       : shippingAddress.country,
          //     payment_method: paymentMethod,
          //     postal_code: shippingAddress.postal_code,
          //     recipient_name: shippingAddress.first_name,
          //     state: shippingAddress.state,
          //     city: shippingAddress.city,
          //     line1: shippingAddress.address_line_1,
          //     orderStatus: 'accepted',
          //     token: token ? token.tokenId : token,
          //     source: token ? token.tokenId : token,
          //   });
          //   Alert.alert('Order sent for processing');
          //   resetCart();
          //   NavigationService.goBack();
          //   NavigationService.navigateToCatalog();
          // } else {
          // }
          // console.log('add addPayment response',response)
          break;
        case 'paypal':
          break;
        case 'googlepay':
          // const options = {
          //   total_price: '80.00',
          //   currency_code: 'USD',
          //   shipping_address_required: false,
          //   billing_address_required: true,
          //   shipping_countries: ['US', 'CA'],
          //   line_items: [
          //     {
          //       currency_code: 'USD',
          //       description: 'Whisky',
          //       total_price: '50.00',
          //       unit_price: '50.00',
          //       quantity: '1',
          //     },
          //     {
          //       currency_code: 'USD',
          //       description: 'Vine',
          //       total_price: '30.00',
          //       unit_price: '30.00',
          //       quantity: '1',
          //     },
          //   ],
          // };
          // token = await StripeService.paymentRequestWithAndroidPay(options);
          // console.log('token', token);
          break;
      }
    } catch (err) {
        console.log('ERRRO DURING PROCESS PAYMENT', err);
        Alert.alert(i18n.t('paymenterroralerttistle'));
    }
  };

  // console.log('shippingAddress', shippingAddress);
  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={{flex: 0.8, padding: 15}}>
        {/* <ScrollView> */}
        <Modal isVisible={isPaymentModalVisible} 
              style={S.modal}>
            <View style={{ flex: 1 }}>
                <BackHeader 
                    goBack={() => setPaymentModalVisible(!isPaymentModalVisible)} 
                    title="Pay"
                    />
                <PaymentWebview 
                  total={getTotalValue()}
                  onTokenRecieved={(token) => createOrder(token)}
                  />
            </View>
        </Modal>

        <Text style={S.title}>YOUR INFO</Text>
        <ListItem
          title="Address"
          titleStyle={S.title}
          subtitle={`${shippingAddress.first_name} ${
            shippingAddress.last_name
          },\n${shippingAddress.city} ${shippingAddress.postal_code}, ${
            shippingAddress.country
              ? shippingAddress.country.name
              : shippingAddress.country
          }`}
          chevron
          onPress={() => updateIndex(0)}
          bottomDivider
        />
        <ListItem
          title="Payment Method"
          titleStyle={S.title}
          subtitle={paymentMethod}
          chevron
          onPress={() => updateIndex(2)}
          bottomDivider
        />
        <Text style={S.title}>CART</Text>
        {cartItems.map(item => {
          return (
             <ProductListItem
                showRightPrice
                // containerStyle={{backgroundColor: null}}
                // showCheckBox={showEdit}
                showCartIcon={false}
                // checked={isMarked({id: item.id})}
                // onCheckBoxClick={toggleItemMark}
                // openBottomSheet={openBottomSheet}
                toWishlist={toWishlist}
                fromWishlist={fromWishlist}
                fromCart={fromCart}
                toCart={toCart}
                title={item.brand_name}
                subtitle={(item.color || '') + ' ' + (item.material || '') + ' ' + (item.type_name || '')}
                inWishlist={isInWishlist({id: item.id})}
                inCart={isInCart({id: item.id})}
                onPress={() => openProductInfo(item)}
                // onCountChange={(count) => setCount({id : item.id, count})}
                {...item}
                item={item}
                count={item.count || 1}
                containerStyle={{}}
              />
          );
        })}
        <ListItem 
              containerStyle={{padding:10,marginTop :15,  opacity: 0.5}}
              title={`${cartItems.length} ${pluralize('item',cartItems.length)}`}
              titleStyle={{fontSize: 13}}
              rightElement={<Text style={{}}>{getTotalValue()}</Text>}
              />
        <ListItem 
            containerStyle={{padding:10,  opacity: 0.5}}
            title="Authentication and control fees"
            titleStyle={{fontSize: 13}}
            rightElement={<Text style={{}}>{getAuthenticationFees()}</Text>}
            />
        {/* <ListItem
          title="Save Order"
          checkBox={{
            onPress: () => safeOrderChange(!safe_order),
            checked: safe_order,
          }}
          rightElement={<Text>4,35 {constants.MONEY_SYMBOL}</Text>}
          bottomDivider
        /> */}
        
        {/* <ListItem
          subtitle={
            'We will pick up the goods within 200 days after the purchases at our own expenses, regardless of the return reason if the part not been damaged or installed. Safe Order does not include tyres and oversized goods'
          }
          bottomDivider
        /> */}
        {/* <Text style={S.title}>DISCOUNT COUPON</Text>
                <ListItem
                    title="Add a coupon"
                    rightElement={<TouchableOpacity>
                        <Text style={{fontSize: 20, color : colors.orange}}>+</Text>
                    </TouchableOpacity>}
                    /> */}
        {/* <Text style={S.title}>TOTAL</Text> */}
        {/* <View style={{backgroundColor: '#2166d7', padding: 10}}> */}
          {/* <DataTable>
          {safe_order && (
            <DataTable.Row  >
              <DataTable.Cell style={{color:'white'}}>Safe Order</DataTable.Cell>
              <DataTable.Cell style={{color:'white'}} numeric>{`${getSafeOrderCost()} ${constants.MONEY_SYMBOL}`}</DataTable.Cell>
            </DataTable.Row>
          )}
            <DataTable.Row>
              <DataTable.Cell style={{color:'white'}}>Delivery</DataTable.Cell>
              <DataTable.Cell style={{color:'white'}} numeric>{`${getTotalValue()} ${constants.MONEY_SYMBOL}`}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell style={{color:'white'}}>Total</DataTable.Cell>
              <DataTable.Cell style={{color:'white'}} numeric>{totalValue()} {constants.MONEY_SYMBOL}</DataTable.Cell>
            </DataTable.Row>
          </DataTable> */}

        {/* {safe_order && (
            <Row
              textStyle={{color: 'white'}}
              ceilStyle={{borderBottomColor: null, borderBottomWidth: 0}}
              left="Safe Order"
              right={`${getSafeOrderCost()} ${constants.MONEY_SYMBOL}`}
            />
          )} */}
          {/* <Row
            textStyle={{color: 'white'}}
            ceilStyle={{borderBottomColor: null, borderBottomWidth: 0}}
            left="Total price of goods"
            right={`${getTotalValue()} ${constants.MONEY_SYMBOL}`}
          />
          <Row
            textStyle={{color: 'white'}}
            ceilStyle={{borderBottomColor: null, borderBottomWidth: 0}}
            left="Delivery"
            right={`${getDeliveryCost()} ${constants.MONEY_SYMBOL}`}
          />
          <Row ceilStyle={{borderBottomColor: 'white', borderBottomWidth: 1}} />
          <Row
            textStyle={{color: 'white', fontSize: 20}}
            ceilStyle={{borderBottomColor: null, borderBottomWidth: 0}}
            left="Total"
            right={`${totalValue()}`}
          /> */}
        {/* </View> */}
        {/* </ScrollView> */}
      </View>
      <View style={S.bottomContainer}>
        <Text style={S.bottomText}>
          By placing an order you acknowledge and accept the General Terms and
          Conditions, Cancellation Policy and Private Policy
        </Text>
        <TouchableOpacity onPress={handlePayPress} style={S.orderBtn}>
          <AntDesign name="lock" size={30} color="black" />
          <Text style={{color: 'black', fontWeight: 'bold'}}>SHOP NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Review.defaultProps = {
  cartItems: [],
  shippingAddress: {},
  safe_order: false,
  createOrder: () => {},
  updateIndex: index => {},
  openProductInfo: item => NavigationService.navigateToProduct({...item}),
};

export default Review;
