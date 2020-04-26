import React from 'react';
import {ToastAndroid, Alert, Platform} from 'react-native';
import types from './types';

export const setSortedBy = (sortedBy, listName) => (dispatch, getState) => {
  // console.log('sortBy',sortBy)
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  dispatch({
    type: types.setSortedBy,
    payload: {
      sortedBy,
      listName,
    },
  });
};

export const toggleFilter = (field, value) => dispatch => {
  // console.log('sortBy',sortBy)
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  console.log('toggleFilter', field, value);
  dispatch({
    type: types.toggleFilter,
    payload: {
      field,
      value,
    },
  });
};

export const toggleSort = field => dispatch => {
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  console.log('toggleFilter', field);
  dispatch({
    type: types.toggleSort,
    payload: {
      field,
    },
  });
};

export const resetFilter = field => dispatch => {
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  dispatch({
    type: types.resetFilter,
  });
};
export const resetSort = field => dispatch => {
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  dispatch({
    type: types.resetSort,
  });
};
export const applyFilters = () => dispatch => {
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  dispatch({
    type: types.applyFilters,
  });
};
export const applySort = () => dispatch => {
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  dispatch({
    type: types.applySort,
  });
};

export const setAvailableFilters = filters => (dispatch, getState) => {
  // console.log('sortBy',sortBy)
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  dispatch({
    type: types.setAvailableFilters,
    payload: filters,
  });
};

export const setAppliedFilters = filters => (dispatch, getState) => {
  // console.log('sortBy',sortBy)
  // trackEvent('audio_sort',{
  //     sort_by : sortBy
  // })
  dispatch({
    type: types.setAppliedFilters,
    payload: filters,
  });
};
