import {createStackNavigator} from 'react-navigation-stack';
import screens from '../constants/screens';
import {Notifications} from '../screens';
import {defaultNavigationOptions} from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Notifications]: Notifications,
  },
  {
    initialRouteKey: screens.Notifications,
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
