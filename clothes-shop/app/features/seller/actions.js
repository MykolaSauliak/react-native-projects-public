import types from './types';
const uuidv4 = require('uuid/v4');

export const setSellProperty = (key, value) => dispatch => {
  dispatch({
    type: types.setSellProperty,
    payload: {
      key, value
    },
  });
};
export const setSellerProperty = (key, value) => dispatch => {
  dispatch({
    type: types.setSellerProperty,
    payload: {
      key, value
    },
  });
};
export const setEmail = email => dispatch => {
  dispatch({
    type: types.setEmail,
    payload: email,
  });
};

export const setUser = user => dispatch => {
  dispatch({
    type: types.setUser,
    payload: user,
  });
};

export const setPhone = phone => dispatch => {
  dispatch({
    type: types.setPhone,
    payload: phone,
  });
};

export const setSellProduct = draft => dispatch => {
  dispatch({
    type: types.setSellProduct,
    payload: draft,
  });
};

export const setSelectedSellCategory = category => dispatch => {
  dispatch({
    type: types.setSelectedSellCategory,
    payload: category,
  });
};
export const setSelectedSellSubcategory = subcategory => dispatch => {
  dispatch({
    type: types.setSelectedSellSubcategory,
    payload: subcategory,
  });
};
export const setSelectedSellType = type => dispatch => {
  dispatch({
    type: types.setSelectedSellType,
    payload: type,
  });
};
export const setSelectedSellSubtype = type => dispatch => {
  dispatch({
    type: types.setSelectedSellSubtype,
    payload: type,
  });
};

export const setSelectedSellBrand = brand => dispatch => {
  dispatch({
    type: types.setSelectedSellBrand,
    payload: brand,
  });
};

export const setSelectedSellMaterial = payload => dispatch => {
  dispatch({
    type: types.setSelectedSellMaterial,
    payload: payload,
  });
};

export const setSelectedSellColor = payload => dispatch => {
  dispatch({
    type: types.setSelectedSellColor,
    payload: payload,
  });
};

export const setSelectedSellPrinted = payload => dispatch => {
  dispatch({
    type: types.setSelectedSellPrinted,
    payload: payload,
  });
};

export const setSelectedSellOtherPhotos = payload => dispatch => {
  dispatch({
    type: types.setSelectedSellOtherPhotos,
    payload: payload,
  });
};

export const setSelectedSell1Photo = payload => dispatch => {
  dispatch({
    type: types.setSelectedSell1Photo,
    payload: payload,
  });
};
export const setSelectedSell2Photo = payload => dispatch => {
  dispatch({
    type: types.setSelectedSell2Photo,
    payload: payload,
  });
};
export const setSelectedSell3Photo = payload => dispatch => {
  dispatch({
    type: types.setSelectedSell3Photo,
    payload: payload,
  });
};

export const setSelectedSell4Photo = payload => dispatch => {
  dispatch({
    type: types.setSelectedSell4Photo,
    payload: payload,
  });
};
export const setSelectedSell5Photo = payload => dispatch => {
  dispatch({
    type: types.setSelectedSell5Photo,
    payload: payload,
  });
};

export const setSelectedSellDescription = payload => dispatch => {
  dispatch({
    type: types.setSelectedSellDescription,
    payload: payload,
  });
};

export const setSelectedSellMeasurements = payload => dispatch => {
  dispatch({
    type: types.setSelectedSellMeasurements,
    payload: payload,
  });
};

export const setSelectedSellCondition = payload => dispatch => {
  dispatch({
    type: types.setSelectedSellCondition,
    payload: payload,
  });
};

export const setSelectedSellPrice = payload => dispatch => {
  dispatch({
    type: types.setSelectedSellPrice,
    payload: payload,
  });
};

export const setSeller = payload => dispatch => {
  dispatch({
    type: types.setSeller,
    payload: payload,
  });
};

export const setSellVintage = payload => dispatch => {
  dispatch({
    type: types.setSellVintage,
    payload: payload,
  });
};

export const setSellSoldWith = (key, value) => dispatch => {
  dispatch({
    type: types.setSellSoldWith,
    payload: {
      key,
      value
    },
  });
};

export const setShippingCountry = payload => dispatch => {
  dispatch({
    type: types.setShippingCountry,
    payload: payload,
  });
};
export const setShippingCountryCode = payload => dispatch => {
  dispatch({
    type: types.setShippingCountryCode,
    payload: payload,
  });
};

export const addDraft = payload => dispatch => {
  if (payload && !payload.id) {
    console.log('generate id');
    payload.id = uuidv4();
  }
  dispatch({
    type: types.addDraft,
    payload: payload,
  });
};

export const removeFromDrafts = id => dispatch => {
  dispatch({
    type: types.removeFromDrafts,
    payload: id,
  });
};
export const removeDrafts = () => dispatch => {
  dispatch({
    type: types.removeDrafts,
  });
};
