import React from 'react';
import {View} from 'react-native';
import {Input as RNInput } from 'react-native-elements';

const Input = ({
    // containerStyle = {},
    ...props
}) => {
    return (
        // <View style={{width: '100%', ...containerStyle}}>
        <RNInput 
            {...props}
            errorStyle={{bottom: 0}}
            style={{color: 'black'}}
            />
        // </View>
    );
};

export default Input;