import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-elements";

const ButtonBlack = ({
    title = "",
    inverse = false,
    titleStyle = {},
    containerStyle = {},
    ...buttonProps
}) => {

    if(inverse){
        return <Button
            title={title}
            buttonStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', ...containerStyle}}
            titleStyle={{color:'black', ...titleStyle}}
            {...buttonProps}
        />
    }

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