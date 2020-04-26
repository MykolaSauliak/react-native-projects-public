import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

const NoResult = ({containerStyle}) => {
  return (
    <View style={[{alignItems: 'center', opacity: 0.5}, containerStyle]}>
      <Icon name="search" size={45} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
        }}>
        {'Maybe go back and try a \ndifferent keyword?'}
      </Text>
    </View>
  );
};

export default NoResult;
