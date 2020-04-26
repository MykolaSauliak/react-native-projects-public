import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  text: {
    fontSize: 16,
  },
  idcode: {
    height: 45,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginTop: 5,
  },
  avatar: {
    // borderColor: colors.orange,
    // borderWidth: 1,
    borderRadius: 50,
    height: 95,
  },
  email: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  langBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  content: {
    height: 1000,
    marginTop: 50,
  },
  foreground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  message: {
    color: 'white',
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7,
  },
  headerWrapper: {
    backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12,
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: colors.lightGray,
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    // backgroundColor: 'black',
    // color:'white'
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'black',
  },
});
