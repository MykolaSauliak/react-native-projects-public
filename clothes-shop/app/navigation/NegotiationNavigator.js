import {createStackNavigator} from 'react-navigation-stack';
import screens from '../constants/screens';
import {Negotiations} from '../screens';
import NegotiationOptions from '../screens/Negotiations/components/NegotiationOptions';
import {defaultNavigationOptions} from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Negotiations]: {
      screen: Negotiations,
      navigationOptions: {
        header: null,
      },
    },
    [screens.NegotiationOptions] : NegotiationOptions,
  },
  {
    initialRouteKey: screens.Negotiations,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
