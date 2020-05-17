import React from 'react';
import { View,Text } from "react-native";
import { ListItem  } from "react-native-elements";
import constants from '../constants';

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
            leftAvatar={{source : avatar ?  {uri : avatar} : constants.defaultImage}}
            title={`${name} ${last_name}`}
            />
    );
};


export default UserRow;