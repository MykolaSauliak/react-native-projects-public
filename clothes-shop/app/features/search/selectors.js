import * as R from 'ramda';

export const getLastSearch = (listname, state) => {
  let items = R.path(['search', 'lastsearch', listname], state);
  if (items) {
    items = items.filter(item => item);
  }
  return items;
};

export const getSearchState = state => R.path(['search', 'searchState'], state);
export const getCurrentSearchItem = state =>
  R.path(['search', 'currentSearchItem'], state);
export const getLastUpdate = state => R.path(['search', 'lastUpdate'], state);
export const getTriggerRefresh = state => R.path(['search', 'triggerRefresh'], state);
