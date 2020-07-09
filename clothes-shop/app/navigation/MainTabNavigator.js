import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import  FontAwesome from 'react-native-vector-icons/FontAwesome'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import SearchHeader from '../components/SearchHeader';
import NotificationIcon from '../containers/NotificationIcon';
import Home from '../screens/Home';
import Category from '../screens/Category';

import SubCategoriesView from '../screens/SubCategoriesView';
import ProductInfo from '../screens/ProductInfo';
import i18n from '../i18n';

import screens from '../constants/screens';

import ProfileStack from './ProfileNavigation';
import CategorySearchStack from './CategorySearchNavigation';
import NotificationNavigator from './NotificationNavigator';
import SellNavigation from './SellNavigation'

const SubCategoriesViewStack = createStackNavigator({
  [screens.SubCategoriesView]: {
    screen: SubCategoriesView,
    navigationOptions: props => {
      // //console.log('props',props);
      // const title = props.navigation.getParam('title','')
      // //console.log('category',category)
      return {
        header: (
          <SearchHeader
            showBack
            // showSort
            onSearchClick={() =>
              props.navigation.navigate(screens.SearchScreen)
            }
            placeholder={props.navigation.getParam('title', '')}
            onBack={() =>
              props.navigation.navigate(screens.CategoriesViewStack)
            }
            style={{maxHeight: 60}}
            navigation={props.navigation}
          />
        ),
      };
    },
  },
});

const HomeStack = createStackNavigator(
  {
    [screens.HomeScreen]: {
      screen: Home,
      navigationOptions: props => ({
        header: null,
      }),
    },
    [screens.Category]: Category,
    [screens.SubCategoriesViewStack]: {
      screen: SubCategoriesViewStack,
    },
    // [screens.ProductListStack]: {
    //   screen: ProductListStack,
    // },
    [screens.ProductInfo]: {
      screen: ProductInfo,
      navigationOptions: props => ({
        header: null,
      }),
    },
  },
  {
    defaultNavigationOptions: ({
      header: null
    })
  },
);


const BottomTabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          const iconName = focused ? 'home' : 'home-outline';
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={25}
              color={tintColor}
            />
          );
        },
        title: i18n.t('tabs.home'),
        header: null,
      },
    },
    [screens.CategorySearch]: {
      screen: CategorySearchStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          const iconName = 'ios-search';
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        title: 'Buy',
      }),
    },
    [screens.SellStack]: {
      screen: SellNavigation,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          const iconName = focused ? 'pluscircle' : 'pluscircleo';
          return <AntDesign name={iconName} size={25} color={tintColor} />;
        },
        title: 'Sell',
      },
    },
    [screens.NotificationStack]: {
      screen: NotificationNavigator,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return <NotificationIcon focused={focused} color={tintColor} />;
        },
        title: 'Notifications',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        title: i18n.t('tabs.profile'),
        tabBarIcon: ({focused, tintColor}) => {
          const iconName = focused ? 'meho' : 'meh';
          return <AntDesign name={iconName} size={25} color={tintColor} />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      // inactiveBackgroundColor: colors.dark,
      // activeBackgroundColor: colors.dark,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      // activeTintColor: colors.orange,
      // inactiveTintColor: colors.lightoOrange,
      // showLabel :  false,
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
    },
    // style: styles.tabBar,
    initialRouteName: 'Home',
  },
);

export default BottomTabs;
