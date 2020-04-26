import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';
import constants from '../../../../constants';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.inputBackground,
  },
  text: {
    textAlign: 'left',
    marginVertical: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'black',
  },
  imageRow: {
    flexDirection: 'row',
    width: '100%',
    height: constants.DEVICE_WIDTH * 0.5,
  },
});

export default styles;
