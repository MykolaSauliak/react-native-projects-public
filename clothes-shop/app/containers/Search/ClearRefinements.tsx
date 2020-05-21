import React, { Component} from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  connectCurrentRefinements,
} from 'react-instantsearch-native';
import constants from '../../constants';
import { withSearch } from '../../utils/enhancers';

const ClearRefinements = ({ items, refine, refresh, resetSearchState }) => (
    <TouchableOpacity 
        style={{flex:1, justifyContent:'center',alignItems:'center'}}
        onPress={() => {refresh();resetSearchState()}} 
        // disabled={!items.length}
        >
        <Text style={{color:'black', fontWeight: 'bold'}}> DELETE ALL</Text>
    </TouchableOpacity>
);

export default withSearch(constants.clothes)(connectCurrentRefinements (ClearRefinements));
