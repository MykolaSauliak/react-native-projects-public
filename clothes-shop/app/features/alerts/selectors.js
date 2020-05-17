import * as R from 'ramda';

export const getAlerts = state =>
  R.path(['alerts', 'alerts'], state) || [];
