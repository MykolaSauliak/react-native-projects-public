import * as R from 'ramda';

export const getPremiumType = state =>
  R.path(['premium', 'premiumType'], state);
