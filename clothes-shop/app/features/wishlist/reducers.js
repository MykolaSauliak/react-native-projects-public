import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  wishlist: [
    /*
    {
      id:string,
      marked:boolean
    }
    */
  ],
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.addToWishlist]: (state, {payload}) => {
    return {
      ...state,
      wishlist: [
        ...state.wishlist.filter(obj => obj.id != payload.id),
        payload,
      ],
    };
  },
  [types.removeFromWishlist]: (state, {payload}) => {
    return {
      ...state,
      wishlist: [...state.wishlist.filter(obj => obj.id != payload)],
    };
  },
});
