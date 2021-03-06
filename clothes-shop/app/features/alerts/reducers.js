import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  loading: false,
  alerts: [
    /*
    {
    }
    */
  ],
  lastUpdate: null,
  error: null,
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.addAlert]: (state, {payload}) => {
    let alerts = state.alerts;
    alerts = [...alerts.filter(s => s != payload?.id), payload];
    return {...state, alerts, lastUpdate: Date.now()};
  },
  [types.removeAlert]: (state, {payload}) => {
    let alerts = state.alerts;
    alerts = [...alerts.filter(s => s && s.id != payload?.id)];
    return {...state, alerts, lastUpdate: Date.now()};
  },
  [types.setLoading]: (state, {payload}) => {
    return {...state, loading: payload};
  },
  [types.removeAllAlerts]: (state, {payload}) => {
    return {...state, alerts: []};
  },
  [types.setError]: (state, {payload}) => {
    return {...state, error: payload};
  },
});

export {initialState};
