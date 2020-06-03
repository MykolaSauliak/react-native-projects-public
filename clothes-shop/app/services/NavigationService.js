import {Linking} from 'react-native';
import {NavigationActions, DrawerActions} from 'react-navigation';
import screens from '../constants/screens';
import {isAndroid} from '../utils';

class NavigationService {

  _navigation = null;

  init(navigation) {
    if (this._navigation) {
      return;
    }

    this._navigation = navigation;
  }

  navigate(screen, params) {
    const route = {routeName: screen, params};
    this._navigation.dispatch(NavigationActions.navigate(route));
  }

  navigateToApp(props) {
    this.navigate(screens.MainStack, props);
  }

  navigateToAuth(props) {
    this.navigate(screens.Auth, props);
  }

  navigateToDrafts(props) {
    this.navigate(screens.Sell, props);
  }

  navigateToAddressEditor(props) {
    this.navigate(screens.AddShippingAddressScreen, props);
  }

  navigateToCategorySearch(props) {
    this.navigate(screens.CategorySearch, props);
  }

  navigateToHome(props) {
    this.navigate(screens.HomeScreen, props);
  }

  navigateToUpdatePassword(props) {
    this.navigate(screens.UpdatePassword, props);
  }

  navigateToVerifyEmail(props) {
    this.navigate(screens.VerifyEmail, props);
  }

  navigateToAddNewItem(props) {
    this.navigate(screens.AddNewItem, props);
  }

  navigateToCategory(props) {
    this.navigate(screens.Category, props);
  }

  navigateToCart(props) {
    this.navigate(screens.CartStack, props);
  }

  goBack() {
    this._navigation.dispatch(NavigationActions.back());
  }

  openDrawer() {
    this._navigation.dispatch(DrawerActions.openDrawer());
  }

  closeDrawer() {
    this._navigation.dispatch(DrawerActions.closeDrawer());
  }

  navigateTo(screen, props) {
    this.navigate(screen, props);
  }

  navigateToProduct(props) {
    this.navigate(screens.ProductInfo, props);
  }

  navigateToOrders(props) {
    this.navigate(screens.MyOrders, props);
  }

  navigateToList(props) {
    this.navigate(screens.ListScreen, props);
  }
  
  navigateToGrid(props) {
    this.navigate(screens.GridScreen, props);
  }

  navigateToProfile(props) {
    this.navigateTo(screens.Profile, props);
  }

  navigateToAccountDetails(props) {
    this.navigateTo(screens.AccountDetails, props);
  }

  navigateToMyItems(props) {
    this.navigateTo(screens.MyItems, props);
  }

  navigateToMyNegotiations(props) {
    this.navigateTo(screens.PriceOfferSent, props);
  }

  navigateToNegotiationOptions(props) {
    this.navigateTo(screens.NegotiationOptions, props);
  }

  navigateToAlerts(props) {
    this.navigateTo(screens.MyAlerts, props);
  }

  navigateToAddresses(props) {
    this.navigateTo(screens.MyAddresses, props);
  }

  navigateToCustomUserProfile(props) {
    this.navigateTo(screens.UserProfile, props);
  }

  navigateToHelp(props) {
    this.navigateTo(screens.Home, props);
  }

  navigateToNotification(props) {
    switch (props.type) {
      case 'profile':
        this.navigate(screens.UserProfile, props);
      case 'negotiation':
        this.navigate(screens.Negotiations, props);
      default:
        return;
    }
  }

  navigateToNegotiations(props) {
    this.navigate(screens.Negotiations, props);
  }

  navigateToHolidayMode(props) {
    this.navigate(screens.HolidayMode, props);
  }

  navigateToNotifications(props) {
    this.navigate(screens.Notifications, props);
  }

  /** for search */

  navigateToTextSearch(props) {
    this.navigate(screens.TextSearch, props);
  }

  navigateToSearchResult(props) {
    // this.navigateTo(screens.SearchStack);
    this.navigateTo(screens.SearchResult, props);
  }

  navigateToSearchHistory(props) {
    this.navigateTo(screens.SearchHistory, props);
  }

  navigateToFilterSortScreen(props) {
    this.navigateTo(screens.FilterSort, props);
  }
  
  navigateToFilterList(props) {
    this.navigateTo(screens.FilterList, props);
  }

  /** */

  navigateToStats(props) {
    this.navigate(screens.Stats, props);
  }

  navigateToChat(props) {
    this.navigate(screens.Chat, props);
  }

  navigateToCheckout(props) {
    this.navigate(screens.Checkout, props);
  }

  /** for sell screens */
  navigateToSellProductInformationSelect(props) {
    this.navigate(screens.SelectSellInformation, props);
  }

  navigateToSellSteps(props) {
    this.navigate(screens.SelectSellMainSteps, props);
  }

  navigateToSellProductPrintedSelect(props) {
    this.navigate(screens.SelectSellPrinted, props);
  }
  navigateToSellProductColorSelect(props) {
    this.navigate(screens.SelectSellColor, props);
  }
  navigateToSellProductMaterialSelect(props) {
    this.navigate(screens.SelectSellMaterial, props);
  }

  navigateToSellProductSubcategorySelect(props) {
    this.navigate(screens.SelectSellSubcategory, props);
  }

  navigateToSellProductPhotoSelect(props) {
    this.navigate(screens.SelectSellPhotos, props);
  }

  navigateToSellProductDescriptionSelect(props) {
    this.navigate(screens.SelectSellDescription, props);
  }

  navigateToSellProductConditionSelect(props) {
    this.navigate(screens.SelectSellCondition, props);
  }

  navigateToSellerSelect(props) {
    this.navigate(screens.SelectSeller, props);
  }

  navigateToWishlist(props) {
    this.navigate(screens.Wishlist, props);
  }

  navigateToFavorites(props) {
    this.navigate(screens.Favorites, props);
  }
  
  navigateToAlertCreate(props) {
    this.navigate(screens.AlertStack, props);
  }

  navigateToSellProductOptionalSelect(props) {
    this.navigate(screens.SelectSellOptionalInformation, props);
  }

  navigateToBrandChoose(props) {
    this.navigate(screens.BrandChoose, props);
  }
  navigateToPriceInput(props) {
    this.navigate(screens.PriceInput, props);
  }

  /** for comments */
  navigateToCommentList(props) {
    this.navigate(screens.CommentList, props);
  }
  /** end sell navigation */

  initDeepLinking() {
    if (isAndroid()) {
      Linking.getInitialURL().then(url => {
        this.handleOpenURL(url);
      });
    } else {
      Linking.addEventListener('url', e => this.handleOpenURL(e.url));
    }
  }

  handleOpenURL(url) {
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('?')[0];

    if (routeName === 'update-password') {
      const token = route.match(/t=([^&]*)/)[1];
      const email = route.match(/e=([^&]*)/)[1].replace('%40', '@');

      this.navigateToUpdatePassword({token, email});
    }

    if (routeName === 'verify-email') {
      const token = route.match(/t=([^&]*)/)[1];

      this.navigateToVerifyEmail({token});
    }
  }
}

export default new NavigationService();
