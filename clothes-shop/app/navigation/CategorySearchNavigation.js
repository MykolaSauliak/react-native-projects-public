import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../styles/colors';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {NavigationService} from '../services';

import ClothesSearchHeader from '../containers/Headers/ClothesSearchHeader';
import LifestyleSearch from '../screens/Search/CategorySearch/LifestyleSearch';
import WomanSearch from '../screens/Search/CategorySearch/WomanSearch';
import ManSearch from '../screens/Search/CategorySearch/ManSearch';
import screens from '../constants/screens';

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
      navigationOptions: ({navigation}) => {
        const goBack = navigation.getParam('goBack',null)
        return {
          header: ({navigation}) => (
            <ClothesSearchHeader
              onLeftButtonPress={() => NavigationService.navigateToHome()}
              onCartClick={() => navigation.navigate(screens.CartStack)}
              onSearchClick={() => navigation.navigate(screens.TextSearch)}
              showBack={!!goBack}
              onBack={goBack}
            />
        ),
      }}
    },
  });

  
// CategorySearchStack.navigationOptions = {
//   header : ({navigation}) => <ClothesSearchHeader
//         onLeftButtonPress={() => navigation.navigate(screens.MainStack)}
//         onCartClick={() => navigation.navigate(screens.CartStack)}
//         onSearchClick={() => navigation.navigate(screens.TextSearch)}
//       />,
// }


export default CategorySearchStack;