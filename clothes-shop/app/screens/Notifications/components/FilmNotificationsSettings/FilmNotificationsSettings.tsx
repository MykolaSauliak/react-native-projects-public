import React, { useState} from 'react';
import { 
    View,
    Text,
    ScrollView,
    StyleSheet,
    Platform,
    TouchableOpacity
} from "react-native";
import { 
    CheckBox,
    Button,
    ButtonGroup
 } from "react-native-elements";
import HorrorBackground from '../../../../components/HorrorImageBackground'
import { globalStyles } from '../../../../constants';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../../constants';
import S from '../../styles';
import DateTimePicker  from '@react-native-community/datetimepicker';
import {Topics} from '../../constants'
import moment from 'moment'

enum NotificationType {
    'film'
}

interface Notification {
    title : String,
    type : NotificationType
}

interface Poster {
    small : {url : String},
    medium : {url : String},
    big : {url : String},
}

interface FilmInfo { 
    id : String,
    type: String,
    title_russian : String,
    year : Number,
    poster : Poster,
    description : String,
    runtime : number,
    release_date_world : String,
    imdb : {
        rating : String,
        votes : String,
    },
    kinopoisk : {
        rating : String,
        votes : String,
    },
    director: {
        "person": {
            "attrib": {
                "id": String
            }, 
            "value": String
        }
    }, 
    country: {name: String},
    genre: {name: String},
}

interface RenderItem {
    item : {
        data : FilmInfo
    },
    index : number
}

const FilmNotificationsSettings = ({
    addSubscription,
    removeSubscription,
    hasPermission,
    requestPermission,
    isSubscribed,
    subscriptonLastUpdate,
    setShowHours,
    getShowHours
}) => {

    let topic = constants.films
    let showHours = getShowHours(topic) || 21
    const [date, setDate] = React.useState(new Date(moment().hour(showHours).millisecond()))
    // const [mode, setMode] = React.useState('time');
    const [show, setShow] = React.useState(false);

    if(!hasPermission){
        return <View style={{...StyleSheet.absoluteFill, justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={requestPermission}>
                <Text style={globalStyles.text}>
                    сначала предоставьте разрешение на получение уведомлений
                </Text>
            </TouchableOpacity>
        </View>
    }

    
    const toggleSubscription = (topic : Topics) => {
        if(isSubscribed(topic)){
            removeSubscription(topic)
        }
        else{
            addSubscription(topic)
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
    
        setDate(currentDate);
        setShow(Platform.OS === 'ios' ? true : false);
        setShowHours(topic, currentDate.getHours())
    };
    
    const showTimepicker = () => {
        setShow(true);
    };

    const buttons = ['все', 'только одно']
    return (
        <HorrorBackground key={subscriptonLastUpdate}>
             <ScrollView>
                <View style={{flexDirection:'row', flexWrap: 'wrap',flex:1, marginTop: 30, padding: 10}}>
                        {/* <Text style={globalStyles.text}>Показывать в верхней панели уведомления</Text> */}
                        {/*                         
                        <CheckBox
                            checkedColor="red"
                            uncheckedColor="black"
                            title='Хорор'
                            textStyle={globalStyles.text}
                            containerStyle={S.checkboxContainer}
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            checked={isSubscribed(Topics.horror)}
                            onPress={() => toggleSubscription(Topics.horror)}
                            /> */}
                        {/* <View style={{justifyContent:'center',alignContent:'center', width:'100%', paddingHorizontal: 25}}>
                            <Button 
                                buttonStyle={{backgroundColor:'black'}} 
                                titleStyle={[globalStyles.text, {color: 'white'}]} 
                                onPress={showTimepicker}
                                title="Показать часы" 
                                />
                        </View>
                        <Text style={[globalStyles.text, {padding :15}]}>
                            Время показа уведомлений: {`${getShowHours(topic)} : 00`}
                        </Text>
                        {show && (<DateTimePicker 
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            mode="time"
                            is24Hour={true}
                            value={date}
                            display="clock"
                            onChange={onChange}
                            />)
                        } */}
                        <CheckBox
                            checkedColor="red"
                            uncheckedColor="black"
                            title='Хорор'
                            textStyle={globalStyles.text}
                            containerStyle={S.checkboxContainer}
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            checked={isSubscribed(Topics.horror)}
                            onPress={() => toggleSubscription(Topics.horror)}
                            />
                        <CheckBox
                            checkedColor="red"
                            uncheckedColor="black"
                            title='Боевики'
                            textStyle={globalStyles.text}
                            containerStyle={S.checkboxContainer}
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            checked={isSubscribed(Topics.action)}
                            onPress={() => toggleSubscription(Topics.action)}
                            />
                        <CheckBox
                            checkedColor="red"
                            uncheckedColor="black"
                            title='Триллер'
                            textStyle={globalStyles.text}
                            containerStyle={S.checkboxContainer}
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            checked={isSubscribed(Topics.thriller)}
                            onPress={() => toggleSubscription(Topics.thriller)}
                            />
                        <CheckBox
                            checkedColor="red"
                            uncheckedColor="black"
                            title='Фантастика'
                            textStyle={globalStyles.text}
                            containerStyle={S.checkboxContainer}
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            checked={isSubscribed(Topics.scifi)}
                            onPress={() => toggleSubscription(Topics.scifi)}
                            />
                        <CheckBox
                            checkedColor="red"
                            uncheckedColor="black"
                            title='Детектив'
                            textStyle={globalStyles.text}
                            containerStyle={S.checkboxContainer}
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            checked={isSubscribed(Topics.mystery)}
                            onPress={() => toggleSubscription(Topics.mystery)}
                            />
                        <CheckBox
                            checkedColor="red"
                            uncheckedColor="black"
                            title='Приключения'
                            textStyle={globalStyles.text}
                            containerStyle={S.checkboxContainer}
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            checked={isSubscribed(Topics.adventure)}
                            onPress={() => toggleSubscription(Topics.adventure)}
                            />
                        <CheckBox
                            checkedColor="red"
                            uncheckedColor="black"
                            title='Мелодрама'
                            textStyle={globalStyles.text}
                            containerStyle={S.checkboxContainer}
                            // checkedIcon={<Image source={require('../checked.png')} />}
                            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
                            checked={isSubscribed(Topics.romance)}
                            onPress={() => toggleSubscription(Topics.romance)}
                            />
                                                    
                    </View>
            </ScrollView>
        </HorrorBackground>
    );
};

export default FilmNotificationsSettings;