import React from 'react';
import {View} from 'react-native'
import { Text } from '../../../../../components';
import Chip from '../../../../../components/Chip/Chip';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Alert } from "../../../../../types/Alert.type";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { withAlerts } from '../../../../../utils/enhancers';

let AlertRow = ({
    id,
    received_time,
    recieved_way,
    created_date = "",
    fields = {},
    removeAlert,
}: Alert & {
    removeAlert: (item: {id: string}) => void
}) => {

    const getReceivedTime = () => {
        return received_time.split('_').join(' ')
    }
    const getReceivedWay = () => {
        return recieved_way.split('_').join(' ')
    }
    
    return (<View style={{flexDirection: 'row', borderColor: 'black', borderTopWidth: 0.5, padding: 10}}>
        <View style={{flex:0.1, justifyContent: 'flex-start'}}>
            <TouchableOpacity onPress={() => removeAlert({id})}>
                <AntDesign name="delete" size={25} />
            </TouchableOpacity>
            {/* <EvilIcons name="pencil" size={25} /> */}
        </View>
        <View style={{flex: 0.9, justifyContent: 'flex-start'}}>
            <Text bold>{`Alert created on ${created_date}`}</Text>
            <View style={{marginTop: 0,marginBottom :10, flexDirection: 'row', flexWrap: "wrap"}}>
                {
                    Object
                        .entries(fields)
                        .filter(([k,v]) => v)
                        .map(([k,v]) => (
                            <Chip textStyle={{fontSize: 12}} style={{marginHorizontal:3, borderColor: 'black', borderWidth: 1}}>{v}</Chip>
                        ))
                }
                {/* // <Chip style={{marginHorizontal:3}}>{fields.universe || 'woman'}</Chip>
                // <Chip style={{marginHorizontal:3}}>{fields.category_name}</Chip>
                // <Chip style={{marginHorizontal:3}}>{fields.brand_name}</Chip> */}
            </View>
            <Text><Text bold>Received : </Text>{`${getReceivedTime()} ${getReceivedWay()}`}</Text>
        </View>
    </View>)
}

AlertRow = withAlerts()(AlertRow)

const ItemLookingFor = ({
    alerts,
}) => {
    console.log('alerts',alerts)
    return (
        <View style={{flex:1}}>
            <View style={{padding: 10}}>
                <Text xxmediumSize>To avoid missing that special item when it comes online, you can choose the frequency of your alerts</Text>
            </View>
            <FlatList 
                data={alerts} 
                renderItem={({item, index}) => (
                    <AlertRow 
                        {...item}
                        />
                )}
                />
        </View>
    );
};

export default ItemLookingFor;