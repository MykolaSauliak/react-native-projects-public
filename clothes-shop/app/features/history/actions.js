import types from './types';

export const addToHistory = payload => dispatch => {
  console.log('addToHistory', payload);
  dispatch({
    type: types.addToHistory,
    payload,
  });
};
