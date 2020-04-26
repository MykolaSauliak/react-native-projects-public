import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import T from 'prop-types';
import {colors} from '../../styles';

const Loader = ({color, large, containerStyle = {}}) => (
  <View style={{...containerStyle}}>
      <ActivityIndicator
        size={large && 'large'}
        color={color || colors.loader.secondary}
      />
  </View>
);

Loader.propTypes = {
  color: T.any,
  large: T.bool,
};

export default Loader;
