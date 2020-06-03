import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import constants from '../../constants';

const styles = StyleSheet.create({
  chipContainer: {
    paddingVertical: -15, marginTop:10, alignItems:'center', flexDirection: 'row', flexWrap: 'wrap'
},
  chip: {
    marginHorizontal: 2,
    padding:5,
    borderWidth: 1,
  },
  btnRow: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  favoriteCount: {
    borderRadius: 5,
    fontSize: 18,
    marginTop: 2,
    backgroundColor: colors.gray,
    textAlign: 'center',
    padding: 2,
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
    color: 'black',
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7,
  },
  headerWrapper: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: 'black',
    margin: 12,
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: 'lightgreen',
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  buyBtn: {
    color: 'white',
    fontSize: 13,
    // fontFamily: '1592 GLC Garamond',
  },
  removeBtn: {
    color: 'white',
    fontSize: 16,
  },
  wishlistBtn: {
    flex: 0.15,
    backgroundColor: 'white',
    width: 50,
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.8,
  },
  tableCeil: {
    flex: 0.5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    justifyContent: 'center',
  },
  itemDetailsBox: {
    borderRadius: 10,
    // backgroundColor: 'white',
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  Image: {
    borderRadius: 18,
    width: '100%',
    height: 100,
  },
  cartBtn: {
    flex: 0.6,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black || 'black',
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 50,
    // fontWeight: 'bold',
    marginBottom:5,
    fontFamily: 'OPTICenturyNova',
  },
});

export default styles;
