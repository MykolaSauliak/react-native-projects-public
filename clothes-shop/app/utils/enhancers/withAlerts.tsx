import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAlerts} from '../../features/alerts/selectors';
import {addAlert, removeAlert} from '../../features/alerts/actions';
import { Alert } from "../../types/Alert.type";

const withAlerts = (options = {}) => BaseComponent => props => {
  const dispatch = useDispatch();
  let alerts = useSelector(state => getAlerts(state)) || [];
  let properties = {}

  if(options.pick && Array.isArray(options.pick)){
    options.pick.forEach((key:string) => {
        properties[key] = useSelector(state => state.alerts[key])
    })
  }
  return (
    <BaseComponent
      {...props}
      {...properties}
      alerts={alerts}
      addAlert={(item : Alert) => dispatch(addAlert(item))}
      removeAlert={(item : Alert)  => dispatch(removeAlert(item))}
    />
  );
};

export default withAlerts;
