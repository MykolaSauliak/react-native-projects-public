import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../styles/colors';

const S = StyleSheet.create({
  markTitle: {
    fontSize: 12,
    backgroundColor: colors.weLoveColor,
    padding: 2,
    borderRadius: 3,
    color: colors.weLoveColorDark,
  },
});

const Mark = ({title, fontSize = 10}) => {
  return (
    // <View>
    <Text style={[S.markTitle, {fontSize}]}>{title}</Text>
    // </View>
  );
};

export default Mark;
