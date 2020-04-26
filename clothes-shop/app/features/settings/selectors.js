import * as R from 'ramda';

export const getShowStatusBar = state =>
  R.path(['settings', 'showStatusBar'], state);
export const getLoading = state => R.path(['settings', 'loading'], state);
