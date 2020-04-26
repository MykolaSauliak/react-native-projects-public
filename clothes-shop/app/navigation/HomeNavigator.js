import {createStackNavigator} from 'react-navigation';
import screens from './screens';
import {
  HomeScreen,
  UpdatePasswordScreen,
  AddNewItemScreen,
  CategoryScreen,
  ProductScreen,
  VerifyEmailScreen,
  GalleryScreen,
  RequestToRentScreen,
  CalendarScreen,
  HelpScreen,
  PrivacyPoliciesScreen,
  RequestToRentPaymentScreen,
  PayoutPreferencesScreen,
  CardListScreen,
  ProfileScreen,
  ChatScreen,
} from '../screens';
import {defaultNavigationOptions} from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.Home]: HomeScreen,
    [screens.UpdatePassword]: UpdatePasswordScreen,
    [screens.VerifyEmail]: VerifyEmailScreen,
    [screens.AddNewItem]: AddNewItemScreen,
    [screens.Category]: CategoryScreen,
    [screens.Product]: ProductScreen,
    [screens.Profile]: ProfileScreen,
    [screens.Gallery]: GalleryScreen,
    [screens.RequestToRent]: RequestToRentScreen,
    [screens.Calendar]: CalendarScreen,
    [screens.RequestToRentPayment]: RequestToRentPaymentScreen,
    [screens.CardList]: CardListScreen,
    [screens.Help]: HelpScreen,
    [screens.PrivacyPolicies]: PrivacyPoliciesScreen,
    [screens.PayoutPreferences]: PayoutPreferencesScreen,
    [screens.Chat]: ChatScreen,
  },
  {
    initialRouteKey: screens.Home,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
