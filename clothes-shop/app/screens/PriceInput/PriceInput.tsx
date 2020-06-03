import React from 'react';
import { View } from "react-native";
import { BackHeaderCenter, Text } from '../../components';
import { Input } from 'react-native-elements';
import RangeInput from '../../containers/Search/RangeInput'
import { searchClient } from '../../search';
import constants from '../../constants';
import { withSearch } from '../../utils/enhancers';
import {
    InstantSearch, 
  } from 'react-instantsearch-native';
import { NavigationService } from '../../services';

const PriceInputScreen = ({
    searchState,
}) => {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="clothes"
            searchState={searchState}
            // root={this.root} 
            >
            <View style={{flex:1,}}>
                <BackHeaderCenter title="Price" />
                <RangeInput 
                    containerStyle={{ paddingVertical: 15}} 
                    attribute="price"
                    onRefine={() => NavigationService.goBack()}
                    />
            </View>
        </InstantSearch>
    );
};

export default withSearch(constants.clothes)(PriceInputScreen);