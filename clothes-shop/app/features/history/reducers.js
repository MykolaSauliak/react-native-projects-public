import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  // cartItems : {
  //   // "key" : count
  // },
  maxLength: 15,
  loading: false,
  items: [
    /*
    {
      id:string,
      marked:boolean,
      count:number,
    }
    */
  ],
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.addToHistory]: (state, {payload}) => {
    return {
      ...state,
      items: [
        payload,
        ...state.items.filter(obj => obj.id != payload.id),
      ].slice(0, state.maxLength),
    };
  },

  [types.setLoading]: (state, {payload}) => {
    return {...state, loading: payload};
  },
});
