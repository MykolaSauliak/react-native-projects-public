import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-elements";

const ButtonBlack = ({
    title,
    ...buttonProps
}) => {
    return (
        <Button
            title={title}
            buttonStyle={{backgroundColor: 'black'}}
            titleStyle={{color:'white'}}
            {...buttonProps}
        />
    );
};

export default ButtonBlack;