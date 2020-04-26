import {StyleSheet} from 'react-native';
import {dimensions, colors} from '../../styles';

export default StyleSheet.create({
  logoImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  logoImageBackgroundMedium: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  logoImageBackgroundSmall: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
  },
  logoImageBackgroundLarge: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  logoBackground: {
    resizeMode: 'cover',
  },
  logoBackgroundMedium: {
    resizeMode: 'cover',
    borderRadius: 70 / 2,
  },
  logoBackgroundSmall: {
    resizeMode: 'cover',
    borderRadius: 38 / 2,
  },
  logoBackgroundLarge: {
    resizeMode: 'cover',
    borderRadius: 90 / 2,
  },
  wrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  },
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: colors.button.backgroundColor,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: dimensions.indent * 0.4,
    paddingBottom: dimensions.indent * 0.4,
    padding: dimensions.indent * 0.6,
    width: 85,
    justifyContent: 'center',
  },
  view: {
    borderColor: colors.button.borderColor,
    borderWidth: 1,
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    zIndex: 1,
  },
  avatarPlaceholderContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
