import types from './types';
import {ShopService} from '../../services';

export const addToWishlist = item => async dispatch => {
  //console.log('add to wishlis',item)
  let response = await ShopService.addToWishlist(item.id);
  dispatch({
    type: types.addToWishlist,
    payload: item,
  });
};

export const removeFromWishlist = id => async dispatch => {
  let response = await ShopService.removeFromWishlist(id);
  dispatch({
    type: types.removeFromWishlist,
    payload: id,
  });
};
