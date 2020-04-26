import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.inputBackground,
  },
  text: {
    textAlign: 'left',
    marginVertical: 15,
  },
  forYour: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.5,
  },
  yourPrice: {
    marginTop: 2,
    fontSize: 16,
  },
});

export default styles;
