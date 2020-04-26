import * as R from 'ramda';

export const getNotifications = state =>
  R.path(['notifications', 'notifications'], state);

export const getPriceReductionSubscription = state =>
  R.path(['notifications', 'price_reduce_ids'], state);

export const getFollowingSubscription = state =>
  R.path(['notifications', 'following_ids'], state);
