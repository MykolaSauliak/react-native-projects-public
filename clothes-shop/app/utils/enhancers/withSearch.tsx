import React from 'react';
import {connect} from 'react-redux';
import {
  getLastSearch,
  getSearchState,
  getLastUpdate,
  getCurrentSearchItem,
  getTriggerRefresh,
} from '../../features/search/selectors';
import {
  addToLastSearch,
  removeFromLastSearch,
  setSearchState,
  updateSearchItem,
  removeLastSearch,
  search,
  setCurrentSearchItem,
  updateSearchState,
  resetSearchState,
  refresh,
} from '../../features/search/actions';
import {
  refine
} from '../../features/search/operations';
import {SearchState, SearchItem} from '../../types/Search.type'

const mapStateToProps = (listname = 'defaults')=> (state,) => {
  // console.log('listname',listname)
  return {
    lastsearch: getLastSearch(listname, state),
    searchState: getSearchState(state),
    currentSearchItem: getCurrentSearchItem(state),
    lastSearchUpdate: getLastUpdate(state),
    triggerRefresh: getTriggerRefresh(state),
  }
}

const mapDispatchToProps = (listname = 'defaults') => (dispatch) => ({
  setCurrentSearchItem: (item: SearchItem) => dispatch(setCurrentSearchItem(item)),
  removeLastSearch: () => dispatch(removeLastSearch()),
  addToLastSearch: item => dispatch(addToLastSearch(listname, item)),
  updateSearchItem: (id: string, update : SearchState) => dispatch(updateSearchItem(listname, id, update)),
  updateSearchState: (update : SearchState) => dispatch(updateSearchState(update)),
  resetSearchState: () => dispatch(resetSearchState()),
  removeFromLastSearch: item => dispatch(removeFromLastSearch(listname, item)),
  setSearchState: item => dispatch(setSearchState(item)),
  refresh: () => dispatch(refresh()),
  refineLocal: refine,
  search: (title: string, searchState: SearchState, options : any) => dispatch(search(title, searchState,listname, options)),
});

const withSearch = (listname = 'default') => Component =>
  connect(
    mapStateToProps(listname),
    mapDispatchToProps(listname),
  )((props) => {
    return <Component 
              {...props}
              />
  });

export default withSearch;
