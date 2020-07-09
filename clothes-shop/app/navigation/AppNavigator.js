import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import screens from '../constants/screens';
import MainTabNavigator from './MainTabNavigator';
import SearchStack from './SearchStack';
// import SearchResultStack from './SearchResultStack';
import UserProfileStack from './UserProfileStack';
import CartStack from './CartStack';
import NegotiationNavigator from './NegotiationNavigator';
import BrandChoose from '../screens/BrandChoose';

import PriceInput from '../screens/PriceInput';
import AlertNavigator from './AlertNavigator';
import FilterSort from './FilterSortNavigation';
import AddShippingAddressScreen from '../screens/AddShippingAddressScreen';
import AddPersonalInformation from '../screens/AddPersonalInformation';
import AuthNavigator from './AuthNavigator';
import PriceReduction from '../screens/ProductInfo/PriceReduction';
import AddPhoto from '../screens/ProductInfo/AddPhoto/AddPhoto';
import RemoveFromSold from '../screens/ProductInfo/RemoveFromSold';
import CommentList from '../screens/CommentList';
import GridScreen from '../screens/GridScreen';
import {createStackNavigator} from 'react-navigation-stack';

import {defaultNavigationOptions} from './NavigationOptions'
import ListNavigation from './ListNavigation';

const switchNavigator = createStackNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    [screens.ListScreen]: ListNavigation,
    [screens.PriceReduction]: PriceReduction,
    [screens.AddPhoto]: AddPhoto,
    [screens.RemoveFromSold]: RemoveFromSold,
    
    [screens.GridScreen]: GridScreen,
    [screens.AlertStack]: AlertNavigator,
    [screens.MainStack]: MainTabNavigator,
    // [screens.ListScreen]: ListScreen,
    [screens.UserProfileStack]: UserProfileStack,
    [screens.AddShippingAddressScreen]: AddShippingAddressScreen,
    [screens.AddPersonalInformation]: AddPersonalInformation,
    [screens.SearchStack]: SearchStack,
    // [screens.SearchResultStack]: SearchResultStack,
    [screens.FilterSort]: FilterSort,
    [screens.AuthStack]: AuthNavigator,
    [screens.NegotiationsStack]: NegotiationNavigator,
    [screens.BrandChoose]: BrandChoose,
    [screens.PriceInput]: PriceInput,
    [screens.CartStack]: CartStack,
    [screens.CommentList]: CommentList,
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
