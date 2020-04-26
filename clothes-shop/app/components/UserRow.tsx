import React from 'react';
import { View,Text } from "react-native";
import { ListItem  } from "react-native-elements";

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
    return (
        <ListItem 
            onPress={onPress}
            leftAvatar={{source : {uri : avatar}}}
            title={`${name} ${last_name}`}
            />
    );
};


export default UserRow;