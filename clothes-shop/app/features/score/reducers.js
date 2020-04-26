import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  score: 0,
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.addScore]: (state, {payload}) => {
    return {...state, score: payload};
  },
});
