import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import constants from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingBottom: 15},
  favoriteRow: {
    flexDirection: 'row',
    alignItems:'center',
    // backgroundColor:'white',
    width: '100%',
    paddingHorizontal:8,
    height: 75,
    marginTop: -15, 
  },
  imageContainer: {
    height: constants.DEVICE_HEIGHT * 0.5
  },
  feesText: {
    opacity: 0.5,
    fontSize: wp(4.5),
  },
  price:{
    fontSize: wp(5),
  },
  newPrice:{
    fontSize: wp(5),
    color: 'red', 
    fontWeight: 'bold',
    marginLeft: 5
  },
  textInfo: {
    fontSize: wp(6),
  },  
  learnMoreInfo: {
    color: colors.orange,
    fontSize: wp(4),
  },
  priceOld :{
    fontSize: wp(5),
    fontWeight: 'bold',
    textDecorationStyle: 'solid', 
    textDecorationLine: 'line-through'
  },
  whiteBtn: {
    flex:1,
    borderColor: 'black', 
    borderWidth: 1, 
    marginRight: 2,
  },
  btnRow: {
    maxHeight: 55,
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
    backgroundColor: colors.gray, 
    borderRadius: 10, 
    paddingTop: 15
    // backgroundColor: 'white',
    // padding: 10,
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
    fontSize: 28,
    // fontFamily: 'SilkSerif-Regular',
  },
  detailsRow :{backgroundColor : colors.gray, marginVertical: 2},
});

export default styles;
