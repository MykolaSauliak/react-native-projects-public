import types from './types';
import {NotifService} from '../../services';

const addAlert = (alert) => async dispatch => {
  console.log('subscribeToPriceReduce', id);

  dispatch({
    type: types.addAlert,
    payload: alert,
  });

  // NotifService.subscribeToPriceReduction(id)
  //   .then(response => {
  //       if (response) {
  //         dispatch({
  //           type: types.addAlert,
  //           payload: alert,
  //         });
  //     }
  // });
  // trackEvent('add_notification_subscription',{
  //     topic : topic
  // })
  // console.log('added',id)
};

const removeAlert = (item) => async dispatch => {
  console.log('removeAlert', item?.id);

  // NotifService.unsubscribeToPriceReduction(id).then(_ => {
    dispatch({
      type: types.removeAlert,
      payload: item,
    });
  // });

  // trackEvent('add_notification_subscription',{
  //     topic : topic
  // })
  console.log('unsubscribeToPriceReduce', id);
};

const removeAllAlerts = () => dispatch => {
  dispatch({
    type: types.removeAllAlerts,
  });
};

export {
  addAlert,
  removeAlert,
  removeAllAlerts,
};
