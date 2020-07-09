import React from 'react';
import GridList from '../components/GridList/GridList';
import {
    compose, 
    withProps,
    withState
} from 'recompose';
import {withFavorite} from '../utils/enhancers';
import constants from '../constants';
import { withLists } from '../features/lists';
import _ from "lodash";

const enhance = compose(
    withFavorite({listName: constants.clothes}),
    withState('loading', 'setLoading',false),
    withState('lastItem', 'setLastItem',{}),
    withLists({listName: constants.newin}),
    withProps(({
        setListItems, 
        listName,
        fetchMore,
        getListItems,
        setLoading,
        items,
        loading,
        setLastItem,
        lastItem
    }) => {
        let properties = {}
        if(!items || !Array.isArray(items) && listName){
            properties.items = getListItems({listName}) || []
        }
        if(listName){
            let items = getListItems({listName}) 
            items = items || []           
            if(_.isEmpty(items) || items.length == 0){
                setLoading(true)
                fetchMore()
                    .then(newItems => {
                        newItems = newItems || []
                        if(!_.isEmpty(newItems)){
                            console.log('fetched items',newItems)
                            properties.items = newItems
                            setListItems({listName, items: [...newItems] })
                        }
                        setLoading(false)
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            }
            properties.onEndReached =  async () => {
                if(fetchMore && !loading){
                    setLoading(true)
                    let items = getListItems({listName}) 
                    items = items || []
                    if(lastItem?.id != items[items.length - 1]?.id){
                        let newItems = await fetchMore(items[items.length - 1])
                        newItems = newItems || []
                        // console.log('newItems',newItems)
                        let allItems =  _.uniqBy([...items, ...newItems], 'id')
                        // console.log('allItems',allItems)
                        setListItems({listName, items:allItems })
                        setLastItem(items[items.length - 1])
                    }
                    setLoading(false)
                }
            }
    }
    return properties
    }
    )
);

export default enhance(GridList);
