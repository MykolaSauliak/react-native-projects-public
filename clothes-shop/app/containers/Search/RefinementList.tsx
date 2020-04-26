import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationService } from "../../services"
import FilterRow from '../../components/FilterRow';
import {InstantSearch, Configure,connectRefinementList,connectCurrentRefinements } from 'react-instantsearch-native';
import R from 'ramda';
import {withSearch} from '../../utils/enhancers'

const RefinementList = ({
  items, 
  refine,
  attribute,
  title,
  subtitle,
  currentRefinement,
  searchState,
  ...otherProps
}) => {

  console.log('RefinementList searchState',searchState)
  const getCurrentRefinement = () => {
    return R.path(['refinementList',attribute,0],searchState) || ''
  }
  
  if(!items || items.length < 1){
    return null
  }
  
  return (
     <FilterRow 
          title={title}
          subtitle={subtitle}
          // rightElement={<Text>{currentRefinement?.join(', ')}</Text>}
          rightElement={<Text>{getCurrentRefinement()}</Text>}
          onPress={() => NavigationService.navigateToFilterList({
            title, 
            items,
            onItemPress : (item) => { 
                  refine(item.value)
                  NavigationService.goBack()
              }
          })} 
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

export default withSearch()(connectRefinementList(RefinementList))
