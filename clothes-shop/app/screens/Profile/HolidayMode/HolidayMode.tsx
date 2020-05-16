import React from 'react';
import { View, } from "react-native";
import { Text, BackHeader } from '../../../components';
import { ListItem } from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import withSettings from '../../../utils/enhancers/withSettings';
import constants from '../../../constants';
import { colors } from '../../../styles';
import { ShopService } from '../../../services';

let Checkbox = ({
    holidaymode = false,
    setHolidaymode = (value : boolean) => {}
}) => (
    <ListItem 
        title="Holiday mode"
        checkBox={{checked: holidaymode, onPress: async () => {
                setHolidaymode(!holidaymode)
                await ShopService.setHolidayMode(!holidaymode)
            }, 
            checkedColor: colors.orange
        }}
        titleStyle={{opacity: !holidaymode ? 0.5: 1}}
        containerStyle={{borderBottomColor: 'black', borderBottomWidth: 0.4}}
        />
)

Checkbox = withSettings({pick: [constants.holidaymode]})(Checkbox)

const HolidayMode = ({

}) => {
    return (
        <View>
            <BackHeader title="Holiday mode"/>
            <View style={{padding: 15,  borderBottomColor: 'black', borderBottomWidth: 0.4}}>
                <Text style={{ lineHeight: 20, }}>
                    {`Planning to go on holiday and worried you won't be able to ship in under 7 days\nTurn on your holiday mode to let your community know!\nRemember: buyers will able to see your items but won't be able to purchase them`}
                </Text>
            </View>
            <Checkbox />
        </View>
    );
};

export default HolidayMode;