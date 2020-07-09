import reducers from './reducers';
export default reducers;

import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { getLists, getLastUpdate, getItems } from "./selectors";
import {
    setCurrentListItem, 
    setListItems,
    removeFromList,
    updateListItem,
    updateCurrentItem,
} from "./actions";

export const withLists = (options= {}) => BaseComponent => props => {

    const lists = useSelector(state => getLists(state))
    const items = useSelector(state => getItems(state))
    const lastUpdate = useSelector(state => getLastUpdate(state))
    const dispatch = useDispatch()
    let currentListItem = null
    if(options.listName){
        currentListItem = items[options.listName] || {}
    }
    return (
        <BaseComponent 
            {...props}
            currentListItem={currentListItem}
            getListItems={({listName}) => lists[listName] || []}
            getCurrentListItem={({listName}) => items[listName] || {}}
            getListCount={({listName}) => lists[listName] ? lists[listName].length : 0}
            updateCurrentItem={({listName, update}) => dispatch(updateCurrentItem({listName, update}))}
            updateListItem={({listName, id, update}) => dispatch(updateListItem({listName, id, update}))}
            setListItems={({listName, items}) => dispatch(setListItems({listName, items}))}
            setCurrentListItem={({listName, item}) => dispatch(setCurrentListItem({listName, item}))}
            removeFromList={({listName, item}) => dispatch(removeFromList({listName, item}))}
            updateItem={({listName, item}) => dispatch(updateItem({listName, item}))}
            lastUpdate={lastUpdate}
            />
    )
}


export const withListCount = (listName : string) => BaseComponent => {

    const lists = useSelector(state => getLists(state))
    const listItems =  lists[listName] || []
    console.log('count',listItems.length)
    return (
        <BaseComponent 
            // {...props}
            count={listItems.length}
            />
    )
}