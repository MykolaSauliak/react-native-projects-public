import * as R from 'ramda';
import {createSelector} from 'reselect';

export const getSortedBy = (state, listName) =>
  R.path(['filtersort', 'sortedBy', listName], state);
export const getAvailableFilters = state =>
  R.path(['filtersort', 'availableFilters'], state);
export const getAppliedFilters = state =>
  R.path(['filtersort', 'appliedFilters'], state);
export const getNotAppliedFilters = state =>
  R.path(['filtersort', 'notAppliedFilters'], state);
export const getAppliedSort = state =>
  R.path(['filtersort', 'appliedSort'], state);
export const getNotAppliedSort = state =>
  R.path(['filtersort', 'notAppliedSort'], state);
export const getLastAppliedFiltersTs = state =>
  R.path(['filtersort', 'filterLastAppliedTs'], state);

export {};
