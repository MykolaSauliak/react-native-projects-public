
import {StyleSheet} from 'react-native';
import colors from './colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';
export {default as dimensions}  from './dimensions';
export {default as colors} from './colors';
export {default as fontSizes} from './fontSizes';
export {default as theme} from './theme';

const styles = StyleSheet.create({
  avatar: {    
    width: 50, 
    height: 50, 
    borderRadius: 25
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  listTitle: {
    fontSize: 35,
    paddingLeft: 15,
    marginVertical: 15,
    // fontWeight: 'bold',
    // fontFamily: 'OPTICenturyNova',
  },
  badgeText: {fontSize: 11},
  sliderContainer: {
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontFamily: "Linux Libertine",
    // fontSize: 16,
    color: 'black',
  },
  boldText: {
    fontFamily: "Linux Libertine O",
    // fontSize: 16,
    fontWeight: "bold",
    color: 'black',
  },
  title: {
    fontFamily: "Linux Libertine",
    // fontSize: 16,
    color: 'black',
  },
  transparentBox: {
    backgroundColor: 'rgba(219, 217, 217,0.4)',
    padding: 5,
  },
  price: {
    fontWeight: 'bold',
  },
  newPrice: {
    // fontSize: 22,
    fontWeight: 'bold',
  },
  discountPrice: {
    color: 'gray',
    marginHorizontal: 3,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  desc: {
    fontSize: wp('6'),
    color: 'black',
    textTransform: "uppercase",
  },
  discount: {
    fontWeight: 'bold',
    backgroundColor: 'red',
    borderRadius: 5,
    color: 'white',
    padding: 3,
    // padding: 5
  },
  botomSheetTitle: {
    textAlign: 'left',
    marginVertical: 15,
    opacity: 0.5,
    fontSize: widthPercentageToDP(6),
    lineHeight: 28,
  },
  botomSheetSubtitle: {
    textAlign: 'left',
    marginVertical: 15,
    fontSize: widthPercentageToDP(5),
    lineHeight: 25,
  },
  we_love: {
    fontSize: 10,
    marginBottom: 5,
    backgroundColor: colors.weLoveColor,
    padding: 2,
    borderRadius: 3,
    color: colors.weLoveColorDark,
  },
  radioCircle: {
		height: 20,
		width: 20,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: colors.orange,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 10,
		height: 10,
        borderRadius: 10,
        borderColor: colors.orange,
		backgroundColor: colors.orange,
    },
  sellPlaceholder: {
      padding: 15,
      color: 'black',
      // fontSize: wp,
      marginVertical: 15,
      textAlign: 'center',
      lineHeight: 32,
      fontSize: wp(7)
  },
  listItem: {
      textTransform: "capitalize",
      textAlign: 'center',
      fontSize: wp(6),
      color: 'black',
  },
  leftListItem: {
      textTransform: "capitalize",
      textAlign: 'left',
      fontSize: wp(6)
  },
  leftListItemSmall: {
      textTransform: "capitalize",
      textAlign: 'left',
      fontSize: wp(5)
  },
  rightListItem: {
      textTransform: "capitalize",
      textAlign: 'right',
      fontSize: wp(6)
  },
});

export default styles;


export {
  styles as globalStyles
}