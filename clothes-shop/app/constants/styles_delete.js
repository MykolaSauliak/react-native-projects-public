import {StyleSheet} from 'react-native';
import * as dimensions from './dimensions';
import colors from '../styles/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
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
  },
  botomSheetSubtitle: {
    textAlign: 'left',
    marginVertical: 15,
  },
  we_love: {
    fontSize: 10,
    marginBottom: 5,
    backgroundColor: colors.weLoveColor,
    padding: 2,
    borderRadius: 3,
    color: colors.weLoveColorDark,
  },
});

export default styles;
export { 
  dimensions, 
  colors 
}
// export {default as colors} from './colors';
export {default as fontSizes} from './fontSizes';
export {default as theme} from './theme';
