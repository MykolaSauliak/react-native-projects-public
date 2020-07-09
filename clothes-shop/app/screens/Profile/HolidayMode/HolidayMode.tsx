import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Text, BackHeader, Loading, ListItem, BackHeaderCenter } from '../../../components';
import {useSelector, useDispatch} from 'react-redux';
import withSettings from '../../../utils/enhancers/withSettings';
import constants from '../../../constants';
import { colors } from '../../../styles';
import { ShopService } from '../../../services';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { setLoading } from '../../../features/settings/actions';
import { withAuth } from '../../../utils/enhancers';
import { alertExists } from '../../../features/alerts/selectors';
import Dates from 'react-native-dates';
import Modal from 'react-native-modal'
import { User } from '../../../types/User.type';
import globalStyles from '../../../styles'
import { widthPercentageToDP } from 'react-native-responsive-screen';

let Checkbox = ({
    holidaymode = false,
    setHolidaymode = (value : boolean) => {},
    onChange,
    loggedInUser
}) => (
    <ListItem 
        title="Holiday mode"
        checkBox={{checked: loggedInUser.holidaymode, onPress: async () => {
                if(loggedInUser.holidaymode){
                    Alert.alert('Back from your break','Get ready to sell and ship again!',
                    [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "OK", onPress: async () => {
                            setHolidaymode(!loggedInUser.holidaymode)
                            await ShopService.setHolidayMode(!loggedInUser.holidaymode)
                        } }
                      ],
                      { cancelable: true }
                )
                }else{
                    setHolidaymode(!loggedInUser.holidaymode)
                    await ShopService.setHolidayMode(!loggedInUser.holidaymode)
                }
               
                // if(onChange){
                //     onChange(!loggedInUserholidaymode)
                // }
            }, 
            checkedColor: colors.orange
        }}
        topDivider
        titleStyle={{opacity: !holidaymode ? 0.5: 1, ...globalStyles.title}}
        containerStyle={{borderBottomColor: 'black', borderBottomWidth: 0}}
        />
)

Checkbox = withAuth()(Checkbox)

type Props = {
    loggedInUser : User
}

const HolidayMode = ({
    loggedInUser,
    updateUser
}: Props) => {
    console.log('loggedInUser',loggedInUser)
    // let [showEndPicker, setShowEndPicker] = React.useState(false)
    let [showPicker, setShowPicker] = React.useState(false)
    let [loading, setLoading] = React.useState(false)
    
    const [date, setDate] = useState(new Date(loggedInUser?.holidaymodeStartTs || Date.now()));
    const [endDate, setEndDate] = useState(new Date(loggedInUser?.holidaymodeEndTs || Date.now()));
    const [focusedInput, setFocusInput] = useState('startDate');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showDatePicker, setDPck] = useState(loggedInUser.holidaymode);

    const onChange = async (event, selectedDate) => {
        console.log('event',event)
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setLoading(true)
        setShowPicker(false)
        await ShopService.setHolidayStart(event?.nativeEvent?.timestamp)
        setLoading(false)
    };

    const onEndChange = async (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        // setShow(Platform.OS === 'ios');
        // console.log('selectedDate',selectedDate)
        // console.log('selectedDate',selectedDate.getMilliseconds())
        setEndDate(currentDate);
        setLoading(true)
        setShowEndPicker(false)
        setLoading(false)
    };

    const onDatesChange = async ({ startDate, endDate, focusedInput : fcsInpt}) => {
        // console.log('focusedInput',focusedInput)
        console.log('startDate', startDate.valueOf())
        console.log('endDate', endDate?.valueOf())
        console.log('fcsInpt',fcsInpt)
        if(fcsInpt == 'startDate' && focusedInput == 'endDate'){
            console.log('set setHoliday ts')
            setLoading(true)
            await ShopService.setHolidayStart(startDate.valueOf())
            await ShopService.setHolidayEnd(endDate?.valueOf())
            updateUser({
                holidaymodeEndTs: endDate?.valueOf(),
                holidaymodeStartTs: startDate?.valueOf(),
            })
            setLoading(false)
        }
        setFocusInput(fcsInpt)
        setDate(startDate)
        setEndDate(endDate)
    }    

    const isDateBlocked = (date) => date.isBefore(moment(), 'day');

    return (
        // <ScrollView>
        <View style={{flex:1}}>
            <Modal isVisible={showPicker} coverScreen>
                    <View style={{ flex: 1, backgroundColor: 'white', padding: 5}}>
                        <BackHeaderCenter title="close" goBack={() => setShowPicker(false)}/>
                        <Dates
                            onDatesChange={onDatesChange}
                            isDateBlocked={isDateBlocked}
                            startDate={date}
                            endDate={endDate}
                            focusedInput={focusedInput}
                            // focusedMonth={ moment('05/09/2030','DD/MM/YYYY')}
                            range
                            />
                    </View>
            </Modal>
                <BackHeaderCenter title="Holiday mode"/>
            <View style={{flex:1, padding: 15,  borderBottomColor: 'black', borderBottomWidth: 0.4}}>
                <Text style={S.title}>
                    {`Planning to go on holiday and worried you won't be able to ship in under 7 days\nTurn on your holiday mode to let your community know!\nRemember: buyers will able to see your items but won't be able to purchase them`}
                </Text>
                <Checkbox holidaymode={loggedInUser.holidaymode} onChange={(value) => setDPck(value)}/>
                {loading && (<Loading />)}
                {loggedInUser.holidaymode == true && (
                    <>
                       <TouchableOpacity style={S.dateBox} onPress={() => setShowPicker(true)}>
                            <Text style={S.dateTitle}>Start date</Text>
                            <Text style={S.date}>{moment(date).format('D/M/YY')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={S.dateBox} onPress={() => setShowPicker(true)}>
                            <Text style={S.dateTitle}>End date</Text>
                            <Text style={S.date}>{moment(endDate).format('D/M/YY')}</Text>
                        </TouchableOpacity>
                    {/* {showPicker && (
                        <View>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                />
                        </View>
                    )}
                    {showEndPicker == true && (
                            <DateTimePicker
                            testID="dateTimePicker2"
                            value={endDate}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onEndChange}
                            />
                    )} */}
                    </>
                )}

            </View>

        </View>
    // </ScrollView>
    );
};

export default withAuth()(HolidayMode)


const S = StyleSheet.create({
    title: { lineHeight: 24, fontSize: widthPercentageToDP(5), marginBottom: 15},
    date: {fontWeight: 'bold', fontSize: 20},
    dateTitle: {opacity: 0.5, fontSize: 18},
    dateBox: {marginTop: 5, backgroundColor: colors.gray, padding:5},
})