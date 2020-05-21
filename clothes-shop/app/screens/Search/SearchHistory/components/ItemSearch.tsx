import React from 'react';
import { View,Text } from "react-native";
import { ListItem,Icon } from "react-native-elements";
import {withSearch } from "../../../../utils/enhancers";
import constants from '../../../../constants';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SearchItem, SearchState } from "../../../../types/Search.type";
import { NavigationService } from "../../../../services";
import _ from 'lodash'

type Props = {
  lastsearch : SearchItem[]
  removeFromLastSearch : (item: SearchItem) => void
  setSearchState : (state: SearchState) => void
  setCurrentSearchItem : (item: SearchItem) => void
}

interface Range {
  min: number,
  max: number,
}

const ItemSearch = ({
  lastsearch,
  setSearchState,
  removeFromLastSearch,
  setCurrentSearchItem,
} : Props) => {
  console.log('ItemSearch lastsearch',lastsearch)

  const getTitle = (item : SearchItem) => {
    if(item.title) return item.title
    if(item.searchState &&  item.searchState.query) return item.searchState.query
    return _.findKey({
      ...item.searchState?.refinementList,
      ...item.searchState?.toggle,
      ...item.searchState?.range,
    }, (o : any) => o)
    // return Object
    // .values(item.searchState?.refinementList || {})
    // .filter( v => v)
    // .slice(0,2).join(' - ')
  }

  const getSubTitle = (item : SearchItem) => {
    console.log('item',item)
    let subtitle = ''
    // if(!item.searchState?.query){
      // subtitle += Object.values(item?.searchState?.refinementList || {})
      //       .filter( v => v)
      //       .join(' - ')
    // }
    // else{
      subtitle += Object.entries(item?.searchState?.refinementList || {})
      .filter(([k,v]) => !k.includes('id'))
      .map(([k,v]) => v)
      .join(' - ')
    // }

    // let rangeString =  Object
    //         .entries(item?.searchState? || {})
    //         .filter(([k,v]) =>  !k.includes('time') && !k.includes('id'))
    //         .filter(([k,v]) =>  v)
    //         // .filter((k : string) => !k.includes('time') && !k.includes('id'))
    //         // .filter((v:Range) => v)
    //         .map(([k,v])  => Object.values(v).join(' - '))
    //         .join(' , ') 
    let rangeString = ""
    if(item?.searchState?.range?.price){
      rangeString += `${item?.searchState?.range?.price.min}$  - ${item?.searchState?.range?.price.max}$ `
    }
    // if(rangeString){
    //   subtitle += '\nranges:' + rangeString 
    // }
    subtitle +='\n' + rangeString 
    let toggleString =  Object
            .entries(item?.searchState?.toggle || {})
            .filter(([k,v]) => v)
            .map(([k,v]) => k)
            .join(' - ') 
    if(toggleString){
      subtitle += '\ntoggles:' + toggleString 
    }

    return subtitle
  }

  return (
    <View style={{padding: 15}}>
      <FlatList 
          ListHeaderComponent={<Text style={{opacity: 0.5}}>
            My last search
          </Text>}
          keyExtractor={(item,index) => item.id}
          data={lastsearch}
          renderItem={({item,index} : {item: SearchItem, index: number}) => (
            <ListItem
              onPress={() => {
                  setCurrentSearchItem(item)
                  NavigationService.navigateToTextSearch({title: item.title})
              }}
              title={getTitle(item)}
              subtitle={getSubTitle(item)}
              titleStyle={{fontWeight:'bold'}}
              // subtitleStyle={{}}
              rightElement={<TouchableOpacity onPress={() => removeFromLastSearch(item)}>
                <Icon name="close" type="antdesign" />
              </TouchableOpacity>}
              bottomDivider
              />
          )}
          /> 
    </View>
  );
};


export default withSearch(constants.clothes)(ItemSearch);