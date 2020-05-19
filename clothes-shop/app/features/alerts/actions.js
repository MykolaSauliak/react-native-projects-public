import types from './types';
import {ShopService} from '../../services';

const addAlert = (alert) => async dispatch => {
  // console.log('subscribeToPriceReduce', id);

  // dispatch({
  //   type: types.addAlert,
  //   payload: alert,
  // });

  ShopService.addAlert(alert)
    .then(({successful, error}) => {
        if (successful) {
          dispatch({
            type: types.addAlert,
            payload: alert,
          });
          dispatch({
            type: types.setError,
            payload: null,
          });
      }
      else{
        dispatch({
          type: types.setError,
          payload: error?.message || "", // string(?)
        });
      }
  })

  // trackEvent('add_notification_subscription',{
  //     topic : topic
  // })
  // console.log('added',id)
};

const removeAlert = (item = {}) => async dispatch => {
  // console.log('removeAlert', item?.id);

  // NotifService.unsubscribeToPriceReduction(id).then(_ => {
    dispatch({
      type: types.removeAlert,
      payload: item,
    });
  // });
  ShopService.removeAlert(item)
    .then(({successful, error}) => {
        if (successful) {
          dispatch({
            type: types.removeAlert,
            payload: item,
          });
          dispatch({
            type: types.setError,
            payload: null,
          });
      }else{
        dispatch({
          type: types.setError,
          payload: error?.message || "",
        });
      }
  })
  // trackEvent('add_notification_subscription',{
  //     topic : topic
  // })
  // console.log('unsubscribeToPriceReduce', id);
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
