import types from './types';

export const addStripeToken = payload => dispatch => {
  // console.log('addToken')
  dispatch({
    type: types.addStripeToken,
    payload,
  });
};

// export const updateAddress = ({id, update}) => dispatch => {
//     dispatch({
//         type: types.updateAddress,
//         payload : {
//             id,
//             update
//         }
//     })
// }

// export const removeShippingAddress = (payload) => dispatch => {
//     dispatch({
//         type: types.removeShippingAddress,
//         payload: payload
//     })
// }

export const setToken = payload => dispatch => {
  dispatch({
    type: types.setToken,
    payload,
  });
};
