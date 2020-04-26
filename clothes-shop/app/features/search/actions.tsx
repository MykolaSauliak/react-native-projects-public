import types from './types';
import { NavigationService } from "../../services";
import { SearchState, SearchItem } from "../../types/Search";
import {v4 as uuidv4} from 'uuid'

const search = (title :string, searchState: SearchState, listname: string) => dispatch => {
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

const updateSearch = (listname: string, id: string, update : any) => dispatch => {
  // console.log('setSearchState',newState)
  if(!id){
    return
  }
  dispatch({
    type: types.updateSearcState,
    payload: {
      listname,
      id,
      update
    },
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

export {
  search,
  setSearchState,
  updateSearch,
  removeLastSearch,
  setCurrentSearchItem
}