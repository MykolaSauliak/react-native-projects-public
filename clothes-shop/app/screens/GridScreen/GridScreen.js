import React from 'react';
import { 
    View,
    Text ,
    FlatList
} from "react-native";
import { BackHeader } from '../../components';
import { GridList } from '../../containers';

const GridScreen = ({
    items,
    title = 'List'
}) => {
    console.log('items',items[0])

    return (
        <View style={{flex:1}}>
            <BackHeader title={title} />
            <GridList items={items} />
        </View>
    );
};

export default GridScreen;