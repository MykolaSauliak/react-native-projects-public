import * as R from 'ramda';

export const getComments = (listName, state) =>
  R.path(['comments', 'comments', listName], state);

export const getAllComments = state => R.path(['comments', 'comments'], state);

export const getLastUpdate = state => R.path(['comments', 'lastUpdate'], state);
