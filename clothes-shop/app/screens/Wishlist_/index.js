import WishlistView from './WishlistView';
import {compose, withProps, withState, withHandlers} from 'recompose';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../features/wishlist/actions';
import {addToCart, removeFromCart} from '../../features/cart/actions';
import {getWishList} from '../../features/wishlist/selectors';
import {getCartitems} from '../../features/cart/selectors';
import {connect} from 'react-redux';
import screens from '../../constants/screens';

const mapStateToProps = state => ({
  wishlist: getWishList(state),
  cartItems: getCartitems(state),
});
// import categories from '../../mockData/categories'

const enhance = compose(
  connect(mapStateToProps),
  withState('showEdit', 'setShowEdit', false),
  withState('markedItems', 'setMarkedItems', []),
  withHandlers({
    openProductInfo: props => item => {
      // //console.log('product', item)
      props.navigation.navigate(screens.ProductInfo, {
        ...item,
        item: JSON.stringify(item),
        // prevScreen: screens.WishlistStack,
        specs: JSON.stringify(item.specs),
        similar_parts: JSON.stringify(item.similar_parts),
      });
    },
    toWishlist: ({dispatch}) => id => {
      dispatch(addToWishlist(id));
    },
    fromWishlist: ({dispatch}) => id => {
      dispatch(removeFromWishlist(id));
    },
    toCart: ({dispatch}) => id => {
      dispatch(addToCart(id));
    },
    fromCart: ({dispatch}) => id => {
      dispatch(removeFromCart(id));
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
    markedDelete: ({markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        dispatch(removeFromCart(item.id));
      });
    },
    markedToCart: ({markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        dispatch(addToCart(item.id));
        dispatch(removeFromWishlist(item.id));
      });
    },
  }),
);

export default enhance(WishlistView);
