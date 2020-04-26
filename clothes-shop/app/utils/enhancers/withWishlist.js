import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getWishList, isInWishlist} from '../../features/wishlist/selectors';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../features/wishlist/actions';

const withWishlist = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let wishlistItems = useSelector(state => getWishList(state)) || [];

  return (
    <BaseComponent
      {...props}
      wishlistCount={wishlistItems ? wishlistItems.length : null}
      wishlistItems={wishlistItems}
      toWishlist={item => dispatch(addToWishlist(item))}
      fromWishlist={item => dispatch(removeFromWishlist(item))}
      isInWishlist={item => isInWishlist({wishlistItems, id: item.id})}
    />
  );
};

export default withWishlist;
