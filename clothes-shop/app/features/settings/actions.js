import types from './types';

const setLoading = loading => dispatch => {
  dispatch({
    type: types.setLoading,
    payload: loading,
  });
};

const setItem = (key, value) => dispatch => {
  dispatch({
    type: types.setItem,
    payload: {
      key,
      value
    },
  });
};

export {
  setLoading,
  setItem
};
