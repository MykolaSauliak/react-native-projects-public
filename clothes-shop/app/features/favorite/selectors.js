import * as R from 'ramda';

export const isFavorite = ({favorites, item = {}, id}) => {
  // const favoritesId = R.path(['favorite','favoriteAudio'], state)
  return (
    favorites &&
    favorites.filter(f => f.id == id || (item && f.id == item.id)).length > 0
  );
};
export const getFavoriteAudio = (listName, state) =>
  R.path(['favorite', 'favorites', listName], state);
export const getFavoriteItems = (listName, state) =>
  R.path(['favorite', 'favorites', listName], state);
