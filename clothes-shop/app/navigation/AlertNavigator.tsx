import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import AlertCreate from '../screens/AlertCreate/AlertCreate';
import screens from '../constants/screens';
import {defaultNavigationOptions} from './NavigationOptions'

const AlertStack = createStackNavigator({
  [screens.AlertCreate]:AlertCreate
}, {
  defaultNavigationOptions
});

export default AlertStack;
