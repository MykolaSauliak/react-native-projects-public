import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../constants/colors';
import constants from '../../constants';

export default StyleSheet.create({
  sliderContainer: {
    paddingVertical: 30,
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
    fontSize: 18,
    color: 'black',
    textAlign: 'right',
  },
  topLists: {
    aspectRatio: 3 / 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
    // maxHeight: 150,
    // width:  '100%',
    backgroundColor: 'white',
  },
  topListItem: {
    width: constants.DEVICE_WIDTH * 0.2,
    height: '100%',
    // maxHeight: 125,
    // marginHorizontal : 10,
    // marginVertical : 15,
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topListImage: {
    width: constants.DEVICE_WIDTH * 0.2 * 0.8,
    aspectRatio: 1,
    borderRadius: constants.DEVICE_WIDTH * 0.2 * 0.4,
    borderColor: 'red',
    borderWidth: 2,
    // marginVertical:5,
    // backgroundColor: colors.gray,
    // s: 15,
  },
  topListTitle: {
    textAlign: 'center',
    fontSize: 11,
    color: 'gray',
    marginTop: 6,
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
    paddingVertical: 18,
  },
  listWhiteBox: {
    // padding: 15,
    // paddingHorizontal : 15,
    paddingVertical: 18,
    backgroundColor: 'white',
  },
  listTitle: {
    fontSize: 32,
    // fontWeight: 'bold',
    fontFamily: 'OPTICenturyNova',
    paddingLeft: 15,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: null,
    fontFamily: 'OPTICenturyNova',
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
    width: 120,
    marginHorizontal: 5,
  },
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
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});
