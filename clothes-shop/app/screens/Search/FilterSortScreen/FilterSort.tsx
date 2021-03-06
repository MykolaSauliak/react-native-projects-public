import React, { Component} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBox from '../../../containers/SearchBox';
import screens from '../../../constants/screens';
import {NavigationService} from '../../../services';
import { searchClient } from "../../../search";
import {
  InstantSearch, 
  connectRefinementList, 
  connectCurrentRefinements,
  connectRange,
  connectToggleRefinement,
  connectStats,
  connectHits,
} from 'react-instantsearch-native';
import RefinementList from '../../../containers/Search/RefinementList';
import ToggleRefinement from '../../../containers/Search/ToggleRefinement';
import SortBy from '../../../containers/Search/SortBy';
import RangeSlider from '../../../containers/Search/RangeSlider';
import ClearRefinements from '../../../containers/Search/ClearRefinements';
import { BackHeader, ListItem, Text } from '../../../components';
import constants from '../../../constants';
import colors from '../../../styles/colors';
import { SearchItem } from '../../../types/Search';
import SeeResultButton from '../../../containers/Search/SeeResultButton';
import { search } from '../../../features/search/actions';
import LoadingIndicator from '../../../containers/Search/LoadingIndicator';
import FilterRow from '../../../components/FilterRow';
const pluralize = require('pluralize')

const VirtualRefinementList = connectRefinementList(() => null);
const VirtualRange = connectRange(() => null);
const VirtualToggle = connectToggleRefinement(() => null);

let HitsCount = ({ nbHits, textStyle ={}} : {nbHits: number, textStyle: any}) => {
  let nbHitsString = ''
  if(nbHits >= 10){
    nbHitsString  = '10+'
  }
  else{
    nbHitsString = nbHits.toString()
  }
  return (
    <Text style={[{textAlign:'center', fontSize: 16, padding:10, opacity: 0.5}, textStyle]}>{nbHitsString}</Text>
  )
}

HitsCount = connectStats(HitsCount)


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flexGrow: 1,
    },
    filtersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    clearAll: {
        color: 'blue',
        fontWeight: 'bold',
        padding: 10,
        alignSelf: 'center',
    },
    });
    

type Props = {
    navigation : any
}
type State = {
    searchState : any
}

class FilterSort extends Component<Props, State> {

    root = {
        Root: View,
        props: {
          style: {
            flex: 1,
          },
        },
      }
    
    apply = () => {
        // applyFilters()
        // applySort()
        // setAppliedFilters(localAppliedFilters)
        // if(goBack){
        //     goBack()
        // }
    }

    render(){

        const {
            currentSearchItem,
            searchState,
            setSearchState,
            updateSearchItem,
        } = this.props;

        return (
            <InstantSearch
                searchClient={searchClient}
                indexName="clothes"
                searchState={searchState}
                onSearchStateChange={(state : any) => {
                    console.log('state',state)
                    setSearchState(state)
                    updateSearchItem(currentSearchItem?.id, state)
                }}
                // root={this.root} 
                >
                {/* // <View style={{backgroundColor:'white', position:'absolute', top:0, bottom:0,left:showFilter ? 0 : constants.DEVICE_WIDTH, right:0, zIndex: showFilter ? 2 : -2}}> */}
                <View style={{flex:1,backgroundColor:'white'}}>
                    <BackHeader 
                        title="Filter & Sort" 
                        goBack={() => NavigationService.navigateToTextSearch()}
                        rightComponent={<ClearRefinements />}
                        />
                    <ScrollView style={{flex:0.9,}}>
                    <VirtualRange operator="and" attribute="created_time"/>
                        <VirtualRange operator="and" attribute="price"/>
                        {/* <VirtualRange attribute="price"/> */}
                        <VirtualRefinementList operator="and" attribute="category_id"  />
                        <VirtualRefinementList operator="and" attribute="type_id" />
                        <VirtualRefinementList operator="and" attribute="subtype_id"  />
                        <VirtualRefinementList operator="and" attribute="brand_name" />
                        <VirtualRefinementList operator="and" attribute="color" />
                        <VirtualRefinementList operator="and" attribute="material" />
                        <VirtualRefinementList operator="and" attribute="condition" />
                        <VirtualRefinementList operator="and" attribute="tag_ids"/>
                        <VirtualRefinementList operator="and" attribute="location"/>
                        {/* <RangeSlider 
                            defaultRefinement={{ min: 0, max: 9999 }}
                            minValue={currentSearchItem?.searchState?.range?.price?.min}
                            maxValue={currentSearchItem?.searchState?.range?.price?.max} 
                            // max={999} 
                            // min={0} 
                            searchState={searchState}
                            attribute="price"
                            // precision={2}
                            /> */}
                        <LoadingIndicator />  
                            <ListItem 
                                containerStyle={{backgroundColor: colors.gray, opacity: 0.5}} 
                                title="Sort by" 
                                /> 
                            <SortBy   
                                defaultRefinement="clothes"
                                items={[
                                    { value: 'clothes', label: 'Featured' },
                                    { value: 'clothes_lowest_price', label: 'Lowest price' },
                                    { value: 'clothes_highest_price', label: 'Highest price' },
                                    { value: 'clothes_popularity', label: 'Popularity' },
                                ]}
                                />
                            <ListItem
                                containerStyle={{backgroundColor: colors.gray, opacity: 0.5}} 
                                title="Filter by" 
                                /> 
                            <FilterRow 
                                title="Price" 
                                rightElement={searchState?.range?.price?.min && <Text>{`${searchState?.range?.price?.min} - ${searchState?.range?.price?.max}`}</Text>}
                                onPress={() => NavigationService.navigateToPriceInput()}
                                />

                            <RefinementList  
                                // searchState={this.state.searchState}
                                // onSearchStateChange={this.onSearchSt ateChange} 
                                // searchClient={searchClient}
                                searchState={searchState}
                                // onSearchStateChange={setSearchState}
                                // defaultRefinement={[]}
                                operator="and" 
                                title="Brand" 
                                attribute="brand_name" 
                                />
                            <RefinementList  
                                // searchState={this.state.searchState}
                                // onSearchStateChange={this.onSearchStateChange} 
                                // searchClient={searchClient}
                                searchState={searchState}
                                // onSearchStateChange={setSearchState}
                                // defaultRefinement={brandRefinement}
                                operator="and" 
                                title="Model" 
                                attribute="type_name" 
                                />
                            <RefinementList 
                                operator="and" 
                                title="Color" 
                                attribute="color" 
                                defaultRefinement={[]}
                                // searchClient={searchClient}
                                searchState={searchState}
                                // onSearchStateChange={setSearchState}
                                // searchState={this.state.searchState}
                                // onSearchStateChange={this.onSearchStateChange}
                                />
                            <RefinementList 
                                operator="and"  
                                title="Material" 
                                attribute="material" 
                                defaultRefinement={[]}
                                // searchClient={searchClient}
                                searchState={searchState}
                                // onSearchStateChange={setSearchState}
                                // searchState={this.state.searchState}
                                // onSearchStateChange={this.onSearchStateChange}
                                />
                            <RefinementList 
                                operator="and" 
                                title="Condition" 
                                attribute="condition" 
                                defaultRefinement={[]}
                                searchState={searchState}
                                // searchClient={searchClient}
                                // onSearchStateChange={setSearchState}
                                />
                            <RefinementList 
                                operator="and" 
                                title="Item location" 
                                attribute="location" 
                                defaultRefinement={[]}
                                searchState={searchState}
                                // searchClient={searchClient}
                                // onSearchStateChange={setSearchState}
                                />
                            {/* <RefinementList 
                                operator="and" 
                                title="We love" 
                                attribute="we_love" 
                                // defaultRefinement={[we_love]}
                                // searchState={searchState}
                                // searchClient={searchClient}
                                // onSearchStateChange={setSearchState}
                                />
                            <RefinementList 
                                operator="and" 
                                title="Express Delivery" 
                                attribute="express_delivery" 
                                subtitle="Items shipped within 48 hours"
                                // defaultRefinement={[express_delivery]}
                                // searchState={searchState}
                                // searchClient={searchClient}
                                // onSearchStateChange={setSearchState}
                                />
                            <RefinementList 
                                operator="and" 
                                title="Vintage" 
                                attribute="vintage" 
                                // defaultRefinement={[vintage]}
                                />
                            <RefinementList 
                                operator="and" 
                                title="Sold" 
                                attribute="sold" 
                                // defaultRefinement={[sold]}
                                /> */}
                            <ToggleRefinement 
                                operator="and" 
                                label="We love" 
                                attribute="we_love" 
                                value={true}
                                defaultRefinement={searchState?.toggle?.we_love}
                                />
                            <ToggleRefinement 
                                operator="and" 
                                label="Vintage" 
                                attribute="vintage" 
                                value={true}
                                />
                            {/* <ToggleRefinement 
                                operator="and" 
                                label="Vintage" 
                                value={true}
                                attribute="vintage" 
                                defaultRefinement={vintage}
                                // searchClient={searchClient}
                                // searchState={searchState}
                                // onSearchStateChange={setSearchState}
                                /> */}
                            <ToggleRefinement 
                                operator="and" 
                                label="Express delivery" 
                                attribute="express_delivery" 
                                subtitle="Items shipped within 48 hours"
                                value={true}
                                // defaultRefinement={express_delivery}
                                // searchClient={searchClient}
                                // searchState={searchState}
                                // onSearchStateChange={setSearchState}
                                />
                            <ToggleRefinement 
                                operator="and" 
                                label="Sold" 
                                attribute="status" 
                                value="sold"
                                // defaultRefinement={express_delivery}
                                // searchClient={searchClient}
                                // searchState={searchState}
                                // onSearchStateChange={setSearchState}
                                />
                            {/* <ToggleRefinement 
                                operator="and" 
                                label="Sold" 
                                value={true}
                                attribute="sold" 
                                // defaultRefinement={sold}
                                // searchClient={searchClient}
                                // searchState={searchState}
                                // onSearchStateChange={setSearchState}
                                /> */}
                        {/* </LoadingIndicator> */}
                    </ScrollView>
                    <View style={{flex:0.1, padding: 10}}>
                        <SeeResultButton 
                            onPress={() => NavigationService.navigateToTextSearch()} />
                    </View>
                </View>
        </InstantSearch>
        );          
    }
};

FilterSort.defaultProps = {
    availableFilters : [],
    goBack : () => NavigationService.goBack(),
}

export default FilterSort;