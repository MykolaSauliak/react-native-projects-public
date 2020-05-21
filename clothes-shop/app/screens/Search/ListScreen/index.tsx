import React from 'react';
import {  
  View,
  Text,
} from "react-native";
import AccordionList from "../../../components/AccordionList";
import { BackHeader } from '../../../components';
import { NavigationService } from '../../../services';
import { withSearch } from "../../../utils/enhancers";
import _ from 'lodash'

import algoliasearch from 'algoliasearch/lite';
import config from '../../../../config';
import {InstantSearch, connectRefinementList,ClearRefinements,  } from 'react-instantsearch-native';
import constants from '../../../constants';

const searchClient = algoliasearch(
  config.ALGOLIA_APP_ID,
  config.ALGOLIA_SEARCH_ID,
);

type Props = {
  searchState : any,
  setSearchState: (state :any) => void,
}

//               () =>
//                 NavigationService.navigateToSearchResult({
//                   title: item.title,
//                   options: {type_id: item.id},
//                 })

const ListScreenView = ({
  navigation,
  searchState,
  updateSearchState,
  refineLocal,
  setSearchState
} : Props) => {

  let title = navigation.getParam('title','')
  let attribute = navigation.getParam('attribute','')
  let items = navigation.getParam('items',[])
  // let onSubItemPress = navigation.getParam('onSubItemPress',() => {})
  // let onItemPress = navigation.getParam('onItemPress',() => {})
  // console.log('items',items)
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="clothes"
      searchState={searchState}
      onSearchStateChange={setSearchState}
      >
      <View>
        <BackHeader title={title} goBack={() => NavigationService.navigateToFilterSortScreen()}/>
        <AccordionList 
          onItemPress={(item) => {
              console.log('item',item)
              if(_.isEmpty(item.value)){
                updateSearchState(refineLocal({[attribute] : [...searchState.refinementList[attribute]]}, searchState))
              }else{
                updateSearchState(refineLocal({[attribute] : item.value}, searchState))
              }
              NavigationService.navigateToFilterSortScreen()
          }}
          // onSubItemPress={onSubItemPress}
          items={items}
          />
      </View>
    </InstantSearch>
  );
};


export default withSearch(constants.clothes)(ListScreenView);