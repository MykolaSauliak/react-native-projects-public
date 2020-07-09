import CartView from './CartView';
import {
  compose,
  withProps,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import {setCount} from '../../features/cart/actions';
import {isLoggedIn} from '../../features/user/selectors';
import {connect} from 'react-redux';
import screens from '../../constants/screens';
import {PaypalService} from '../../services';
import {withCart, withWishlist, withLoading} from '../../utils/enhancers';
import _ from 'lodash';

const mapStateToProps = state => ({
  // wishlist : getWishList(state),
  // cartItems : getCartitems(state),
  // cartLoading : getCartLoading(state),
  isLoggedIn: isLoggedIn(state),
});
// import categories from '../../mockData/categories'

const enhance = compose(
  connect(mapStateToProps),
  withCart(),
  withWishlist(),
  withLoading(),
  withState('products', 'setProduct', []),
  withState('lastUpdated', 'setLastUpdated', (Date.now() / 1000).toFixed(0)),
  withState('showEdit', 'setShowEdit', false),
  withState('selectedItem', 'setSelectedItem', null),
  withState('selectedCount', 'selectedCount', 1),
  withState('approvalUrl', 'setApprovalUrl', null),
  withState('accessToken', 'setAccessToken', ''),
  withState('markedItems', 'setMarkedItems', []),
  withState('loading', 'setLoading', false),
  // withState('isLoggedIn', 'setLoggedIn', false),
  // withProps({
  //     isLoggedIn : Auth.isLoggedIn()
  // }),
  withHandlers({
    openProductInfo: props => item => {
      // const image = item.image ? item.image[0] ? item.image[0].src : ''  : ""
      // //console.log('product', item)
      props.navigation.navigate(screens.ProductInfo, {
        ...item,
        item: JSON.stringify(item),
        specs: JSON.stringify(item.specs),
        prevScreen: screens.Cart,
        similar_parts: JSON.stringify(item.similar_parts),
      });
    },
    changeCount: ({dispatch}) => ({id, count}) => {
      //console.log('id',id,'count',count)
      if (id) {
        dispatch(setCount({id, count}));
      }
    },
    markedDelete: ({fromCart, markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        fromCart(item.id);
      });
    },
    markedToWishlist: ({toWishlist, fromCart, markedItems, dispatch}) => () => {
      markedItems.forEach(item => {
        toWishlist(item);
        fromCart(item.id);
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
    toPaypal: ({
      cartItems,
      navigation,
      setAccessToken,
      dispatch,
    }) => async () => {
      PaypalService.createOrder({items: cartItems});
    },
  }),
  lifecycle({
    componentDidMount() {
      console.log('cart view componentDidMount');
      this.props.updateCart();
      // const isLoggedIn = Auth.isLoggedIn()
      // this.props.setLoggedIn(isLoggedIn)
    },
    componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevProps.cartItems, this.props.cartItems)) {
        this.props.updateCart();
      }
    },
  }),
);

export default enhance(CartView);
