import types from './types';

export const setListItems = (payload) => dispatch => {
  dispatch({
    type: types.setListItems,
    payload
  });
};

export const setCurrentListItem = (payload) => dispatch => {
  dispatch({
    type: types.setCurrentListItem,
    payload
  });
};

export const updateListItem = (payload) => dispatch => {
  dispatch({
    type: types.updateListItem,
    payload
  });
};

export const updateCurrentItem = (payload) => dispatch => {
  dispatch({
    type: types.updateCurrentItem,
    payload
  });
};

export const removeFromList = (payload) => dispatch => {
  dispatch({
    type: types.removeFromList,
    payload
  });
};
export const addToList = (payload) => dispatch => {
  dispatch({
    type: types.addToList,
    payload
  });
};