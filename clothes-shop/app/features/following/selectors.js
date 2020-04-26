import * as R from 'ramda';

export const isUserFollowed = ({following, user_id, item = {}}) => {
  // const favoritesId = R.path(['favorite','favoriteAudio'], state)
  return (
    following &&
    following.filter(f => f.id == user_id || f.id == item.user_id).length > 0
  );
};
export const getFollowingLoading = state =>
  R.path(['history', 'loading'], state);
export const getFollowing = state => R.path(['following', 'following'], state);
