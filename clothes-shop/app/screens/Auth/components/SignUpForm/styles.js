import {StyleSheet} from 'react-native';
import {colors, dimensions} from '../../../../styles';
import {isSmallDevice, isAndroid} from '../../../../utils';
import constants from '../../../../constants';

const smallDevice = isSmallDevice();
const isAndroidDevice = isAndroid();

export default StyleSheet.create({
  container: {
    // flexGrow: 1,
    // backgroundColor: colors.signInSignUpForm.backgroundColor,
    width: constants.DEVICE_WIDTH * 0.8,
    paddingHorizontal: dimensions.indent,
    backgroundColor: 'black',
    borderRadius: 15,
  },
  heading: {
    marginTop: smallDevice
      ? dimensions.indent * 0.9
      : dimensions.indentModerated * 1.1,
    marginBottom: smallDevice
      ? dimensions.indent
      : dimensions.indentModerated * 1.2,
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
    marginTop: dimensions.indent * 0.5,
    marginBottom: dimensions.indentModerated,
  },
  inputContainerEmail: {
    marginBottom: smallDevice
      ? dimensions.indent * 0.9
      : dimensions.indent * 1.1,
  },
  inputContainerPassword: {
    marginBottom: smallDevice
      ? dimensions.indent * 0.6
      : dimensions.indent * 0.8,
  },
  inputContainerFirstAndlast_names: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: smallDevice ? dimensions.indent * 0.9 : dimensions.indent,
  },
  inputContainer: {
    flex: 1,
  },
  inputLeft: {
    marginRight: dimensions.indent,
  },
  buttonContainer: {
    marginVertical:
      smallDevice || isAndroidDevice
        ? dimensions.indent * 0.6
        : dimensions.indent * 0.8,
    backgroundColor: 'black',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  marginBottom: {
    marginBottom: dimensions.smallIndent,
  },
  borderRadius: {
    borderRadius: 10,
  },
});
