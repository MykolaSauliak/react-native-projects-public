import HomeView from './HomeView';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import main_list from '../../mockData/main_list';
import popular_brands from '../../mockData/popular_brands.json';
import middleList from '../../mockData/middle_list.json';
import weLoveProducts from '../../mockData/weLoveProducts.json';
import entries from '../../mockData/horizontal_entries';
import screens from '../../constants/screens';
import {ShopService, NavigationService} from '../../services';
import {
  withFavorite, 
  withReduxLoading,
  withSearch
} from '../../utils/enhancers';
import constants from '../../constants';
import SplashScreen from 'react-native-splash-screen'
import {Brand} from '../../types/Shop'

const enhance = compose(
  withSearch(),
  withReduxLoading(),
  withFavorite({listName: constants.clothes}),
  withState('lists', 'setLists', main_list),
  // withState('entries', 'setEntries', []),
  withState('new_in_products', 'setNewInProduct', popular_brands),
  withState('popular_brands', 'setPopularBrand', popular_brands),
  withState('essentialList', 'setEssentialList', {}),
  // withState('middleList', 'essentialList', middleList),
  withState('weLoveProducts', 'setWeLoveProducts', weLoveProducts),
  // withState('loading', 'setLoading', false),
  // withProps({
  //     categories
  // }),
  withHandlers({
    onClick: props => category => {
      // //console.log(' JSON.stringify(category.subcategories)', JSON.stringify(category.subcategories))
      props.navigation.navigate(screens.SubCategoriesView, {
        // subcategories : JSON.stringify(category),
        // category : category.title,
        // category_id : category.id || category.id,
        // title : category.title || category.name,
      });
    },
    weLoveProductPress : ({search}) => () => {
      search('We love', {
        // title: 'We love',
        // refinementList: {
        //   we_love:  [true]
        // }
        toggle: {
          we_love: true
        }
      }, constants.clothes)
      // NavigationService.navigateToSearchResult({
      //   title: 'We Love',
      //   options: {tag_ids: [constants.WE_LOVE_TAG]},
      // })
    },
    onBrandCardPress : ({search}) => (brand : Brand) => {
      search(brand.title, {
        // title: brand.title,
        refinementList: {
          brand_name:  [brand.title]
        }
      }, constants.clothes)
      // NavigationService.navigateToSearchResult({
      //   title: brand.title,
      //   options: {brand_id: brand.id},
      // })
    }
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      const {items: we_love, count } = await ShopService.getGoods(
        {we_love:  true},
        // {tag_ids: [constants.WE_LOVE_TAG]},
        {},
        6,
      );
      const {items: new_in, new_in_count } = await ShopService.getGoods();
      const popular_brands = await ShopService.fetchPopulaBrands();
      const essentialList = await ShopService.fetchCollection({main_essential : true});
      this.props.setEssentialList(essentialList);
      this.props.setPopularBrand(popular_brands);
      this.props.setWeLoveProducts(we_love);
      this.props.setNewInProduct(new_in);
      // console.log('loading false')
      this.props.setLoading(false);
      SplashScreen.hide();
    },
  }),
);

export default enhance(HomeView);
