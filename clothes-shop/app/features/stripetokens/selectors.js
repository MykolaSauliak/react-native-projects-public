import * as R from 'ramda';

export const getTokens = state => R.path(['stripetokens', 'tokens'], state);
export const getSelectedToken = state =>
  R.path(['stripetokens', 'selectedToken'], state);
