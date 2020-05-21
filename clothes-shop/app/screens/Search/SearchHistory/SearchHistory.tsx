import React, {useEffect} from 'react';
import { 
    View,
    Text,
    Keyboard,
    Dimensions 
} from "react-native";
import {
    TabView,
    SceneMap, 
    TabBar,
} from 'react-native-tab-view';
import {
    InstantSearch, 
    connectRefinementList, 
    connectCurrentRefinements,
    connectRange,
    connectToggleRefinement,
    connectStats,
    connectHits,
    } from 'react-instantsearch-native';
import {MembersSearch,ItemSearch} from './components';
import {searchClient} from '../../../search'
import uuid4 from 'uuid/v4'

import { SearchItem, SearchState } from '../../../types/Search';
import ClothesSearchHeader from '../../../components/ClothesSearchHeader';
import { NavigationService } from '../../../services';
import { search } from '../../../features/search/actions';
import constants from '../../../constants';

type Props = {
    lastsearch : SearchItem[],
    setSearchState : (state: any) => void,
    addToLastSearch : (item : SearchItem) => void,
    search : (title:string, state: SearchState, listname: string) => void,
    searchState : any,
}

const initialLayout = {width: Dimensions.get('window').width};

const SearchHistory = ({
    lastsearch,
    searchState : reduxSearchState,
    setSearchState : setReduxSearchState,
    addToLastSearch,
    search
} : Props) => {

    let [searchState, setSearchState] = React.useState({})
    let [index, setIndex] = React.useState(0)
    let [text, setText] = React.useState('')

    useEffect(() => {
        let listener = Keyboard.addListener('keyboardDidHide',() => {
            if(index == 0 && text.length > 0){
                NavigationService.navigateToTextSearch({
                    text
                })
                const newSearchState = {
                    ...reduxSearchState,
                    query : text
                }
                search(text, {
                    query :  text
                }, constants.clothes)
                // addToLastSearch({
                //     id: uuid4(),
                //     searchState: newSearchState
                // })
                // // if(text != reduxSearchState.query){
                // setReduxSearchState(newSearchState)
                // }
            }
        })
        return () => {
            listener.remove()
        }
    },)


    const FirstRoute = () => <ItemSearch
            // root={root}
            // onSearchStateChange={setSearchState}
            // searchState={searchState}
            // searchClient={searchClient}
            />;

    const SecondRoute = () => (
      <MembersSearch
        onSearchStateChange={setSearchState}
        searchState={searchState}
        searchClient={searchClient}
      />
    );

    const [routes] = React.useState([
      {key: 'first', title: 'Items'},
      {key: 'second', title: 'Members'},
    ]);

    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    // console.log('SearchHistory lastsearch',lastsearch)

    return (
        <View style={{flex: 1}}>
                <ClothesSearchHeader 
                    search={text}
                    updateSearch={(text : string) => setText(text)} 
                    />
                <TabView
                    renderTabBar={props => (
                        <TabBar
                        style={{textAlign: 'center', backgroundColor: null}}
                        {...props}
                        tabStyle={{height: 45}} // here
                        renderLabel={({route, focused, color}) => (
                            <Text
                            style={{
                                borderBottomColor: focused ? 'gray' : null,
                                textAlign: 'center',
                                color: 'black',
                                margin: 8,
                            }}>
                            {route.title.toUpperCase()}
                            </Text>
                        )}
                        />
                    )}
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={index => {
                        setIndex(index);
                        // setSearchState({});
                    }}
                    initialLayout={initialLayout}
                /> 
        </View>
    );
};

export default SearchHistory;