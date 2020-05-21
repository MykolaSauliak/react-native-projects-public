import types from './types';
import { NavigationService } from "../../services";
import { SearchState, SearchItem } from "../../types/Search";
import {v4 as uuidv4} from 'uuid'

const search = (title :string, searchState: SearchState, listname: string, options = {}) => dispatch => {
  console.log('search')
  if(!listname){
    listname = 'defaults'
  }

  const newSearchItem : SearchItem = {
    searchState,
    title,
    id: uuidv4(),
  }
  dispatch(addToLastSearch(listname, newSearchItem))
  dispatch(setSearchState(searchState))
  NavigationService.navigateToTextSearch({
    title,
    goBack: options.goBack
  })
}

const setSearchState = (newState :any) => dispatch => {
  console.log('setSearchState',newState)
  dispatch({
    type: types.setSearchState,
    payload: newState,
  })
}

const setCurrentSearchItem = (searchItem :SearchItem) => dispatch => {
  console.log('setCurrentSearchItem',searchItem)
  dispatch({
    type: types.setCurrentSearchItem,
    payload: searchItem,
  })
  dispatch(setSearchState(searchItem.searchState))
}

const removeLastSearch = () => dispatch => {
  dispatch({
    type: types.removeLastSearch,
  })
}

const updateSearchItem = (listname: string, id: string, update : any) => dispatch => {
  // console.log('setSearchState',newState)
  if(!id){
    return
  }
  dispatch({
    type: types.updateSearchItem,
    payload: {
      listname,
      id,
      update
    },
  })
}

const updateSearchState = (update : any) => dispatch => {
  // console.log('setSearchState',newState)
  dispatch({
    type: types.updateSearchState,
    payload: update,
  })
}

export const addToLastSearch = (listname: string, item : SearchItem)  => dispatch => {
  dispatch({
    type: types.addToLastSearch,
    payload :{
      listname,
      item
    }
  });
};

export const removeFromLastSearch = (listname : string, item : SearchItem) => dispatch => {
  dispatch({
    type: types.removeFromLastSearch,
    payload : {
      listname,
      item
    },
  });
};

export const setSearchLoading = (loading : boolean) => dispatch => {
  dispatch({
    type: types.setLoading,
    payload: loading,
  });
};

const resetSearchState = () => dispatch => {
  dispatch({
    type: types.resetSearchState,
  });
};

const refresh = () => dispatch => {
  dispatch({
    type: types.setTriggerRefresh,
    payload: true
  });
  dispatch({
    type: types.setTriggerRefresh,
    payload: false
  });
};

export {
  search,
  setSearchState,
  updateSearchItem,
  updateSearchState,
  removeLastSearch,
  setCurrentSearchItem,
  resetSearchState,
  refresh,
}