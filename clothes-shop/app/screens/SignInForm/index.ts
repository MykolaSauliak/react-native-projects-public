import {
    SignInForm1,
    SignInForm1Props,
  } from './SignInFormView';

export { SignInForm1Data } from './type';
export default SignInForm1;
// import LoginView from './LoginView';
// import {
//  compose,
//  withProps,
//  withHandlers
// } from 'recompose'
// import products from '../../mockData/products'
// import screens from '../../constants/screens';
// import { addToWishlist, removeFromWishlist } from '../../features/wishlist/actions'
// import { addToCart, removeFromCart } from '../../features/cart/actions'
// import { connect } from "react-redux";
// import {getWishList } from '../../features/wishlist/selectors'
// import {getCartitems } from '../../features/cart/selectors'

// const mapStateToProps = (state) => ({
//     wishlist : getWishList(state),
//     cartItems : getCartitems(state)
// })

// const enhance = compose(
//     connect(mapStateToProps),
//     withProps({
//         products
//     }),
//     withHandlers({
//     })
// )

// export default enhance(LoginView);
