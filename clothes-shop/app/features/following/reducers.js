import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  // cartItems : {
  //   // "key" : count
  // },
  maxLength: 15,
  loading: false,
  following: [
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
  [types.addToFollowing]: (state, {payload}) => {
    return {
      ...state,
      following: [
        payload,
        ...state.following.filter(user_id => user_id != payload),
      ],
    };
  },
  [types.removeFromFollowing]: (state, {payload}) => {
    return {
      ...state,
      following: [...state.following.filter(user_id => user_id != payload)],
    };
  },
  [types.setLoading]: (state, {payload}) => {
    return {...state, loading: payload};
  },
});
