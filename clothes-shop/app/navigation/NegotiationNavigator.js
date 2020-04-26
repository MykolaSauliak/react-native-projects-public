import {createStackNavigator} from 'react-navigation-stack';
import screens from '../constants/screens';
import {Negotiations} from '../screens';
import {defaultNavigationOptions} from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Negotiations]: {
      screen: Negotiations,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteKey: screens.Negotiations,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
