import React from 'react';
import {ActivityIndicator} from 'react-native';
import colors from '../styles/colors';

const Loading = () => {
  return <ActivityIndicator size="large" color={colors.black} />;
};

export default Loading;
