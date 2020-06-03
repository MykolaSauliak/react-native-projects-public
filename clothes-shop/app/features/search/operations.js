import _ from 'lodash'

/**
 * 
  type State = {
    refinementList?: {
      [key : string]: string[]
    },
    range?: {
      [key: string] : {
        min: number,
        max: number
      }
    },
    toggle: {
      [key : string] : boolean
    }
  }
 */

// if(_.isEmpty(item.value)){
//   updateSearchState(refineLocal({[attribute] : [...searchState.refinementList[attribute]]}, searchState))
// }else{
//   updateSearchState(refineLocal({[attribute] : item.value}, searchState))
// }

/**
 * 
 * @param {Object} object 
 * @param {State} state 
 */
const refine = (object = {}, state = {}) => {
    Object.keys(object).forEach(key => {
        //will work with refinement list
        if(Array.isArray(object[key])){
            state.refinementList = state.refinementList || {}
            state.refinementList[key] =  state.refinementList[key] || []
            object[key].forEach( str =>  state.refinementList[key].includes(str) ? _.pull(state.refinementList[key], str) : state.refinementList[key].push(str) )
        }
        else if(typeof object[key] === 'object' && object[key] !== null && object[key].min && object[key].max){
          state.range = state.range || {}
          state.range[key] =  state.range[key] || {}
          state.range[key].min = object[key].min
          state.range[key].max = object[key].max
        }
        //TODO :for range and toggle values
    })
    return state;
}

export {
  refine
}