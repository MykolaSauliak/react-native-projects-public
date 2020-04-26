import * as R from 'ramda';

export const isInWishlist = ({state = {}, wishlistItems, id}) => {
  // if(!wishlist){
  //     wishlist = R.path(['wishlist','wishlist'], state)
  // }
  return wishlistItems.filter(w => w.id == id).length > 0;
  // return wishlist && wishlist.includes(id)
};

export const getWishList = state => R.path(['wishlist', 'wishlist'], state);
