import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  startTs: 0,
  premiumType: null,
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.setPremiumType]: (state, {payload}) => {
    return {...state, premiumType: payload};
  },
});
