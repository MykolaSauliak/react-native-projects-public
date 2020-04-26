import React from 'react';
import {
  InstantSearch,
  connectSearchBox,
  connectInfiniteHits,
  connectRefinementList,
  connectStats,
  connectMenu,
  connectSortBy,
  connectStateResults,
  connectRange,
  connectCurrentRefinements,
} from 'react-instantsearch-native';
import FilterSortButtonComponent from '../../components/FilterSortButton';
import LoadingComponent from '../../components/Loading';
import _ from 'lodash';

let FilterSortButton = ({searchState, ...props}) => {
  // console.log('items',items.length)
  console.log('searchState', searchState);
  let nbFilters = 0;
  Object.entries(searchState?.refinementList || {}).forEach(([key, value]) => {
    if (value) {
      nbFilters += 1;
    }
  });
  Object.entries(searchState?.toggle || {}).forEach(([key, value]) => {
    if (value) {
      nbFilters += 1;
    }
  });
  Object.entries(searchState?.range || {}).forEach(([key, value]) => {
    if (value) {
      nbFilters += 1;
    }
  });
  return <FilterSortButtonComponent {...props} filterCount={nbFilters} />;
};

let Loading = connectStateResults(({isStateStalled, searching}) => {
  if (!isStateStalled && searching) {
    return <LoadingComponent />;
  }
  return null;
});

export {FilterSortButton, Loading};
