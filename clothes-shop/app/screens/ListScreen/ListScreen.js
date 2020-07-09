import React from 'react';
import { 
    View,
    Text ,
    FlatList
} from "react-native";
import { BackHeader, BackHeaderCenter } from '../../components';
import _ from 'lodash'

const ListScreen = ({
    items = [],
    Component,
    ListComponent,
    itemProps,
    title = 'List',
    headerProps = {},
    listName,
    getListItems,
    lastUpdate,
}) => {

    console.log('listName',listName)
    if(_.isEmpty(items) && listName){
        console.log('fetch redux list')
        items = getListItems({listName}) || []
        // console.log('items',items)
    }
    if(!ListComponent){
        console.log('not ListComponent')
        ListComponent = FlatList
    }

    let props = {
        items: items,
        data : items
    }
    if(Component){
        props.renderItem = ({item,index}) => (
            <Component {...item} item={item} />
        ) 
    }
    // console.log('props',props)
    return (
        <View style={{flex:1}}>
            <BackHeaderCenter title={title} {...headerProps} />
            <ListComponent {...props} />
        </View>
    );
};

export default ListScreen;