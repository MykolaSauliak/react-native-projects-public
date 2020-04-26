import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  favorites: {
    defaults: [],
  },
  showTimes: {},
  // favoriteAudio : [],
  // favoriteTextHistories : [],
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.addToFavorites]: (state, {payload: {listName, item}}) => {
    let favorites = state.favorites;
    if (!favorites[listName]) {
      favorites[listName] = [];
    }
    favorites[listName] = [
      ...favorites[listName].filter(i => i.id != item.id),
      item,
    ];
    return {...state, favorites};
  },
  [types.setFavorites]: (state, {payload: {listName, items}}) => {
    let favorites = state.favorites;
    favorites[listName] = [...items];
    return {...state, favorites};
  },
  [types.removeFromFavorites]: (state, {payload: {listName, item}}) => {
    let favorites = state.favorites;
    favorites[listName] = favorites[listName] || [];
    favorites[listName] = [...favorites[listName].filter(i => i.id != item.id)];
    return {...state, favorites};
    // return {...state, favoriteAudio : [...state.favoriteAudio.filter(item => item.id != payload.id)]}
  },
});
