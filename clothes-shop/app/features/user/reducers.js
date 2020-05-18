import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  user: {},
  lastUpdate: null,
  // email: null,
  // phone: null,
  // avatar: null,
  // isLoggedIn : false,
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.setUser]: (state, {payload}) => {
    return {...state, user: payload};
  },
  [types.setEmail]: (state, {payload}) => {
    return {...state, email: payload};
  },
  [types.setPhone]: (state, {payload}) => {
    return {...state, phone: payload};
  },
  [types.updateUser]: (state, {payload}) => {
    return {...state, user: {...state.user, ...payload}, lastUpdate: Date.now()};
  },
  [types.setAvatar]: (state, {payload}) => {
    return {...state, user: {...state.user, avatar: payload}};
  },
});
