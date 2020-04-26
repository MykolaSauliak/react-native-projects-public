import * as R from 'ramda';

export const getScore = state => R.path(['score', 'score'], state);
