import {Text} from 'react-native';
import {compose, setPropTypes, withProps} from 'recompose';
import {fontSizes, colors} from '../../styles';

const getFontFamily = (light, medium, bold) => {
  // let fontFamily = 'OpenSans-Regular';

  // if (light) {
  //   fontFamily = 'OpenSans-Light';
  // }
  // if (medium) {
  //   fontFamily = 'OpenSans-SemiBold';
  // }
  // if (bold) {
  //   fontFamily = 'OpenSans-Bold';
  // }

  return {fontFamily: "Arial"};
};

const getFontSize = (
  xxbigSize,
  xbigSize,
  bigSize,
  xlargeSize,
  largeSize,
  xxmediumSize,
  xmediumSize,
  mediumSize,
  xxsmallSize,
  smallSize,
  xsmallSize,
  bold = 'bold',
) => {
  let fontSize = fontSizes.medium;

  if (xxbigSize) {
    fontSize = fontSizes.xxbig;
  }
  if (xbigSize) {
    fontSize = fontSizes.xbig;
  }
  if (bigSize) {
    fontSize = fontSizes.big;
  }
  if (xlargeSize) {
    fontSize = fontSizes.xlarge;
  }
  if (largeSize) {
    fontSize = fontSizes.large;
  }
  if (xxmediumSize) {
    fontSize = fontSizes.xxmedium;
  }
  if (xmediumSize) {
    fontSize = fontSizes.xmedium;
  }
  if (mediumSize) {
    fontSize = fontSizes.medium;
  }
  if (xxsmallSize) {
    fontSize = fontSizes.xxsmall;
  }
  if (xsmallSize) {
    fontSize = fontSizes.xsmall;
  }
  if (smallSize) {
    fontSize = fontSizes.small;
  }

  return {fontSize};
};

const getFontColor = (black, gray, white, orange, red, lightGray, green) => {
  let color = colors.text.black;

  if (black) {
    color = colors.text.black;
  }
  if (gray) {
    color = colors.text.gray;
  }
  if (white) {
    color = colors.text.white;
  }
  if (orange) {
    color = colors.text.orange;
  }
  if (red) {
    color = colors.text.red;
  }
  if (lightGray) {
    color = colors.text.lightGray;
  }
  if (green) {
    color = colors.text.green;
  }

  return {color};
};

const enhance = compose(
  setPropTypes(Text.propTypes),
  withProps(props => ({
    style: [
      getFontFamily(props.light, props.medium, props.bold),
      getFontSize(
        props.xxbigSize,
        props.xbigSize,
        props.bigSize,
        props.xlargeSize,
        props.largeSize,
        props.xxmediumSize,
        props.xmediumSize,
        props.mediumSize,
        props.xxsmallSize,
        props.xsmallSize,
        props.smallSize,
      ),
      getFontColor(
        props.black,
        props.gray,
        props.white,
        props.orange,
        props.red,
        props.lightGray,
        props.green,
      ),
      {fontWeight:bold? 'bold' :''},
      props.style,
    ],
  })),
);

export default enhance(Text);
