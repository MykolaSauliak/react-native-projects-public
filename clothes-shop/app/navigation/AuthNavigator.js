import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Auth from '../screens/Auth/AuthScreenContainer';
import screens from '../constants/screens';
import {defaultNavigationOptions} from './NavigationOptions'

const AuthStack = createStackNavigator({
  [screens.Auth]:Auth
}, {
  defaultNavigationOptions
});

export default AuthStack;
