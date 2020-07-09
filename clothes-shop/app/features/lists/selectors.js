import * as R from 'ramda';

export const getLists = (state) =>
  R.path(['lists', 'lists'], state);

export const getList = (listName, state) =>
  R.path(['lists', 'lists', listName], state);

export const getItems = (state) =>
  R.path(['lists', 'items'], state);

export const getItem = (listName, state) =>
  R.path(['lists', 'items', listName], state);
export const getLastUpdate = (state) => 
  R.path(['lists', 'lastUpdate'], state);