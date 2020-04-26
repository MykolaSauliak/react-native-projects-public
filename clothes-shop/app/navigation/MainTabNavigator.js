import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import  FontAwesome from 'react-native-vector-icons/FontAwesome'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import SearchHeader from '../components/SearchHeader';
import ClothesSearchHeader from '../containers/Headers/ClothesSearchHeader';
import NotificationIcon from '../containers/NotificationIcon';
import Home from '../screens/Home';
import LifestyleSearch from '../screens/Search/CategorySearch/LifestyleSearch';

import Sell from '../screens/Sell';
import SelectSellCategory from '../screens/Sell/components/SelectSellCategory';
import SelectSellType from '../screens/Sell/components/SelectSellType';
import SelectSellBrand from '../screens/Sell/components/SelectSellBrand';
import SelectSellMainSteps from '../screens/Sell/components/SelectSellMainSteps';

import SelectSellInformation from '../screens/Sell/components/SelectSellInformation';
import SelectSellSubcategory from '../screens/Sell/components/SelectSellSubcategory';
import SelectSellMaterial from '../screens/Sell/components/SelectSellMaterial';
import SelectSellColor from '../screens/Sell/components/SelectSellColor';
import SelectSellPrinted from '../screens/Sell/components/SelectSellPrinted';
import SelectSellPhotos from '../screens/Sell/components/SelectSellPhotos';

import SelectSellDescription from '../screens/Sell/components/SelectSellDescription';
import SelectSellDescriptionWrite from '../screens/Sell/components/SelectSellDescriptionWrite';
import SelectSellMeasurements from '../screens/Sell/components/SelectSellMeasurements';

import SelectSeller from '../screens/Sell/components/SelectSeller';
// import AddShippingAddressScreen from '../screens/AddShippingAddressScreen';

import SelectSellCondition from '../screens/Sell/components/SelectSellCondition';
import SelectSellConditionWrite from '../screens/Sell/components/SelectSellConditionWrite';
import SelectSellPrice from '../screens/Sell/components/SelectSellPrice';

import SubCategoriesView from '../screens/SubCategoriesView';
import ProductList from '../screens/ProductList';
import ProductInfo from '../screens/ProductInfo';
import i18n from '../i18n';

import screens from '../constants/screens';

import ProfileStack from './ProfileNavigation';

import {NavigationService} from '../services';
import NotificationNavigator from './NotificationNavigator';

const ProductListStack = createStackNavigator({
  [screens.ProductList]: {
    screen: ProductList,
    navigationOptions: props => ({
      header: (
        <SearchHeader
          showBack
          showFilter
          onSearchClick={() => props.navigation.navigate(screens.SearchScreen)}
          placeholder={props.navigation.getParam('title', '')}
          onBack={() => props.navigation.navigate(screens.SubCategoriesView)}
          style={{maxHeight: 60}}
          navigation={props.navigation}
        />
      ),
    }),
  },
});

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
    [screens.SubCategoriesViewStack]: {
      screen: SubCategoriesViewStack,
    },
    [screens.ProductListStack]: {
      screen: ProductListStack,
    },
    [screens.ProductInfo]: {
      screen: ProductInfo,
      navigationOptions: props => ({
        header: null,
      }),
    },
  },
  {
  },
);

const SellStack = createStackNavigator(
  {
    [screens.Sell]: Sell,
    [screens.SelectSellCategory]: SelectSellCategory,
    [screens.SelectSellType]: SelectSellType,
    [screens.SelectSellBrand]: SelectSellBrand,
    [screens.SelectSellMainSteps]: SelectSellMainSteps,
    [screens.SelectSellInformation]: SelectSellInformation,
    [screens.SelectSellSubcategory]: SelectSellSubcategory,
    [screens.SelectSellMaterial]: SelectSellMaterial,
    [screens.SelectSellColor]: SelectSellColor,
    [screens.SelectSellPrinted]: SelectSellPrinted,
    [screens.SelectSellPhotos]: SelectSellPhotos,
    [screens.SelectSellDescription]: SelectSellDescription,
    [screens.SelectSellDescriptionWrite]: SelectSellDescriptionWrite,
    [screens.SelectSellMeasurements]: SelectSellMeasurements,
    [screens.SelectSellCondition]: SelectSellCondition,
    [screens.SelectSellConditionWrite]: SelectSellConditionWrite,
    [screens.SelectSellPrice]: SelectSellPrice,
    [screens.SelectSeller]: SelectSeller,
  },
  {
    defaultNavigationOptions: props => ({
      header: null,
    }),
  },
);

const SearchTabs = createMaterialTopTabNavigator(
  {
    [screens.WomanSearch]: {
      screen: WomanSearch,
      navigationOptions: props => ({
        title: 'Woman',
      }),
    },
    [screens.ManSearch]: {
      screen: ManSearch,
      navigationOptions: props => ({
        title: 'Man',
      }),
    },
    [screens.LifestyleSearch]: {
      screen: LifestyleSearch,
      navigationOptions: props => ({
        title: 'Lifestyle',
      }),
    },
  },
  {
    defaultNavigationOptions: props => ({
      tabBarOptions: {
        style: {
          backgroundColor: colors.inputBackground,
        },
        tabStyle: {
          backgroundColor: colors.inputBackground,
        },
        indicatorStyle: {
          backgroundColor: 'black',
        },
        labelStyle: {
          color: 'black',
        },
        // activeTintColor: colors.inputBackground,
        // inactiveTintColor: colors.inputBackground,
      },
    }),
  },
);

const CategorySearchStack = createStackNavigator({
  CategorySearchStack: {
    screen: SearchTabs,
    navigationOptions: ({navigation}) => ({
      header: ({navigation}) => (
        <ClothesSearchHeader
          onLeftButtonPress={() => NavigationService.navigateToHome()}
          onCartClick={() => navigation.navigate(screens.CartStack)}
          onSearchClick={() => navigation.navigate(screens.TextSearch)}
        />
      ),
    }),
  },
});

// CategorySearchStack.navigationOptions = {
//   header : ({navigation}) => <ClothesSearchHeader
//         onLeftButtonPress={() => navigation.navigate(screens.MainStack)}
//         onCartClick={() => navigation.navigate(screens.CartStack)}
//         onSearchClick={() => navigation.navigate(screens.TextSearch)}
//       />,
// }

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
      screen: SellStack,
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
