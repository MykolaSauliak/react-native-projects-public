import React from 'react';
import { View, ScrollView } from "react-native";
import { BackHeader, Text, Button } from '../../components';
import Chip from '../../components/Chip/Chip';
import AccordionList from '../../components/AccordionList';
import colors from '../../mockData/colors.json'
import materials from '../../mockData/materials.json'
import ButtonBlack from '../../components/Button/ButtonBlack';
import {withAlerts} from '../../utils/enhancers'
import {Alert} from '../../types/Alert.type'
import shortid from 'shortid'
import moment from 'moment';
import { NavigationService } from '../../services';
import DropdownAlert from 'react-native-dropdownalert';

const AlertCreate = ({
    allAlert,
    navigation
}) => {

    let dropDownAlertRef = React.useRef()
    let item = navigation.getParam('item', {})
    const saveMyAlert = () => {
        let newAlert : Alert = {
            id: shortid.generate(),
            created_time: Date.now(),
            created_date: moment().format('DD-MM-YYYY'),
            received_time: "every day",
            recieved_way: "by_notification",

            fields: {
                universe: item.universe,
                category_name: item.category_name,
                brand_name: item.brand_name,
            }
        }
        console.log('new alert',newAlert)
        allAlert(newAlert)
        dropDownAlertRef?.current.alertWithType('success', '', 'The alert has been created');
        NavigationService.goBack()
    }

    return (
        <View style={{flex:1}}>
            <BackHeader title="Create an alert"/>
            <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={{padding: 15, borderBottomColor: 'black', borderBottomWidth: 0.3}}>
                        <Text bold>My selection</Text>
                        <View style={{marginTop: 10,flexDirection: 'row', flexWrap: "wrap"}}>
                            <Chip style={{marginHorizontal:3}}>{item.universe || 'woman'}</Chip>
                            <Chip style={{marginHorizontal:3}}>{item.category_name}</Chip>
                            <Chip style={{marginHorizontal:3}}>{item.brand_name}</Chip>
                        </View>
                    </View>
                    {/* <AccordionList items={
                        [
                            {
                                id: "1",
                                title: "Model", 
                                data: colors.map((c:string) => ({title: c}) )
                            }
                        ]
                        }
                        onSubItemPress={(item) => console.log('item',item)}
                        /> */}
                    <AccordionList items={
                        [
                            {
                                id: "1",
                                title: "Colors", 
                                data: colors.map((c:string) => ({title: c}) )
                            }
                        ]
                        }
                        onSubItemPress={(item) => console.log('item',item)}
                        />
                    <AccordionList items={
                        [
                            {
                                id: "1",
                                title: "Material", 
                                data: materials.map((c:string) => ({title: c}) )
                            }
                        ]
                        }
                        onSubItemPress={(item) => console.log('item',item)}
                        />
                  </ScrollView>
            </View>
            <View style={{margin: 5}}>
                <ButtonBlack black title="SAVE MY ALERT" onPress={saveMyAlert}/>
            </View>
        </View>
    );
};

export default withAlerts(AlertCreate); 