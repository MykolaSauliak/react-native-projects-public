import types from './types';

export const setEmail = email => dispatch => {
  dispatch({
    type: types.setEmail,
    payload: email,
  });
};
export const setUser = user => dispatch => {
  dispatch({
    type: types.setUser,
    payload: user,
  });
};

export const setPhone = phone => dispatch => {
  dispatch({
    type: types.setPhone,
    payload: phone,
  });
};

export const setAvatar = url => dispatch => {
  dispatch({
    type: types.setAvatar,
    payload: url,
  });
};

export const updateUser = update => dispatch => {
  dispatch({
    type: types.updateUser,
    payload: update,
  });
};
