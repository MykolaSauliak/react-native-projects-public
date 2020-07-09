import React from 'react';
import {ListItem, CheckBox, Header} from 'react-native-elements';
import colors from '../../styles/colors';
import globalStyles from '../../styles'
import { widthPercentageToDP } from 'react-native-responsive-screen';

const ListItemComponent = ({
    titleStyle = {},
    subtitleStyle = {},
    titleMedium = false,
    ...props
}) => {
    return (
        <ListItem
            titleStyle={[globalStyles.title,titleStyle, titleMedium && {fontSize: widthPercentageToDP(6)}]}
            subtitleStyle={[globalStyles.title,subtitleStyle]}
            {...props}
            />
    );
};

export default ListItemComponent;