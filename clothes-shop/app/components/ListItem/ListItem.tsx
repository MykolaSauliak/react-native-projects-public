import React from 'react';
import {

} from 'react-native';
import {ListItem, CheckBox, Header} from 'react-native-elements';
import colors from '../../styles/colors';

const ListItemComponent = ({
    titleStyle = {},
    gray = false,
    bold = false,
    disabled = false,
    ...props
}) => {
    return (
        <ListItem
            disabled={disabled}
            containerStyle={{padding:15, backgroundColor: gray ? colors.gray : 'white'}}
            titleStyle={{
                fontSize: 22, 
                fontWeight: bold ? 'bold' : '100',  
                ...titleStyle
            }}
            bottomDivider
            {...props}
            />
    );
};

export default ListItemComponent;