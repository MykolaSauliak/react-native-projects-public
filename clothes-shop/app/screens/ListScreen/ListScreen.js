import React from 'react';
import { 
    View,
    Text ,
    FlatList
} from "react-native";
import { BackHeader } from '../../components';

const ListScreen = ({
    items,
    Component,
    ListComponent,
    itemProps,
    title = 'List'
}) => {

    let props = {
        items: items,
        data : items
    }

    if(!ListComponent){
        console.log('not ListComponent')
        ListComponent = FlatList
    }

    if(Component){
        props.renderItem = ({item,index}) => (
            <Component {...item} item={item} />
        ) 
    }
    // console.log('props',props)

    return (
        <View style={{flex:1}}>
            <BackHeader title={title} />
            <ListComponent {...props} />
        </View>
    );
};

export default ListScreen;