import React from 'react';
import {  
  View,
  Text,
} from "react-native";
import AccordionList from "../../../components/AccordionList";
import { BackHeader } from '../../../components';
import { NavigationService } from '../../../services';
import { withSearch } from "../../../utils/enhancers";

import algoliasearch from 'algoliasearch/lite';
import config from '../../../../config';
import {InstantSearch, connectRefinementList,ClearRefinements,  } from 'react-instantsearch-native';

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
  setSearchState
} : Props) => {

  let title = navigation.getParam('title','')
  let items = navigation.getParam('items',[])
  let onSubItemPress = navigation.getParam('onSubItemPress',() => {})
  let onItemPress = navigation.getParam('onItemPress',() => {})

  // console.log('items',items)

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="clothes"
      searchState={searchState}
      onSearchStateChange={setSearchState}
      >
      <View>
        <BackHeader title={title} goBack={() => NavigationService.navigateToTextSearch()}/>
        <AccordionList 
          onItemPress={onItemPress}
          onSubItemPress={onSubItemPress}
          items={items}
          />
      </View>
    </InstantSearch>
  );
};


export default withSearch()(ListScreenView);