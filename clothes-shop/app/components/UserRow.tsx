import React from 'react';
import { View,Text } from "react-native";
import constants from '../constants';
import { ListItem } from '.';
import { widthPercentageToDP } from 'react-native-responsive-screen';

type Props = {
    user_id :string,
    name :string,
    last_name: string,
    avatar : string,
}

const UserRow = ({
    user_id,
    avatar,
    name,
    last_name,
    onPress = null,
} : Props) => {
    console.log('avatar',avatar)
    return (
        <ListItem
            onPress={onPress}
            leftAvatar={{source : avatar ?  {uri : avatar} : constants.defaultAvatar, size: 55}}
            title={`${name}${last_name ? " " + last_name : ""}`}
            titleStyle={{fontSize: widthPercentageToDP(6)}}
            />
    );
};


export default UserRow;