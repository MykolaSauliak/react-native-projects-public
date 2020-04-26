import {StyleSheet} from 'react-native';
import {dimensions} from '../../constants/styles';

export default StyleSheet.create({
  logo: {
    alignSelf: 'center',
    zIndex: 2,
  },
  logoSmall: {
    marginTop: dimensions.indent * 0.8,
    marginBottom: dimensions.indent * 0.8,
  },
  logoMedium: {
    marginTop: dimensions.indent * 1.5,
    marginBottom: dimensions.indent * 0.9,
  },
  logoLarge: {
    marginTop: dimensions.indent * 2,
    marginBottom: dimensions.indent * 1.8,
  },
});
