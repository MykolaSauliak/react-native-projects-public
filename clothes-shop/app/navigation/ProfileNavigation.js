import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
// import AuthenticationStack from './AuthenticationStack';
import Profile from '../screens/Profile';
import Wishlist from '../screens/Profile/Wishlist';
import MyAddresses from '../screens/Profile/MyAddresses';
// import Favorites from '../screens/Favorites';
import MyOrders from '../screens/Profile/MyOrders';
import MyAlerts from '../screens/Profile/MyAlerts';
import MyItems from '../screens/Profile/MyItems';
import PriceOfferSent from '../screens/Profile/PriceOfferSent';
import AccountDetails from '../screens/Profile/AccountDetails';
import {BackHeader} from '../components';
import screens from '../constants/screens';
import Favorites from '../screens/Profile/Favorites';
import Stats from '../screens/Profile/Stats';
import HolidayMode from '../screens/Profile/HolidayMode/HolidayMode';

const ProfileStack = createStackNavigator(
  {
    [screens.Profile]: {
      screen: Profile,
      navigationOptions: props => ({
        header: null,
      }),
    },

    [screens.MyOrders]: {
      screen: MyOrders,
      navigationOptions: props => ({
        header: <BackHeader title="My orders" />,
        // header:  <BackHeader navigation={props.navigation} title="Sign in"/>,
      }),
    },
    [screens.MyAddresses]: {
      screen: MyAddresses,
      navigationOptions: props => ({
        header: <BackHeader title="Address" />,
        // header:  <BackHeader navigation={props.navigation} title="Sign in"/>,
      }),
    },
    [screens.Stats]: Stats,
    [screens.HolidayMode]: HolidayMode,
    [screens.Wishlist]: Wishlist,
    [screens.Favorites]: Favorites,
    [screens.MyAlerts]: MyAlerts,
    [screens.MyItems]: MyItems,
    [screens.AccountDetails]: AccountDetails,
    [screens.PriceOfferSent]: PriceOfferSent,
  },
  {
    defaultNavigationOptions: props => ({
      header: null,
    }),
  },
);

export default ProfileStack;
