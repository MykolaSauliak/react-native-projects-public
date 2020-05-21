import createReducer from '../../utils/createReducer';
import types from './types';
import _ from 'lodash'

const initialState = {
  searchLoading: false,
  searchState: {}, //
  currentSearchItem: {}, // with id and searchState
  lastsearch: {
    default: [],
    clothes: [
      {
        title: "All - we love",
        searchState: {
          'toggle': {
            "we_love" : true
          }
        }
      }
    ]
  },
  lastUpdate: null,
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.addToLastSearch]: (state, {payload: {item = {}, listname}}) => {
    //console.log('add to cart -',payload)
    let lastsearch = state.lastsearch;
    lastsearch[listname] = lastsearch[listname] || [];
    lastsearch[listname] = [
      item,
      ...lastsearch[listname].filter(i => i && i.id != item.id),
    ];
    return {
      ...state,
      lastsearch,
      currentSearchItem: item,
    };
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.updateSearchItem]: (state, {payload: {update, id, listname}}) => {
    //console.log('add to cart -',payload)
    let lastsearch = state.lastsearch;
    lastsearch[listname] = lastsearch[listname] || [];
    lastsearch[listname] = lastsearch[listname].map(item => {
        if (item.id == id) {
          return {
            ...item,
            searchState: _.merge(item.searchState,update)
          };
        }
        return item;
    });

    return {
      ...state,
      lastsearch,
      currentSearchItem: {
        ...state.currentSearchItem,
        searchState: _.merge(state.currentSearchItem?.searchState,update)
      },
    };
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.setSearchState]: (state, {payload}) => {
    //console.log('add to cart -',payload)
    return {
      ...state,
      searchState: payload,
      lastUpdate: Date.now(),
    };
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.updateSearchState]: (state, {payload}) => {
    //console.log('add to cart -',payload)
    return {
      ...state,
      searchState: _.merge(state.searchState, payload),
      lastUpdate: Date.now(),
    };
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.removeLastSearch]: (state, {payload}) => {
    //console.log('add to cart -',payload)
    // let lastsearch = state.lastsearch
    return {
      ...state,
      lastsearch: {},
    };
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.setCurrentSearchItem]: (state, {payload}) => {
    //console.log('add to cart -',payload)
    // let lastsearch = state.lastsearch
    return {
      ...state,
      currentSearchItem: payload,
    };
    // return {...state, cartItems : {...state.cartItems.filter(id => id != payload), payload}}
  },
  [types.removeFromLastSearch]: (
    state,
    {payload: {listname, item = {}, lastUpdate = Date.now()}},
  ) => {
    let lastsearch = state.lastsearch;
    lastsearch[listname] = lastsearch[listname] || [];
    lastsearch[listname] = lastsearch[listname].filter(
      obj => obj && obj.id != item.id,
    );
    return {
      ...state,
      lastsearch,
      lastUpdate,
    };
  },
  [types.setLoading]: (state, {payload}) => {
    return {...state, searchLoading: payload};
  },
  [types.setTriggerRefresh]: (state, {payload}) => {
    return {...state, triggerRefresh: payload};
  },
  [types.resetSearchState]: (state, {payload}) => {
    return {
        ...state, 
        searchState: {
          ...state.searchState, 
          refinementList: _.pickBy(state.searchState?.refinementList || {}, function(o){return o.includes('id')}), 
          range: {}, 
          toggle: {}}
      };
  },
});
