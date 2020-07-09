import {StyleSheet} from 'react-native';
import colors from '../../../../../../styles/colors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.inputBackground,
  },
  text: {
    textAlign: 'left',
    marginVertical: 15,
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '100'
  },
  listItemcontainerStyle: {
    height: 75,
    // justifyContent: 'center'
  },
});

export default styles;
