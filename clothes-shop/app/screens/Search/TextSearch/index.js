import TextSearchView from './TextSearchView';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
// import ShopService from '../../services';
// import screens from '../../constants/screens';
import {withSearch} from '../../../utils/enhancers';
import {connectHits, connectStateResults} from 'react-instantsearch-native';
import constants from '../../../constants';

const enhance = compose(
  withSearch(constants.clothes),
  //   withState('subcategories', 'setSubcategories', []),
  //   withState('loading', 'setLoading', false),
  //   // withProps(props => ({
  //   //     subcategories : JSON.parse(props.navigation.getParam('subcategories',[]) || '[]')
  //   // })),
  //   withHandlers({
  //     onPress: props => item => {
  //       //console.log('subcategory', item)
  //       props.navigation.navigate(screens.ProductListStack, {
  //         title: item.title || item.name,
  //         subcategory_id: item.id,
  //         category_id: props.navigation.getParam('category_id', ''),
  //       });
  //     },
  //     // goToCategorySearch : ({navigation}) => (item) => {
  //     //     //console.log('subcategory', item)
  //     //     navigation.navigate(screens.CategorySearch)
  //     // },
  //   }),
  // lifecycle({
  // componentDidMount() {
  //   // this.props.setSearchState({});
  // },

  // }),
);

export default enhance(TextSearchView);
// export default TextSearchView
