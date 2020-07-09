import React from 'react';
import { colors } from '../../styles';
import globalStyles from '../../styles'
import { ListItem } from '..';

let Checkbox = ({
    title = "",
    subtitle,
    checked = false,
    onPress = (value : boolean) => {},
    containerStyle = {},
    titleStyle = {},
}) => (
    <ListItem  
        title={title}
        subtitle={subtitle}
        checkBox={{
            containerStyle,
            checked: checked, onPress: () => onPress(!checked), 
            checkedColor: colors.orange
        }}
        titleStyle={{opacity: !checked ? 0.5: 1, fontSize: 14, ...globalStyles.title,...titleStyle}}
        subtitleStyle={{opacity: !checked ? 0.5: 1, fontSize: 12, ...globalStyles.title}}
        containerStyle={{borderBottomColor: 'black', borderBottomWidth: 0.4,...containerStyle}}
        />
)
export default Checkbox;