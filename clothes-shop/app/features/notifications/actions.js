import types from './types';
import {NotifService} from '../../services';

const subscribeToPriceReduce = id => async dispatch => {
  console.log('subscribeToPriceReduce', id);

  NotifService.subscribeToPriceReduction(id).then(response => {
    if (response) {
      dispatch({
        type: types.subscribeToPriceReduce,
        payload: id,
      });
    }
  });

  // trackEvent('add_notification_subscription',{
  //     topic : topic
  // })
  // console.log('added',id)
};

const unsubscribeToPriceReduce = id => async dispatch => {
  console.log('unsubscribeToPriceReduce', id);

  NotifService.unsubscribeToPriceReduction(id).then(_ => {
    dispatch({
      type: types.unsubscribeToPriceReduce,
      payload: id,
    });
  });

  // trackEvent('add_notification_subscription',{
  //     topic : topic
  // })
  console.log('unsubscribeToPriceReduce', id);
};

const addSubscription = topic => async dispatch => {
  await NotifService.addSubscription(topic);
  console.log('addSubscription', topic);
  dispatch({
    type: types.addSubscription,
    payload: topic,
  });
  trackEvent('add_notification_subscription', {
    topic: topic,
  });
};

const removeSubscription = topic => async dispatch => {
  await NotifService.unsubscribeToTopic(topic);
  console.log('removeSubscription', topic);
  dispatch({
    type: types.removeSubscription,
    payload: topic,
  });
  trackEvent('remove_notification_subscription', {
    topic: topic,
  });
};

export const addNotification = item => dispatch => {
  console.log('addNotification', item);
  dispatch({
    type: types.addNotification,
    payload: {
      ...item,
      viewed: false,
    },
  });
};

export const setViewed = ({item = {}, id}) => dispatch => {
  dispatch({
    type: types.setViewed,
    payload: id || item.id,
  });
};

export const setViewedAll = () => dispatch => {
  dispatch({
    type: types.setViewedAll,
  });
};

export const removeAllNotification = () => dispatch => {
  dispatch({
    type: types.removeAllNotification,
  });
};

export {
  addSubscription,
  removeSubscription,
  subscribeToPriceReduce,
  unsubscribeToPriceReduce,
};
