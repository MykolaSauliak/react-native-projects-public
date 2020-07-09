import React from 'react';
import { View, TouchableOpacity } from "react-native";
import Button from "./Button";
import {   Text } from "../../components";
import globalStyle from '../../styles'

const ButtonBlack = ({
    title = "",
    inverse = false,
    titleStyle = {},
    containerStyle = {},
    ...buttonProps
}) => {

    if(inverse){
        return <Button
            {...buttonProps}
            title={title}
            buttonStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', ...containerStyle}}
            titleStyle={{...globalStyle.text, color:'black', ...titleStyle}}
        />
    }

    return (
        <Button
            {...buttonProps}
            title={title}
            buttonStyle={{backgroundColor: 'black',}}
            containerStyle={[{backgroundColor: 'white',}, containerStyle]}
            titleStyle={[{...globalStyle.text, color:'white',}, titleStyle]}
        />
    );
};

export default ButtonBlack;