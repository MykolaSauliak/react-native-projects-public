import BuyView from './BuyView';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import categories from '../../mockData/categories';
import screens from '../../constants/screens';
import ShopService from '../../services';

const enhance = compose(
  withState('categories', 'setCategories', []),
  withState('loading', 'setLoading', false),
  // withProps({
  //     categories
  // }),
  withHandlers({
    onClick: props => category => {
      // //console.log(' JSON.stringify(category.subcategories)', JSON.stringify(category.subcategories))
      props.navigation.navigate(screens.SubCategoriesView, {
        // subcategories : JSON.stringify(category),
        // category : category.title,
        category_id: category.id || category.id,
        title: category.title || category.name,
      });
    },
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      const categories = await Shop.getCategories();
      //console.log('categories',categories)
      this.props.setCategories(categories);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(BuyView);
