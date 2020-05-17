import React from 'react';
import {
    Chip as RNChip,
  } from 'react-native-paper';
import { Text } from '..';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const S = StyleSheet.create({
    chip: {
        marginTop: 2, 
        borderRadius: 0,
        borderColor:'black',
        backgroundColor: colors.gray,
        padding: 3
    }
})

const Chip = ({
    style = {},
    textStyle = {},
    children = ""
}) => {
    return (
        <Text style={[textStyle, S.chip, style]}>{children}</Text>
        // <RNChip textStyle={[textStyle]} style={[{marginTop: 2, borderRadius: 0,borderColor:'black'}, style]} >{children}</RNChip>
    );
};

export default Chip;