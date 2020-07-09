import React from 'react';
import {View} from 'react-native';
import {Input as RNInput } from 'react-native-elements';

const Input = ({
    // containerStyle = {}
    inputType,
    onChangeText,
    ...props
}) => {

    const onChangeTextWithParser = value => {
        if (inputType === 'card-number') {
        //   value = payments.formatCreditCardNumber(value);
        } else if (inputType === 'card-expiration') {
        //   value = payments.formatExpirationDate(value);
        } else if (inputType === 'card-cvc') {
        //   value = payments.formatCVC(value);
        } else if (inputType === 'date') {
        //   value = dates.formatDate(value);
        } else if (inputType === 'month') {
        //   value = dates.formatMonth(value);
        } else if (inputType === 'year') {
        //   value = dates.formatYear(value);
        } else if (inputType === 'number') {
          value = parseFloat(value);
        }
    
        onChangeText(value);
      };

    return (
        // <View style={{width: '100%', ...containerStyle}}>
        <RNInput 
            {...props}
            errorStyle={{bottom: 0}}
            style={{color: 'black'}}
            onChangeText={onChangeTextWithParser}
            />
        // </View>
    );
};

export default Input;