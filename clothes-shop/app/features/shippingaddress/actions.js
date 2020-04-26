import types from './types';

export const addShippingAddress = payload => dispatch => {
  dispatch({
    type: types.addShippingAddress,
    payload,
  });
};

export const removeShippingAddress = payload => dispatch => {
  dispatch({
    type: types.removeShippingAddress,
    payload: payload,
  });
};

export const setSelectedAddress = payload => dispatch => {
  dispatch({
    type: types.setSelectedAddress,
    payload,
  });
};
