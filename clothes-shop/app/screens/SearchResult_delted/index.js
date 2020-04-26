import SearchResult from './SearchResult';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import {ShopService} from '../../services';
import _ from 'lodash';
import {withFavorite, withFilterSort} from '../../utils/enhancers';
import constants from '../../constants';

const enhance = compose(
  withFilterSort({listName: constants.clothes}),
  withFavorite({listName: constants.clothes}),
  withState('loading', 'setLoading', false),
  withState('items', 'setItems', []),
  withState('count', 'setCount', null),
  withProps(props => ({
    title: props.navigation.getParam('title', ''),
    options: props.navigation.getParam('options', {}),
    time: props.navigation.getParam('time', {}),
  })),
  withHandlers({
    onClick: props => category => {
      // //console.log(' JSON.stringify(category.subcategories)', JSON.stringify(category.subcategories))
      // props.navigation.navigate(screens.SubCategoriesView,
      //     {
      //     // subcategories : JSON.stringify(category),
      //     // category : category.title,
      //     category_id : category.id || category.id,
      //     title : category.title || category.name,
      //     }
      // )
    },
    toggleFavorite: ({navigation}) => item => {
      // console.log('navigateToProductInfo')
      // console.log('list title',item)
      // navigation.navigate(screens.ListScreen,{
      //     searchText: list.name || list.title || list
      // })
    },
  }),
  lifecycle({
    async componentDidMount(prevProps, prevState) {
      // console.log('componentDidMount', this.props.options);
      // console.log('componentDidMount', this.props.time);
      if (this.props.options || this.props.time) {
        // const options = this.props.navigation.getParam('options',{})
        // console.log('fetch products')
        console.log('search time ', this.props.time);
        this.props.setLoading(true);
        const {items: products, count} = await ShopService.getGoods(
          this.props.options,
          this.props.time,
        );
        // console.log('products result',products.length)
        this.props.setItems(products);
        this.props.setCount(count);
        this.props.setLoading(false);
      }
    },
    async componentDidUpdate(prevProps, prevState) {
      // console.log('componentDidUpdate',this.props.options)
      if (
        this.props.title != prevProps.title ||
        !_.isEqual(prevProps.options, this.props.options) ||
        !_.isEqual(prevProps.time, this.props.time) ||
        !_.isEqual(prevProps.appliedSort, this.props.appliedSort) ||
        !_.isEqual(prevProps.appliedFilters, this.props.appliedFilters)
      ) {
        // const options = this.props.navigation.getParam('options',{})
        console.log('search time ', this.props.time);
        this.props.setLoading(true);
        const {items: products, count} = await ShopService.getGoods(
          this.props.options,
          this.props.time,
        );
        this.props.setCount(count);
        console.log('products result', products.length);
        this.props.setItems(products);
        this.props.setLoading(false);
      }
    },
  }),
);

export default enhance(SearchResult);
