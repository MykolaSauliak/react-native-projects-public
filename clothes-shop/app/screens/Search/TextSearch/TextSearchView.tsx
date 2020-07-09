import React, { Component} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
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
  connectSortBy ,
  connectHits,
  connectStateResults,
  } from 'react-instantsearch-native';
import InfiniteGridHits from '../../../containers/Search/InfiniteGridHits';
import { ScrollView } from 'react-native-gesture-handler';
import RemoveAllAtUnmount from '../../../containers/Search/RemoveAll';
import constants from '../../../constants';
import { SearchItem } from '../../../types/Search.type';
import { FilterSortButton } from '../../../containers/Search';
import {  Text} from '../../../components';


const VirtualRefinementList = connectRefinementList(() => null);
const VirtualRange = connectRange(() => null);
const VirtualToggle = connectToggleRefinement(() => null);
const SortBy = connectSortBy(() => null);

let HitsCount = ({ nbHits, textStyle ={}} : {nbHits: number, textStyle: any}) => {
  let nbHitsString = ''
  if(nbHits >= 100){
    nbHitsString  = '100+'
  }
  else{
    // console.log('nbHits',nbHits)
    nbHitsString = nbHits.toString()
  }
  return (
    <Text style={[{textAlign:'center', fontSize: 16, padding:10, opacity: 0.5}, textStyle]}>{nbHitsString}</Text>
  )
}

HitsCount = connectStats(HitsCount)


const initialLayout = {width: Dimensions.get('window').width};

const S = StyleSheet.create({
  lastSearch: {
    fontSize: 13,
    color: 'gray',
    opacity: 0.4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sortContainer: {
    marginLeft: 15,
    borderColor: 'black',
    borderWidth: 1,
  }
});

type Props = {
  navigation : any,
  searchState : any,
  setSearchState: (state: any) => void,
  updateSearchItem: (id: string, state: any) => void,
  addToLastSearch: (state: any) => void,
  removeLastSearch: () => void,
  refine: (items: any[]) => void,
  items:any[],
  currentSearchItem:SearchItem,
}

type State = {
  index : number,
  searchId : string,
  searchLoading : boolean,
}

class TextSearchView extends Component<Props,State> {

  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
}

  state = {
      index: 0,
      searchLoading: false,
      showFilter : false,
      searchId: '',
  }

  componentDidMount(){
    // this.props.refresh();
  }

  render(){

      const {
        showFilter
      } = this.state;

      const {
        searchState,
        setSearchState,
        updateSearchItem,
        lastUpdate,
        goBack,
        triggerRefresh = false
      } = this.props;

      console.log('searchState',searchState)
      let title = this.props.navigation.getParam('title','')
      // let created_time_start = this.props.navigation.getParam('created_time_start',0)
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="clothes"
            searchState={searchState}
            refresh={triggerRefresh}
            onSearchStateChange={(state : any) => {
                // console.log('state',state)
                setSearchState(state)
                updateSearchItem(this.props.currentSearchItem?.id, state)
            }}
            root={this.root} 
            >
            <SortBy 
             defaultRefinement="clothes"
             items={[
                 { value: 'clothes', label: 'Featured' },
                 { value: 'clothes_lowest_price', label: 'Lowest price' },
                 { value: 'clothes_highest_price', label: 'Highest price' },
                 { value: 'clothes_popularity', label: 'Popularity' },
             ]}
             />
             
            <VirtualRefinementList attribute="category_id" />
            <VirtualRefinementList attribute="type_id" />
            <VirtualRefinementList attribute="subtype_id"  />
            <VirtualRefinementList attribute="brand_name" />
            <VirtualRefinementList attribute="color" />
            <VirtualRefinementList attribute="material" />
            <VirtualRefinementList attribute="condition" />
            <VirtualRefinementList attribute="tag_ids"/>
            <VirtualRefinementList attribute="location"/>
            <VirtualRange operator="and" attribute="price" />
            <VirtualRange operator="and" attribute="created_time"/>
            <VirtualToggle operator="and" value={true} attribute={constants.we_love} />
            <VirtualToggle operator="and"  value={true}  attribute={constants.vintage} />
            <VirtualToggle operator="and" value={'sold'}  attribute={'status'} />
            {/* <VirtualToggle value={true}  attribute={constants.vintage} /> */}
            <VirtualToggle value={true}  attribute={constants.express_delivery} />
            <RemoveAllAtUnmount />
            <View style={{flex: 1}}>
                <ScrollView>
                    {/* <VirtualRefinementList attribute="category_id" defaultRefinement={[category_id]}  /> */}
                    {/* <VirtualRefinementList 
                      attribute="category_id" 
                      defaultRefinement={searchState?.refinementList?.category_id} 
                      // searchState={searchState}
                      /> */}
                    <SearchBox
                       showBack={true} 
                        onSearchClick={() => NavigationService.navigateToSearchHistory()} 
                        placeholder={title} 
                        />
                    <HitsCount />
                    <InfiniteGridHits />
                </ScrollView>
                <FilterSortButton  
                  searchState={searchState} 
                  // onPress={() => this.setState(() => ({showFilter: true})) }/>
                  onPress={() => NavigationService.navigateToFilterSortScreen()}/>
              {/* </View> */}
          </View>
      </InstantSearch>

    );
  }
};

export default TextSearchView;
