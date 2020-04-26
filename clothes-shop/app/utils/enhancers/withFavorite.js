import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {isFavorite, getFavoriteItems} from '../../features/favorite/selectors';
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from '../../features/favorite/actions';

const withFavorite = ({listName = 'defaults'}) => BaseComponent => props => {
  const dispatch = useDispatch();
  let favorites = useSelector(state => getFavoriteItems(listName, state)) || [];
  // let playbackState = useSelector(state => getPlayerState(state))
  // console.log('favorites',favorites.length)
  return (
    <BaseComponent
      {...props}
      favorites={favorites}
      isFavorite={({item, id}) => isFavorite({favorites, item, id})}
      addToFavorites={item => dispatch(addToFavorites(listName, item))}
      setFavorites={items => dispatch(setFavorites(listName, items))}
      removeFromFavorites={item =>
        dispatch(removeFromFavorites(listName, item))
      }
      toggleFavorite={({item, id}) => {
        // console.log('toggleFavorite',item ? item.id : id)
        if (!isFavorite({favorites, item, id})) {
          dispatch(addToFavorites(listName, item ? item : {id}));
        } else {
          dispatch(removeFromFavorites(listName, item ? item : {id}));
        }
      }}
      // toCart={(item) => dispatch(addToCart(item))}
      // fromCart={(item) => dispatch(removeFromCart(item))}
    />
  );
};

export default withFavorite;
