import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCartitems,
  isInCart,
  getCartLoading,
} from '../../features/cart/selectors';
import {
  addToCart,
  removeFromCart,
  pureActions,
  setCount,
  resetCart,
} from '../../features/cart/actions';
import {
  getTotalValue,
  getTotalWithTaxes,
  getAuthenticationFees,
  updateCart
} from '../../features/cart/operations';

const withCart = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let cartItems = useSelector(state => getCartitems(state)) || [];
  cartItems = cartItems.filter(c => c && typeof c.id === 'string');
  let cartLoading = useSelector(state => getCartLoading(state));
  // console.log('cartItems',cartItems.length)
  return (
    <BaseComponent
      {...props}
      cartCount={cartItems ? cartItems.length : 0}
      cartItems={cartItems}
      cartLoading={cartLoading}
      updateCart={() => dispatch(updateCart())}
      resetCart={() => dispatch(resetCart())}
      getTotalValue={() => getTotalValue(cartItems)}
      getTotalWithTaxes={() => getTotalWithTaxes(cartItems)}
      getAuthenticationFees={() => getAuthenticationFees(cartItems)}
      setCount={({id, count}) => dispatch(setCount({id, count}))}
      // addToCart={(item) => dispatch(addToCart(item))}
      // removeFromCart={(item) => dispatch(removeFromCart(item))}
      toCart={item => dispatch(addToCart(item))}
      fromCart={item => dispatch(removeFromCart(item))}
      isInCart={item => isInCart({cartItems, id: item.id})}
    />
  );
};

export default withCart;
