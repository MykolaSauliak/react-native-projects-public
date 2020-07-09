import * as R from 'ramda';

export const getCartLoading = state => R.path(['cart', 'cartLoading'], state);
export const getCartLastUpdate = state => R.path(['cart', 'lastCartUpdate'], state);

export const isInCart = ({cartItems, id}) => {
  // console.log('cartItems',cartItems)
  if (Array.isArray(cartItems)) {
    return cartItems.filter(w => w.id == id).length > 0;
  } else {
    return Object.keys(cartItems).includes(id);
  }
};

export const getCartitems = state => R.path(['cart', 'cartItems'], state);
