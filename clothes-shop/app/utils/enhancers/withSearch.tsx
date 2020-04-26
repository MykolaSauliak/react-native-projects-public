import React from 'react';
import {connect} from 'react-redux';
import {
  getLastSearch,
  getSearchState,
  getLastUpdate,
  getCurrentSearchItem
} from '../../features/search/selectors';
import {
  addToLastSearch,
  removeFromLastSearch,
  setSearchState,
  updateSearch,
  removeLastSearch,
  search,
  setCurrentSearchItem
} from '../../features/search/actions';
import {SearchState, SearchItem} from '../../types/Search'

const mapStateToProps = (listname)=> (state,) => {
  console.log('listname',listname)
  return {
    lastsearch: getLastSearch(listname, state),
    searchState: getSearchState(state),
    currentSearchItem: getCurrentSearchItem(state),
    lastSearchUpdate: getLastUpdate(state)
  }
}

const mapDispatchToProps = (listname) => (dispatch) => ({
  setCurrentSearchItem: (item: SearchItem) => dispatch(setCurrentSearchItem(item)),
  removeLastSearch: () => dispatch(removeLastSearch()),
  addToLastSearch: item => dispatch(addToLastSearch(listname, item)),
  updateSearch: (id, update) => dispatch(updateSearch(listname, id, update)),
  removeFromLastSearch: item => dispatch(removeFromLastSearch(listname, item)),
  setSearchState: item => dispatch(setSearchState(item)),
  search: (title: string, searchState: SearchState, listname : string) => dispatch(search(title, searchState,listname)),
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
