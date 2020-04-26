import createReducer from '../../utils/createReducer';
import types from './types';
import {
  filtersort
} from './constants';


const initialState = {
    sortedBy : {
      'default' : filtersort.downloaded,
      'audio' : filtersort.downloaded,
    },
    filterLastAppliedTs : null,
    availableFilters : [

    ],
    notAppliedFilters : {
      // string: boolean
    },
    appliedFilters : {
      // string: boolean
    },
    notAppliedSort : {
      // string: boolean
    },
    appliedSort : {
      // string: boolean
    },
}

export default createReducer(initialState, {
    /// funct recieve state and action
    [types.setSortedBy]: (state : any, { payload }) => {
      let sortedBy = state.sortedBy
      sortedBy[payload.listName] = payload.sortedBy
      return {...state, sortedBy }
    },
    [types.applyFilters]: (state : any, { payload }) => {
      return {...state, appliedFilters : state.notAppliedFilters }
    },
    [types.applySort]: (state : any, { payload }) => {
      return {...state, appliedSort : state.notAppliedSort }
    },
    [types.toggleFilter] : (state : any, { payload: {field, value}} ) => {
        let notAppliedFilters = state.notAppliedFilters
        if(!notAppliedFilters[field]){
          notAppliedFilters[field] = [value]
        }
        else{
            if(notAppliedFilters[field] && notAppliedFilters[field].includes(value)){
              notAppliedFilters[field] = [...notAppliedFilters[field].filter(v => v != value)]
                if(notAppliedFilters[field].length == 0){
                    // delete notAppliedFilters[field]
                }
            }
            else{
              notAppliedFilters[field] =[value, ...notAppliedFilters[field].filter(v => v!=value), ]
            }
        }
        return {...state, notAppliedFilters }
    },
    [types.toggleSort] : (state : any, { payload: {field}} ) => {
        let notAppliedSort = state.notAppliedSort
        notAppliedSort[field] = !notAppliedSort[field]
        return {...state, notAppliedSort }
    },
    [types.resetSort] : (state : any, { payload} ) => {
        return {...state, notAppliedSort : {}, lastUpdate: Date.now()}
    },
    [types.resetFilter] : (state : any, { payload} ) => {
        return {...state, notAppliedFilters : {}, lastUpdate: Date.now() }
    },
    [types.setAvailableFilters]: (state : any, { payload } ) => {
      return {...state, availableFilters : payload }
    },
    [types.setAppliedFilters]: (state : any, { payload }) => {
      return {...state, filterLastAppliedTs:Date.now(), notAppliedFilters : payload }
    },
  })