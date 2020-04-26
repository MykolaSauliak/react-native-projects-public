import types from './types';
import {createActions, handleActions, combineActions} from 'redux-actions';

export const addToCart = id => dispatch => {
  console.log('addToCart', id);
  dispatch({
    type: types.addToCart,
    payload: {
      id,
      marked: false,
    },
  });
};

export const removeFromCart = id => dispatch => {
  // console.log('removeFromCart', id);
  dispatch({
    type: types.removeFromCart,
    payload: id,
  });
};

export const setCartLoading = loading => dispatch => {
  dispatch({
    type: types.setLoading,
    payload: loading,
  });
};

export const setCount = ({id, count}) => dispatch => {
  dispatch({
    type: types.setCount,
    payload: {
      id,
      count,
    },
  });
};

export const setCartItems = products => dispatch => {
  dispatch({
    type: types.setCartItems,
    payload: products,
  });
};

export const resetCart = () => dispatch => {
  dispatch({
    type: types.resetCart,
  });
};

// export const pureActions = {
//   setCartLoading : (loading) => ({type: types.setCartLoading, payload: loading}),
//   setCartItems : (cartItems) => ({type: types.setCartItems, payload: cartItems}),
//   updateCart : () => ({type: types.updateCart}),
// }
