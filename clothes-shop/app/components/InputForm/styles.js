import {StyleSheet} from 'react-native';
import {colors, dimensions} from '../../styles';
import {isAndroid} from '../../utils';

const android = isAndroid();

export default StyleSheet.create({
  container: {},
  animatedContainer: {
    height: dimensions.indent * 3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.input.borderColor,
  },
  inputLabel: {
    position: 'absolute',
    left: dimensions.indent * 0.7,
    top: android ? dimensions.indent : dimensions.indent * 1.1,
    color: 'white',
    // color: colors.input.labelColor,
    // backgroundColor: colors.input.labelBackgroundColor,
    backgroundColor: 'black',
    paddingHorizontal: dimensions.indent * 0.2,
  },
  input: {
    color: 'white',
    // color: colors.input.textColor,
    height: dimensions.indent * 3,
    paddingLeft: dimensions.indent * 0.8,
    paddingRight: dimensions.indent * 0.8,
    paddingTop: dimensions.indent,
    paddingBottom: dimensions.indent,
  },
  inputWithIcon: {
    paddingRight: dimensions.indent * 3,
  },
  inputWithLeftIcon: {
    paddingLeft: dimensions.indent * 2.2,
  },
  inputLabelWithLeftIcon: {
    left: dimensions.indent * 2.2,
  },
  activeContainer: {
    borderColor: colors.input.activeBorderColor,
  },
  activeLabel: {
    color: colors.input.activeLabelColor,
  },
  icon: {
    position: 'absolute',
    right: dimensions.indent,
    top: dimensions.indent * 0.85,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  iconInPlaceholder: {
    position: 'absolute',
    paddingLeft: dimensions.indent,
    zIndex: 1,
  },
  iconLeft: {
    position: 'absolute',
    left: dimensions.indent * 0.5,
    top: dimensions.indent * 0.85,
    paddingHorizontal: dimensions.indent * 0.2,
  },
});
