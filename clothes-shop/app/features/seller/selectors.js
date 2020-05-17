import * as R from 'ramda';

export const getSelectedSellProperty = (state, key) =>
  R.path(['seller', 'sellProduct',key], state);

export const getSelectedSellProduct = state =>
  R.path(['seller', 'sellProduct'], state);
export const getSelectedSellCategory = state =>
  R.path(['seller', 'sellProduct', 'selectedSellCategory'], state);
export const getSelectedSellSubcategory = state =>
  R.path(['seller', 'sellProduct', 'selectedSellSubcategory'], state);
export const getSelectedSellType = state =>
  R.path(['seller', 'sellProduct', 'selectedSellType'], state);
export const getSelectedSellSubtype = state =>
  R.path(['seller', 'sellProduct', 'selectedSellSubtype'], state);
export const getSelectedSellBrand = state =>
  R.path(['seller', 'sellProduct', 'selectedSellBrand'], state);
export const getSelectedSellMaterial = state =>
  R.path(['seller', 'sellProduct', 'selectedSellMaterial'], state);
export const getSelectedSellColor = state =>
  R.path(['seller', 'sellProduct', 'selectedSellColor'], state);
export const getSelectedSellPrinted = state =>
  R.path(['seller', 'sellProduct', 'selectedSellPrinted'], state);
export const getSelectedSellDescription = state =>
  R.path(['seller', 'sellProduct', 'selectedSellDescription'], state);

export const getSelectedSellPhotos = state =>
  R.path(['seller', 'sellProduct', 'selectedSellPhotos'], state);
export const getSelectedSell1Photo = state =>
  R.path(['seller', 'sellProduct', 'imageFirst'], state);
export const getSelectedSell2Photo = state =>
  R.path(['seller', 'sellProduct', 'imageSecond'], state);
export const getSelectedSell3Photo = state =>
  R.path(['seller', 'sellProduct', 'imageThird'], state);
export const getSelectedSell4Photo = state =>
  R.path(['seller', 'sellProduct', 'imageFourth'], state);
export const getSelectedSell5Photo = state =>
  R.path(['seller', 'sellProduct', 'imageFifth'], state);
export const getSelectedSellOtherPhotos = state =>
  R.path(['seller', 'sellProduct', 'images'], state);

export const getSelectedSellMeasurements = state =>
  R.path(['seller', 'sellProduct', 'selectedSellMeasurements'], state);
export const getSelectedSellCondition = state =>
  R.path(['seller', 'sellProduct', 'selectedSellCondition'], state);
export const getSelectedSellPrice = state =>
  R.path(['seller', 'sellProduct', 'selectedSellPrice'], state);
export const getSelectedSellVintage = state =>
  R.path(['seller', 'sellProduct', 'vintage'], state);
export const getSelectedSellSoldWith = state =>
  R.path(['seller', 'sellProduct', 'soldWith'], state);
export const getSelectedSellShippingCountry = state =>
  R.path(['seller', 'sellProduct', 'shipping_country'], state);
export const getSelectedSellShippingCountryCode = state =>
  R.path(['seller', 'sellProduct', 'shipping_country_code'], state);
export const getSeller = state => R.path(['seller', 'seller'], state);
export const getDrafts = state => R.path(['seller', 'drafts'], state);
export const getDraftsLastUpdate = state =>
  R.path(['seller', 'draftLastUpdate'], state);
