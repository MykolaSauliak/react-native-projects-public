import createReducer from '../../utils/createReducer';
import types from './types';
import _ from 'lodash'

const initialState = {
  items: {},
  lists: {
    'myitemsforsale': []
  },
  lastUpdate: null
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.setCurrentListItem]: (state, {payload: {listName, item}}) => {
    let items = state.items
    items[listName] = item
    return {...state, items, lastUpdate: Date.now()};
  },
  [types.updateCurrentItem]: (state, {payload: {listName, update}}) => {
    let items = state.items
    items[listName] = items[listName] || {}
    items[listName] = {
      ...items[listName],
      ...update
    }
    return {...state, items, lastUpdate: Date.now()};
  },
  [types.updateListItem]: (state, {payload: {listName,id, update}}) => {
    let lists = state.lists
    lists[listName] = lists[listName] || []
    lists[listName] = lists[listName].map( item => {
        if(item.id == id){
          item = {
            ...item,
            ...update
          }
        }
        return item
    })
    // for (let index = 0; index < lists[listName].length; index++) {
    //   const iterateItem = lists[listName][index];
    //   if(iterateItem.id == id){

    //   }
      
    // }
    return {...state, lists, lastUpdate: Date.now()};
  },
  [types.removeFromList]: (state, {payload: {listName, item}}) => {
    let lists = state.lists;
    lists[listName] = lists[listName] || [];
    lists[listName] = [...lists[listName].filter(i => i.id != item.id)];
    return {...state, lists, lastUpdate: Date.now()};
    // return {...state, favoriteAudio : [...state.favoriteAudio.filter(item => item.id != payload.id)]}
  },
  [types.addToList]: (state, {payload: {listName, item}}) => {
    let lists = state.lists;
    if (!lists[listName]) {
      lists[listName] = [];
    }
    lists[listName] = [
      ...lists[listName].filter(i => i.id != item.id),
      item,
    ];
    return {...state, lists, lastUpdate: Date.now()};
  },
  [types.setListItems]: (state, {payload: {listName, items}}) => {
    let lists = state.lists;
    lists[listName] = items
    return {...state, lists, lastUpdate: Date.now()};
  },
});
