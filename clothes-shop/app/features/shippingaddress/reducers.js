import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  addresses: [],
  selectedAddress: {},
};

export default createReducer(initialState, {
  [types.addShippingAddress]: (state, {payload}) => {
    return {
      ...state,
      selectedAddress: payload,
      addresses: [
        ...state.addresses.filter(ad => ad.id != payload.id),
        payload,
      ],
    };
  },
  [types.removeShippingAddress]: (state, {payload}) => {
    return {
      ...state,
      addresses: [...state.addresses.filter(ad => ad.id != payload.id)],
    };
  },
  [types.setSelectedAddress]: (state, {payload}) => {
    return {...state, selectedAddress: payload};
  },
});
