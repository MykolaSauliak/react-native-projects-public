import * as R from 'ramda';

export const getNotifications = state =>
  R.path(['notifications', 'notifications'], state);

export const getPriceReductionSubscription = state =>
  R.path(['notifications', 'price_reduce_ids'], state);

export const getFollowingSubscription = state =>
  R.path(['notifications', 'following_ids'], state);

export const isNotificationExists = (notification = {}, state) => {

  const ntfcns =  R.path(['notifications', 'notifications'], state) || []
  if(!ntfcns.find(function(o = {}){ 
    return o.id == notification.id && 
    o.title == notification.title && 
    o.subtitle == notification.subtitle && 
    o.rightImage == notification.rightImage
  }) 
    ){
    return false
  }
  return true
};
