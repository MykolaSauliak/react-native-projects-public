import ProductListView from './ProductListView';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import products from '../../mockData/products';
import screens from '../../constants/screens';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../features/wishlist/actions';
import {getSelectedCar} from '../../features/mycars/selectors';
import {addToCart, removeFromCart} from '../../features/cart/actions';
import {connect} from 'react-redux';
import {getWishList} from '../../features/wishlist/selectors';
import {getCartitems} from '../../features/cart/selectors';
import ShopService from '../../services';
const mapStateToProps = state => ({
  wishlist: getWishList(state),
  cartItems: getCartitems(state),
  selectedCar: getSelectedCar(state),
});

const enhance = compose(
  connect(mapStateToProps),
  withState('products', 'setProducts', []),
  withState('filteredProducts', 'setFilteredProducts', []),
  // withProps({
  //     products
  // }),
  withHandlers({
    openProductInfo: props => item => {
      // //console.log('product', item)
      props.navigation.navigate(screens.ProductInfo, {
        ...item,
        item: JSON.stringify(item),
        specs: JSON.stringify(item.specs),
        similar_parts: JSON.stringify(item.similar_parts),
      });
    },
    toWishlist: ({dispatch}) => item => {
      dispatch(addToWishlist(item));
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
  }),
  lifecycle({
    async componentDidMount() {
      const category_id = this.props.navigation.getParam('category_id', '');
      const subcategory_id = this.props.navigation.getParam(
        'subcategory_id',
        '',
      );
      //console.log('categoryid',categoryId)
      //console.log('subcategoryid',subcategoryId)
      // console.log('this.props.car_id',this.props.selectedCar.car_id)
      // console.log('this.props.selectedCar',this.props.selectedCar.carmake)
      const {items: products, count} = await Shop.getGoods({
        category_id,
        subcategory_id,
        car_id: this.props.selectedCar.car_id,
      });
      // console.log('fetched products -',products.length);
      // console.log('subcategory_id - ',subcategory_id);
      this.props.setProducts(products);
      this.props.setFilteredProducts(products);
    },
  }),
);

export default enhance(ProductListView);
