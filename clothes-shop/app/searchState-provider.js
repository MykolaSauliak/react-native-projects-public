import React from 'react';

export const searchState = {};

export const SearchStateContext = React.createContext({
  searchState: searchState,
  updateState: () => {},
});
