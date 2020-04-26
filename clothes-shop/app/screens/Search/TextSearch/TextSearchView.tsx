import React, { Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header, SearchBar, ListItem, Button} from 'react-native-elements';
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
import InfiniteGridHits from '../../../containers/Search/InfiniteGridHits';
import { ScrollView } from 'react-native-gesture-handler';
import { FilterSortButton } from '../../../containers/Search';
import RemoveAllAtUnmount from '../../../containers/Search/RemoveAll';
import LoadingListener from '../../../containers/Search/LoadingListener';
import { BackHeader } from '../../../components';
import constants from '../../../constants';
import colors from '../../../styles/colors';
import { SearchItem } from '../../../types/Search';
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

let ClearRefinements = ({ items, refine }) => (
  <TouchableOpacity 
      style={{flex:1, justifyContent:'center',alignItems:'center'}}
      onPress={() => refine(items)} 
      disabled={!items.length}>
      <Text style={{color:'black', fontWeight: 'bold'}}> DELETE ALL</Text>
  </TouchableOpacity>
);

ClearRefinements = connectCurrentRefinements (ClearRefinements);


let ResultButton = ({ nbHits ,...props }) => (
  <Button 
    {...props}
    containerStyle={{flex:1,height:'100%'}}
    buttonStyle={{backgroundColor:'black'}}
    title={`See ${nbHits } ${pluralize('result',nbHits )}`}
    titleStyle={{color:'white'}}
    />
);

ResultButton = connectStats (ResultButton);

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
  updateSearch: (id: string, state: any) => void,
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

  // componentDidMount(){
  //   this.props.removeLastSearch()
  //   let searchId = this.props.navigation.getParam('searchId','') || uuid4()
  //   this.props.addToLastSearch({id: searchId})
  //   this.setState(()=> ({
  //     searchId
  //   }))
  // }
  
  // componentDidUpdate(prevProps, prevState){
    
  //   let refinements = [
  //     "category_id",
  //     "subcategory_id",
  //     "type_id",
  //     "subtype_id",
  //     "brand_name",
  //     "color",
  //     "condition",
  //     "material",
  //     "location",
  //     "express_delivery",
  //     "sold",
  //     "we_love",
  //     "vintage",
  //     "tag_id",
  //   ]
  
  //   const {
  //     searchState
  //   } = this.props;

  //   let text = this.props.navigation.getParam('text','')
  //   // let category_id = this.props.navigation.getParam('category_id','')
  //   // let subcategory_id = this.props.navigation.getParam('subcategory_id','')
  //   // let type_id = this.props.navigation.getParam('type_id','')
  //   // let subtype_id = this.props.navigation.getParam('subtype_id','')
  //   // let brandRefinement = this.props.navigation.getParam('brandRefinement',[])
  //   // let colorRefinement = this.props.navigation.getParam('colorRefinement',[])
  //   // let conditionRefinement = this.props.navigation.getParam('conditionRefinement',[])
  //   // let materialRefinement = this.props.navigation.getParam('materialRefinement',[])
  //   // let locationRefinement = this.props.navigation.getParam('locationRefinement',[])
  //   // let express_delivery = this.props.navigation.getParam([constants.express_delivery],false)
  //   // let sold = this.props.navigation.getParam([constants.sold],false)
  //   // let we_love = this.props.navigation.getParam([constants.we_love],false)
  //   // let vintage = this.props.navigation.getParam([constants.vintage],false)
  //   let created_time_start = this.props.navigation.getParam('created_time_start',0)
  //   // let tag_id = this.props.navigation.getParam('tag_id',[])
  //   const updatedState = searchState
  //   if(searchState.text != text){
  //     updatedState
  //   }

  //   let searchId = this.props.navigation.getParam('searchId','') || uuid4()
  //   this.props.addToLastSearch({id: searchId})
  //   this.setState(()=> ({
  //     searchId
  //   }))
  // }

  componentWillUnmount(){
    // this.props.setSearchState({});
  }

  render(){

      const {
        showFilter
      } = this.state;

      const {
        searchState,
        setSearchState,
        updateSearch,
        lastUpdate,
      } = this.props;
      console.log('props',this.props)

      let title = this.props.navigation.getParam('title','')

      // let text = this.props.navigation.getParam('text','')
      // let category_id = this.props.navigation.getParam('category_id','')
      // let subcategory_id = this.props.navigation.getParam('subcategory_id','')
      // let type_id = this.props.navigation.getParam('type_id','')
      // let subtype_id = this.props.navigation.getParam('subtype_id','')
      // let brand_name = this.props.navigation.getParam('brand_name',[])
      // let color = this.props.navigation.getParam('color',[])
      // let condition = this.props.navigation.getParam('condition',[])
      // let material = this.props.navigation.getParam('material',[])
      // let location = this.props.navigation.getParam('location',[])
      // let express_delivery = this.props.navigation.getParam([constants.express_delivery],false)
      // let sold = this.props.navigation.getParam([constants.sold],false)
      // let we_love = this.props.navigation.getParam([constants.we_love],false)
      // let vintage = this.props.navigation.getParam([constants.vintage],false)
      let created_time_start = this.props.navigation.getParam('created_time_start',0)
      // let tag_id = this.props.navigation.getParam('tag_id',[]
      // // let RightComponent =<ClearRefinements
      // console.log('text',text)
      //   console.log('title',title)
      //   // console.log('type_id',type_id)
      console.log('searchState',searchState)
      // console.log('tag_id',tag_id)  
      // let totalResutCount = hits.length
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="clothes"
            searchState={searchState}
            onSearchStateChange={(state : any) => {
              setSearchState(state)
              updateSearch(this.props.currentSearchItem?.id, state)
            }}
            // root={this.root} 
            >
          <RemoveAllAtUnmount />
          {/* <LoadingListener onLoadingChange={(loading : boolean) => {
              console.log('new loading',loading); 
              // this.setState({searchLoading : loading}) */}
            {/* }}/> */}
          <View style={{flex: 1}}>
            <View style={{position: 'absolute',zIndex: -1, top: 0, bottom: 0, left:0,right:0}}>
                  <ScrollView>
                    {/* <VirtualRefinementList attribute="category_id" defaultRefinement={[category_id]}  /> */}
                    <VirtualRefinementList attribute="category_id"/>
                    <VirtualRefinementList attribute="subcategory_id"  />
                    <VirtualRefinementList attribute="type_id" />
                    <VirtualRefinementList attribute="subtype_id"  />
                    <VirtualRefinementList attribute="brand_name" />
                    <VirtualRefinementList attribute="color"/>
                    <VirtualRefinementList attribute="material" />
                    <VirtualRefinementList attribute="condition" />
                    <VirtualRefinementList attribute="tag_ids"/>
                    <VirtualRange attribute="price" />
                    <VirtualRange operator="and" attribute="created_time"/>
                    <VirtualToggle value={true} attribute={constants.sold} />
                    <VirtualToggle value={true} attribute={constants.express_delivery}  />
                    <VirtualToggle value={true} attribute={constants.we_love}/>
                    <VirtualToggle value={true}  attribute={constants.vintage}/>
                    <SearchBox onSearchClick={() => NavigationService.navigateToSearchHistory()} placeholder={title} />
                    <HitsCount />
                    <InfiniteGridHits />
                </ScrollView>
                <FilterSortButton  
                  searchState={searchState} 
                  // onPress={() => this.setState(() => ({showFilter: true})) }/>
                  onPress={() => NavigationService.navigateToFilterSortScreen()}/>
            </View>
        </View>
    </InstantSearch>

    );
  }
};

export default TextSearchView;
