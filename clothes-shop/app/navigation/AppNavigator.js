import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import screens from '../constants/screens';
import MainTabNavigator from './MainTabNavigator';
import SearchStack from './SearchStack';
// import SearchResultStack from './SearchResultStack';
import UserProfileStack from './UserProfileStack';
import CartStack from './CartStack';
import NegotiationNavigator from './NegotiationNavigator';
import AlertNavigator from './AlertNavigator';
import FilterSort from './FilterSortNavigation';
import AddShippingAddressScreen from '../screens/AddShippingAddressScreen';
import AuthNavigator from './AuthNavigator';
import ListScreen from '../screens/ListScreen';
import GridScreen from '../screens/GridScreen';
import {createStackNavigator} from 'react-navigation-stack';

import {defaultNavigationOptions} from './NavigationOptions'

const switchNavigator = createStackNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    [screens.ListScreen]: ListScreen,
    [screens.GridScreen]: GridScreen,
    [screens.AlertStack]: AlertNavigator,
    [screens.MainStack]: MainTabNavigator,
    // [screens.ListScreen]: ListScreen,
    [screens.UserProfileStack]: UserProfileStack,
    [screens.AddShippingAddressScreen]: AddShippingAddressScreen,
    [screens.SearchStack]: SearchStack,
    // [screens.SearchResultStack]: SearchResultStack,
    [screens.FilterSort]: FilterSort,
    [screens.AuthStack]: AuthNavigator,
    [screens.NegotiationsStack]: NegotiationNavigator,
    [screens.CartStack]: CartStack,
  },
  {
    initialRouteName:  screens.MainStack,
    defaultNavigationOptions
  },
);

switchNavigator.path = '';

export default createAppContainer(switchNavigator, {history: 'hash'});

// export default createAppContainer(
//   // createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     // Main:
//     Search: SearchStack,
//     MainTabNavigator,
//   // })
// );
