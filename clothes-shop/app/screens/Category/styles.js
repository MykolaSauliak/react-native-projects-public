import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';
import constants from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  sliderContainer: {
    paddingVertical: 5,
  },
  categoryBox: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  categoryTitle: {
    // fontSize: 18,
    color: 'black',
    textAlign: 'right',
  },
  carousel: {
    minHeight: constants.DEVICE_HEIGHT * 0.35,
    // marginVertical :15
  },
  slide: {
    padding: 10,
    width: '100%',
    borderRadius: 15,
  },
  title: {},
  listBox: {
    // padding: 15,
    width: '100%',
    // marginHorizontal : 15,
    backgroundColor: colors.lightGray,
    paddingVertical: 5,
    paddingLeft: 10,
    // marginVertical: 20,
  },
  listWhiteBox: {
    // padding: 15,
    // paddingHorizontal : 15,
    marginTop: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  listTitle: {
    fontSize: wp(12),
    fontWeight: "600",
    // fontFamily: 'SilkSerif-Regular',
    paddingLeft: 15,
    paddingVertical: 5
  },
  cardTitle: {
    // fontSize: 14,
    fontWeight: null,
    // fontFamily: 'SilkSerif-Regular',
  },
  typeImage: {
    width: 75,
    height: 75,
    marginVertical: 15,
  },
  typeBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCard: {
    marginHorizontal: 5,
    // width: constants.DEVICE_WIDTH * 0.4, 
    // height: null, 
    // aspectRatio: 1/1.3, 
    alignItems:'center'
  },
  topBanner: {
    color: 'white', 
    textAlign:'center', 
    fontSize: widthPercentageToDP(5)
  }
});

const sliderColors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

export const sliderStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: sliderColors.black,
  },
  container: {
    flex: 1,
    backgroundColor: sliderColors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    paddingVertical: 30,
  },
  exampleContainerDark: {
    backgroundColor: sliderColors.black,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleDark: {
    color: sliderColors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 5,
    margin: 1,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

export default styles;
