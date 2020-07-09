import {StyleSheet} from 'react-native';
import {colors, dimensions} from '../../../../styles';
import {isSmallDevice, isAndroid} from '../../../../utils';
import constants from '../../../../constants';

const smallDevice = isSmallDevice();
const isAndroidDevice = isAndroid();

export default StyleSheet.create({
  container: {
    // justifyContent:'flex-end',
    // flex: 1,
    // justifyContent:'center',
    // backgroundColor: colors.signInSignUpForm.backgroundColor,
    width: constants.DEVICE_WIDTH * 0.8,
    paddingHorizontal: dimensions.indent,
    backgroundColor: 'black',
    borderRadius: 15,
  },
  heading: {
    marginTop: dimensions.indent * 1.1,
    marginBottom: dimensions.indent * 1.2,
    textAlign: 'center',
    color: 'white',
  },
  text: {
    textAlign: 'center',
  },
  textWithTouchableContainer: {
    flexDirection: smallDevice ? 'column' : 'row',
  },
  bottom: {
    marginTop: isSmallDevice
      ? dimensions.indentModerated * 0.7
      : dimensions.indentModerated * 0.9,
    marginBottom: dimensions.indentModerated,
  },
  inputContainerEmail: {
    marginBottom: dimensions.indent * 1.8,
  },
  inputContainerPassword: {
    marginBottom: dimensions.indent,
  },
  buttonContainer: {
    marginTop: isAndroidDevice
      ? dimensions.indent * 0.7
      : dimensions.indent * 1.4,
    marginBottom: isAndroidDevice
      ? dimensions.indent * 0.7
      : dimensions.indent * 1.5,
  },
  alignCenter: {
    justifyContent: 'center',
  },
});
