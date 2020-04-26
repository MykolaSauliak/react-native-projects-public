import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import screens from '../constants/screens';
import {UserProfile} from '../screens';
// import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.UserProfile]: {
      screen: UserProfile,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteKey: screens.UserProfile,
    // headerMode: 'screen',
    // defaultNavigationOptions,
  },
);
