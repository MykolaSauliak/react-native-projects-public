import types from './types';
import {ShopService} from '../../services';

export const addToFavorites = (listName, item) => async dispatch => {
  // console.log('addToFavorites', item);
  // console.log('addToFavorites', listName);
  dispatch({
    type: types.addToFavorites,
    payload: {
      listName,
      item,
    },
  });
  let response = await ShopService.addToFavorites(item.id);
};

export const setFavorites = (listName, items) => dispatch => {
  dispatch({
    type: types.setFavorites,
    payload: {
      listName,
      items,
    },
  });
};

export const removeFromFavorites = (listName, item) => async dispatch => {
  dispatch({
    type: types.removeFromFavorites,
    payload: {
      listName,
      item,
    },
  });
  let response = await ShopService.removeFromFavorites(item.id);
};
