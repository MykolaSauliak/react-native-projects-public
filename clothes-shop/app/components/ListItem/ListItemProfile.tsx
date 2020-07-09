import React from 'react';
import {

} from 'react-native';
import {ListItem, CheckBox, Header} from 'react-native-elements';
import colors from '../../styles/colors';
import globalStyles from '../../styles'

const ListItemComponent = ({
    titleStyle = {},
    gray = false,
    bold = false,
    disabled = false,
    paddingHorizontal = 15,
    paddingBottom = 10,
    paddingVertical = 15,
    containerStyle = {},
    ...props
}) => {
    return (
        <ListItem
            disabled={disabled}
            containerStyle={{
                paddingHorizontal, 
                paddingVertical,
                paddingBottom, 
                backgroundColor: gray ? colors.gray : 'white',
                opacity: gray ? 0.5:  1,
                ...containerStyle
            }}
            titleStyle={{
                fontSize: 22, 
                ...globalStyles.text,
                paddingLeft: 5,
                fontWeight: bold ? '900' : '100',  
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