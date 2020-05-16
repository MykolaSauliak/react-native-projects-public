import React from 'react';
import {
    Chip as RNChip,
  } from 'react-native-paper';

const Chip = ({
    style = {},
    textStyle = {},
    children = ""
}) => {
    return (
        <RNChip textStyle={[textStyle]} style={[{marginTop: 2, borderRadius: 0,borderColor:'black'}, style]} >{children}</RNChip>
    );
};

export default Chip;