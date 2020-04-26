import * as R from 'ramda';

export const getHistoryLoading = state => R.path(['history', 'loading'], state);
export const getHistoryItems = state => R.path(['history', 'items'], state);
