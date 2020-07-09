import {createStackNavigator} from 'react-navigation-stack';
import screens from '../constants/screens';
import ListScreen from '../screens/ListScreen';
import {defaultNavigationOptions} from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.ListScreen]: ListScreen,
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
