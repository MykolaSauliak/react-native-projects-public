import React from 'react';
import { View, StyleSheet, Text} from "react-native";
import { ListItem } from "react-native-elements";


const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
    },
    filterContainer : {
        // padding : 10,
        marginTop:0,
        height: 65,
        borderWidth:0,
        // borderBottomColor : 'black',
        backgroundColor : 'white'
    },
});
    
type Props = {
    title?: string,
    label?: string,
    count?: number,
    containerStyle?: any,
}

const FilterRow = ({
    title,
    label,
    count,
    containerStyle,
    ...props
} : Props) => {
    return (
        <ListItem 
        // topDivider 
        bottomDivider 
        containerStyle={[styles.filterContainer,containerStyle]} 
        title={title || label} 
        rightElement={<Text style={{color:'black'}}>
            {count || ''}
        </Text>}
        titleStyle={styles.title} 
        {...props}
        />
    );
};

export default FilterRow;