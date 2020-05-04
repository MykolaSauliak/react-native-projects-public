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
    paddingHorizontal = 25,
    paddingBottom = 25,
    ...props
}) => {
    return (
        <ListItem
            disabled={disabled}
            containerStyle={{paddingHorizontal, paddingVertical:25,paddingBottom, backgroundColor: gray ? colors.gray : 'white'}}
            titleStyle={{
                fontSize: 18, 
                fontWeight: bold ? 'bold' : '100',  
                opacity : disabled ? 0.3 : 1,
                // color : disabled ? colors.gray: 'black',
                ...titleStyle
            }}
            bottomDivider
            {...props}
            />
    );
};

export default ListItemComponent;