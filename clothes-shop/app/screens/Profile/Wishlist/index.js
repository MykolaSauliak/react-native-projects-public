import WishlistView from './WishlistView';
import {compose, withProps, withState, withHandlers} from 'recompose';
import screens from '../../../constants/screens';
import {withCart, withWishlist} from '../../../utils/enhancers';

// import categories from '../../mockData/categories'

const enhance = compose(
  withCart(),
  withWishlist(),
  // connect(mapStateToProps),
  withState('showEdit', 'setShowEdit', false),
  withState('markedItems', 'setMarkedItems', []),
  withHandlers({
    openProductInfo: props => item => {
      // //console.log('product', item)
      props.navigation.navigate(screens.ProductInfo, {
        ...item,
        item: JSON.stringify(item),
        prevScreen: screens.WishlistStack,
        specs: JSON.stringify(item.specs),
        similar_parts: JSON.stringify(item.similar_parts),
      });
    },
    toggleItemMark: ({markedItems, setMarkedItems}) => item => {
      let newMarkedItems = [];
      if (markedItems.filter(i => i.id == item.id).length > 0) {
        newMarkedItems = [...markedItems.filter(i => i.id != item.id)];
      } else {
        newMarkedItems = [...markedItems.filter(i => i != item.id), item];
      }
      setMarkedItems(newMarkedItems);
    },
    markedDelete: ({fromCart, markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        fromCart(item);
      });
    },
    markedToCart: ({toCart, fromWishlist, markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        toCart(item);
        fromWishlist(item);
      });
    },
  }),
);

export default enhance(WishlistView);
