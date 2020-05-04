import React from 'react';
import {
    Chip as RNChip,
  } from 'react-native-paper';

const Chip = ({
    children = ""
}) => {
    return (
        <RNChip  style={{marginTop: 2, borderRadius: 0,borderColor:'black'}} >{children}</RNChip>
    );
};

export default Chip;