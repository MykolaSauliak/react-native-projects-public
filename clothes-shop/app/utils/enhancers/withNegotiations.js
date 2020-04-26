import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getNotifications} from '../../features/notifications/selectors';
import {addNotification, setViewed} from '../../features/notifications/actions';

const withNegotiations = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let notifications = useSelector(state => getNotifications(state)) || [];
  return (
    <BaseComponent
      {...props}
      notifications={notifications}
      notificationsCount={
        notifications ? notifications.filter(n => !n.viewed).length : null
      }
      addNotification={item => dispatch(addNotification(item))}
      setViewed={({item, id}) => dispatch(setViewed({item, id}))}
    />
  );
};

export default withNegotiations;
