import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getCartitems,
  isInCart,
  getCartLoading,
  getCartLastUpdate,
} from '../../features/cart/selectors';
import {
  addToCart,
  removeFromCart,
  pureActions,
  setCount,
  resetCart,
  setShippingOption,
} from '../../features/cart/actions';
import {
  getTotalValue,
  getTotalWithTaxes,
  getAuthenticationFees,
  getTotalWithTaxesFull,
  updateCart
} from '../../features/cart/operations';

const withCart = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let cartItems = useSelector(state => getCartitems(state)) || [];
  cartItems = cartItems.filter(c => c && typeof c.id === 'string');
  let cartLoading = useSelector(state => getCartLoading(state));
  let lastCartUpdate = useSelector(state => getCartLastUpdate(state));
  // console.log('cartItems',cartItems.length)
  return (
    <BaseComponent
      {...props}
      cartCount={cartItems ? cartItems.length : 0}
      cartItems={cartItems}
      lastCartUpdate={lastCartUpdate}
      cartLoading={cartLoading}
      updateCart={() => dispatch(updateCart())}
      resetCart={() => dispatch(resetCart())}
      getTotalValue={() => getTotalValue(cartItems)}
      getTotalWithTaxes={() => getTotalWithTaxes(cartItems)}
      getTotalWithTaxesFull={() => getTotalWithTaxesFull(cartItems)}
      getAuthenticationFees={() => getAuthenticationFees(cartItems)}
      setCount={({id, count}) => dispatch(setCount({id, count}))}
      setShippingOption={({id, option}) => dispatch(setShippingOption({id, option}))}
      // addToCart={(item) => dispatch(addToCart(item))}
      // removeFromCart={(item) => dispatch(removeFromCart(item))}
      toCart={item => dispatch(addToCart(item))}
      fromCart={item => dispatch(removeFromCart(item))}
      isInCart={item => isInCart({cartItems, id: item.id})}
    />
  );
};

export default withCart;
