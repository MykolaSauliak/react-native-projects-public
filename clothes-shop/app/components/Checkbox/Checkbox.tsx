import React from 'react';
import { colors } from '../../styles';
import { ListItem } from 'react-native-elements';

let Checkbox = ({
    title = "",
    subtitle,
    checked = false,
    onPress = (value : boolean) => {}
}) => (
    <ListItem 
        title={title}
        subtitle={subtitle}
        checkBox={{checked: checked, onPress: () => onPress(!checked), 
            checkedColor: colors.orange
        }}
        titleStyle={{opacity: !checked ? 0.5: 1, fontSize: 14}}
        subtitleStyle={{opacity: !checked ? 0.5: 1, fontSize: 12}}
        containerStyle={{borderBottomColor: 'black', borderBottomWidth: 0.4}}
        />
)
export default Checkbox;