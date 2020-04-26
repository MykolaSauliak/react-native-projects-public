import ManSearchView from './ManSearchView';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import ShopService from '../../../../services';
import types from '../../../../mockData/types.json';
import subtypes from '../../../../mockData/subtypes.json';
import screens from '../../../../constants/screens';
import {withSearch} from '../../../../utils/enhancers';

const enhance = compose(
  withSearch(),
  withState('subcategories', 'setSubcategories', []),
  withState('loading', 'setLoading', false),
  withState('types', 'setTypes', types),
  withState('subtypes', 'setSubTypes', subtypes),
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
      // this.props.setLoading(true)
      // const category_id = this.props.navigation.getParam('category_id','')
      // const subcategories = await Shop.getSubcategories(category_id);
      // //console.log('categories',categories)
      // this.props.setSubcategories(subcategories);
      // this.props.setLoading(false)
    },
  }),
);

export default enhance(ManSearchView);
