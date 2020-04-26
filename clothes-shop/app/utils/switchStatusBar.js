import {StatusBar} from 'react-native';
import screens from '../constants/screens';
import colors from '../styles/colors';

export default function(activeRouteName) {
  //console.log('activeRouteName',activeRouteName)
  switch (activeRouteName) {
    case screens.Support:
      StatusBar.setBackgroundColor(colors.dark);
      break;

    case screens.Catalog:
      StatusBar.setBackgroundColor(colors.orange);
      break;
    case screens.CategoriesView:
      StatusBar.setBackgroundColor(colors.orange);
      break;
    case screens.SubCategoriesView:
      StatusBar.setBackgroundColor(colors.orange);
      break;
    case screens.ProductList:
      StatusBar.setBackgroundColor(colors.orange);
      break;

    case screens.ProductInfo:
      StatusBar.setBackgroundColor(colors.gray);
      break;
    case screens.Profile:
      StatusBar.setBackgroundColor(colors.dark);
      break;
    case screens.Cart:
      StatusBar.setBackgroundColor(colors.gray);
      break;
    // case screens.Wishlist:
    //     StatusBar.setBackgroundColor(colors.gray)
    //     break
  }
}
