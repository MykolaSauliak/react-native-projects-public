import {StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';

export default StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 8,
  },
  orderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 22,
    backgroundColor: colors.lightGray,
    borderColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 0.2,

    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderTopWidth: 1,
  },
  bottomText: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 5,
  },

  modal: {
    backgroundColor: 'white',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  },
});
