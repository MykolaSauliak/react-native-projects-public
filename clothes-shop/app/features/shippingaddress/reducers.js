import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  addresses: [],
  selectedAddress: {},
  lastAddressUpdate : null
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
  [types.updateAddress]: (state, {payload : {id, update}}) => {
    return {      
        ...state,
        lastAddressUpdate: Date.now(),
        selectedAddress: {...state.selectedAddress, ...update},
        addresses: state.addresses.map( ad => {
          if(ad?.id == id){
            ad = {
              ...ad,
              ...update
            }
          }
          return ad
        })
    };
  },
});
