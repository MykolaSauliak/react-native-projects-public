import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  tokens: [],
  selectedToken: {},
};

export default createReducer(initialState, {
  [types.addStripeToken]: (state, {payload}) => {
    console.log('addToken', payload);
    return {
      ...state,
      selectedToken: payload,
      tokens: [
        ...state.tokens.filter(token => token.tokenId != payload.tokenId),
        payload,
      ],
    };
  },
  // [types.updateAddress]: (state, { payload }) => {
  //   let selectedAddress = state.selectedAddress;
  //   let addresses = state.addresses;
  //   addresses = addresses.forEach( addr => {
  //     if(addr && addr.id == payload.id){
  //       return {
  //         ...addr,
  //         ...payload.update,
  //       }
  //     }
  //     return addr
  //   })
  //   if(selectedAddress && selectedAddress.id == payload.id){
  //     selectedAddress = {
  //       ...selectedAddress,
  //       ...payload.update
  //     }
  //   }
  //   return { ...state,selectedAddress, addresses}
  // },
  // [types.removeShippingAddress]: (state, { payload }) => {
  //   return { ...state, addresses : [...state.addresses.filter( ad => ad.id != payload.id)] }
  // },
  [types.setToken]: (state, {payload}) => {
    return {...state, selectedToken: payload};
  },
});
