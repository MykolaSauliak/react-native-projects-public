import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {connectSearchBox} from 'react-instantsearch-native';
import SearchHeader from '../components/SearchHeader';
import ClothesSearchHeader from './Headers/ClothesSearchHeader';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#252b33',
  },
  input: {
    height: 48,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

const SearchBox = ({currentRefinement, refine, ...props}) => (
  <ClothesSearchHeader
    {...props}
    search={currentRefinement}
    updateSearch={text => refine(text)}
  />
);

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);
