import React from 'react';
import { View, ScrollView, StyleSheet } from "react-native";
import { BackHeader, Text, Button } from '../../components';
import Chip from '../../components/Chip/Chip';
import AccordionList from '../../components/AccordionList';
import colorsData from '../../mockData/colors'
import materials from '../../mockData/materials'
import ButtonBlack from '../../components/Button/ButtonBlack';
import {withAlerts} from '../../utils/enhancers'
import {Alert} from '../../types/Alert.type'
import shortid from 'shortid'
import moment from 'moment';
import { NavigationService, DropdownAlertService } from '../../services';
// import DropdownAlert from 'react-native-dropdownalert';
import { colors } from '../../styles';
import { fontSizes } from '../../constants/styles';

const AlertCreate = ({
    addAlert,
    navigation
}) => {

    let [color, setColor] = React.useState("")
    let [material, setMaterial] = React.useState("")

    // let dropDownAlertRef = React.useRef()
    let item = navigation.getParam('item', {})
    console.log('item',item)

    const saveMyAlert = () => {
        let newAlert : Alert = {
            id: shortid.generate(),
            created_time: Date.now(),
            created_date: moment().format('DD-MM-YYYY'),
            received_time: "every day",
            recieved_way: "by_notification",
            fields: {
                type_name: item.type_name,
                category_name: item.category_name,
                brand_name: item.brand_name,
                color: color,
                material: material,
            }
        }
        console.log('new alert',newAlert)
        addAlert(newAlert)
        DropdownAlertService.getDropDown().alertWithType('success', 'Success', 'The alert has been created', {}, 500);
        NavigationService.goBack()
    }

    console.log('material',material)
    console.log('color',color)

    return (
        <View style={{flex:1}}>
            <BackHeader title="Create an alert"/>
            {/* <View style={{position: 'absolute'}}>
                <DropdownAlert ref={dropDownAlertRef} />
            </View> */}
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text mediumSize bold>My selection</Text>
                        <View style={{marginTop: 10,flexDirection: 'row', flexWrap: "wrap"}}>
                            {item.type_name && <Chip style={styles.chip}>{item.type_name}</Chip>}
                            {item.category_name && <Chip style={styles.chip}>{item.category_name}</Chip>}
                            {item.brand_name && <Chip style={styles.chip}>{item.brand_name}</Chip>}
                        </View>
                    </View>
                    <View style={{flex:1, marginTop: 15}}>
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
                        <AccordionList 
                            items={
                            [
                                {
                                    id: "1",
                                    title: "Colors", 
                                    data: colorsData.map((c:string) => ({title: c}) ) || [],
                                    // subtitle: "test"
                                    subtitle: color.length > 0 ? <Chip style={[styles.chip, {marginTop: 6}]}>{color}</Chip> : ""

                                }
                            ]
                            }
                            onSubItemPress={(item) => setColor(item.title)}
                            />
                        <AccordionList 
                            // subtitle={material.length> 0 && <Chip style={[styles.chip, {marginTop: 6}]}>{material}</Chip>}
                            items={
                                [
                                    {
                                        id: "1",
                                        title: "Material", 
                                        // subtitle: "test",
                                        subtitle: material.length > 0 ? <Chip style={[styles.chip, {marginTop: 6}]}>{material}</Chip> : "",
                                        data: materials.map((c:string) => ({title: c}) ) || []
                                    }
                                ]
                            }
                            onSubItemPress={(item) => setMaterial(item.title)}
                            />
                    </View>
                  </ScrollView>
            </View>
            <View style={{margin: 5}}>
                <ButtonBlack black title="SAVE MY ALERT" onPress={saveMyAlert}/>
            </View>
        </View>
    );
};

export default withAlerts()(AlertCreate); 

const styles = StyleSheet.create({
    chip: {
        marginHorizontal:3,
        backgroundColor: 'white',
        borderColor: colors.orange,
        borderWidth: 1,
        color: colors.orange,
        padding: 3,
        fontSize: 17,
    },
    header: {
        padding: 15,
        borderBottomColor: 'black', 
        borderBottomWidth: 0
    }
})