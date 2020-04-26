/* eslint-disable max-len */
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import T from 'prop-types';
import vestiaireco_cover from '../../assets/images/vestiaireco_cover_mini.jpg';

const Logo = ({size, style}) => {
  let width;
  let height;

  switch (size) {
    case 'small':
      width = 100;
      height = 40;
      break;
    case 'large':
      width = 230;
      height = 100;
      break;
    default:
      width = 200;
      height = 90;
      break;
  }

  return (
    <Image
      source={vestiaireco_cover}
      resizeMode="cover"
      style={{...StyleSheet.absoluteFill, height: '100%', width: '100%'}}
    />
  );
};

Logo.propTypes = {
  size: T.string,
  style: T.any,
};

export default Logo;
