import types from './types';

const setLoading = loading => dispatch => {
  dispatch({
    type: types.setLoading,
    payload: loading,
  });
};

export {setLoading};
