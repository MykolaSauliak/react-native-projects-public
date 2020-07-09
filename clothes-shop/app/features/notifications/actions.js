import types from './types';
import {NotifService, NavigationService} from '../../services';

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
export const addNotifications = (payload = []) => dispatch => {
  // console.log('addNotifications', payload);
  dispatch({
    type: types.addNotifications,
    payload
  });
};

// export const addNotificationsToStart = payload => dispatch => {
//   // console.log('addNotifications', payload);
//   dispatch({
//     type: types.addNotificationsToStart,
//     payload
//   });
// };

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

const setOpenedNotification = (payload) => dispatch => {
  dispatch({
    type: types.setOpenedNotification,
    payload
  });
};

const onNotificationOpen = (item) => dispatch => {
  console.log('try to open notification',item)
  // function sleep(milliseconds) {
  //   console.log('sleep')
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  // }
  if(!item){
    return
  }

  try{
    // console.log('onNotificationOpen item',item)
    dispatch(setViewed({id: item.id}))
    // while(!NavigationService._navigation){
    //   sleep(200)
    // }
    dispatch(setOpenedNotification(null))
    switch(item.type){
      case 'product':
        // if(item.status)
        NavigationService.navigateToProduct({id: item.product_id})
        break
      case 'user':
        console.log('navigate to user profile')
        NavigationService.navigateToCustomUserProfile({user_id : item.user_id})
        break
      case 'negotiation':
        // console.log('go to negotiation')
        NavigationService.navigateToNegotiations({...item, id: item.negotiation_id})
        break
    }

  }catch(err){
    console.log('error',err)
  }

}

export {
  addSubscription,
  removeSubscription,
  subscribeToPriceReduce,
  unsubscribeToPriceReduce,
  onNotificationOpen,
  setOpenedNotification
};
