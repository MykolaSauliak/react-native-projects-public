import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getNotifications,
  getFollowingSubscription,
  getPriceReductionSubscription,
} from '../../features/notifications/selectors';
import {
  addNotification,
  addNotifications,
  addNotificationsToStart,
  setViewed,
  unsubscribeToPriceReduce,
  subscribeToPriceReduce,
  removeAllNotification,
  setViewedAll,
  onNotificationOpen
} from '../../features/notifications/actions';

const withNotifications = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let notifications = useSelector(state => getNotifications(state)) || [];
  let price_reduce_ids =
    useSelector(state => getPriceReductionSubscription(state)) || [];
  let following_ids =
    useSelector(state => getFollowingSubscription(state)) || [];
  // console.log('notifications',notifications)
  return (
    <BaseComponent
      {...props}
      notifications={notifications}
      following_ids={following_ids}
      price_reduce_ids={price_reduce_ids}
      isPriceAlert={id => price_reduce_ids.includes(id)}
      isFollowingAlert={id => following_ids.includes(id)}
      notificationsCount={
        notifications ? notifications.filter(n => !n.viewed).length : null
      }
      unsubscribeToPriceReduce={item =>
        dispatch(unsubscribeToPriceReduce(item))
      }
      subscribeToPriceReduce={item => dispatch(subscribeToPriceReduce(item))}
      addNotification={item => dispatch(addNotification(item))}
      addNotifications={items => dispatch(addNotifications(items))}
      // addNotificationsToStart={items => dispatch(addNotificationsToStart(items))}
      removeAllNotification={() => dispatch(removeAllNotification())}
      setViewed={({item, id}) => dispatch(setViewed({item, id}))}
      setViewedAll={() => dispatch(setViewedAll())}
      onNotificationOpen={(item) => dispatch(onNotificationOpen(item))}
    />
  );
};

export default withNotifications;
