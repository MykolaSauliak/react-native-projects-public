import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  showStatusBar: false,
  loading: false,
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.setShowStatusBar]: (state, {payload}) => {
    return {...state, showStatusBar: payload};
  },
  [types.setItem]: (state, {payload : {key, value}}) => {
    return {...state, [key]: value};
  },
  [types.setLoading]: (state, {payload}) => {
    return {...state, loading: payload};
  },
});
