import types from './types';
import {ShopService} from '../../services';

export const addToFollowing = user_id => async dispatch => {
  let response = await ShopService.addFollowing(user_id);
  if (response) {
    dispatch({
      type: types.addToFollowing,
      payload: user_id,
    });
  }
};

export const removeFromFollowing = user_id => async dispatch => {
  let response = await ShopService.removeFollowing(user_id);
  if (response) {
    dispatch({
      type: types.removeFromFollowing,
      payload: user_id,
    });
  }
};
