import SubCategoriesView from './SubCategoriesView';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import ShopService from '../../services';
import screens from '../../constants/screens';

const enhance = compose(
  withState('subcategories', 'setSubcategories', []),
  withState('loading', 'setLoading', false),
  // withProps(props => ({
  //     subcategories : JSON.parse(props.navigation.getParam('subcategories',[]) || '[]')
  // })),
  withHandlers({
    onPress: props => item => {
      //console.log('subcategory', item)
      props.navigation.navigate(screens.ProductListStack, {
        title: item.title || item.name,
        subcategory_id: item.id,
        category_id: props.navigation.getParam('category_id', ''),
      });
    },
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      const category_id = this.props.navigation.getParam('category_id', '');
      const subcategories = await ShopService.getSubcategories(category_id);
      //console.log('categories',categories)
      this.props.setSubcategories(subcategories);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(SubCategoriesView);
