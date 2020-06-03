import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationService } from "../../services"
import FilterRow from '../../components/FilterRow';
import {
  InstantSearch, 
  Configure,
  connectRefinementList,
  connectCurrentRefinements 
} from 'react-instantsearch-native';
import R from 'ramda';
import {withSearch} from '../../utils/enhancers'
import _ from 'lodash'
import { searchClient } from '../../search';
import constants from '../../constants';

const RefinementList = ({
  items, 
  refine = (rfnmt) => {},
  refineLocal = (rfnmt) => {},
  attribute= "",
  title = "",
  subtitle,
  currentRefinement,
  searchState,
  updateSearchState,
  ...otherProps
}) => { 
  // console.log('refine',refine)
  // console.log('attribute',attribute)
  // console.log('RefinementList searchState',searchState)

  const getCurrentRefinement = () => {
    return R.path(['refinementList',attribute,0],searchState) || ''
  }
  
  if(_.isEmpty(items)){
    return null
  }

  function onPress(){
    // console.log('searchState',searchState)
    NavigationService.navigateToFilterList({
        title, 
        items,
        attribute
      })
  }

  return (
     <FilterRow 
          title={title}
          subtitle={subtitle}
          // rightElement={<Text>{currentRefinement?.join(', ')}</Text>}
          rightElement={<Text>{getCurrentRefinement()}</Text>}
          onPress={onPress} 
        />

  )
}

const ItemPropType = PropTypes.shape({
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  isRefined: PropTypes.bool.isRequired,
});

RefinementList.propTypes = {
  items: PropTypes.arrayOf(ItemPropType).isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectRefinementList(withSearch(constants.clothes)(RefinementList))
