import * as R from 'ramda';

export const getAddresses = state =>
  R.path(['shippingaddress', 'addresses'], state);
export const getSelectedAddress = state =>
  R.path(['shippingaddress', 'selectedAddress'], state);
