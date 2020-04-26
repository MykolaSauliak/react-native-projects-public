import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Cart from '../screens/Cart';
import PaypalModal from '../screens/PaypalModal';
import Checkout from '../screens/Checkout';
import screens from '../constants/screens';
import colors from '../styles/colors';

const CartStack = createStackNavigator({
  [screens.Cart]: {
    screen: Cart,
    navigationOptions: {
      header: null,
    },
  },
  [screens.PaypalModal]: {
    screen: PaypalModal,
    navigationOptions: {
      title: 'Paypal',
    },
  },
  [screens.Checkout]: {
    screen: Checkout,
    navigationOptions: {
      title: 'Checkout',
    },
  },
  // [screens.StripePayment]: {
  //   screen: StripePayment,
  //   navigationOptions: {
  //     title: 'Pay',
  //   },
  // },
});

export default CartStack;
