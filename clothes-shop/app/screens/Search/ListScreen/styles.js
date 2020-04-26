import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import constants from '../../../constants';

const styles = StyleSheet.create({
  listAccordion: {
    backgroundColor: 'white',
    borderColor: colors.gray,
    // shadowColor:'black',
    // shadowRadius:5,
    borderTopWidth: 2,
    width: '100%',
    minHeight: 75,
    justifyContent: 'center',
  },
  first: {
    borderTopColor: null,
    borderTopWidth: 0,
  },
  last: {
    borderBottomWidth: 1,
  },
});

export default styles;
