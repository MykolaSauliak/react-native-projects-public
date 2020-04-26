import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  categoryBox: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  categoryTitle: {
    fontSize: 18,
    color: 'black',
  },
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
