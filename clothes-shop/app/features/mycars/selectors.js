import * as R from 'ramda';

export const getSelectedCarMake = state =>
  R.path(['mycars', 'selectedCarMake'], state);
export const getSelectedModel = state =>
  R.path(['mycars', 'selectedModel'], state);
export const getSelectedType = state =>
  R.path(['mycars', 'selectedType'], state);
export const getMyCars = state => R.path(['mycars', 'cars'], state);
export const getSelectedCar = state => R.path(['mycars', 'selectedCar'], state);
export const getSelectedCarId = state =>
  R.path(['mycars', 'selectedCarId'], state);
