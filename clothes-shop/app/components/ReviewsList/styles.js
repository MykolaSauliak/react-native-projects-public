import {StyleSheet} from 'react-native';
import {dimensions, colors} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    minHeight: dimensions.indent * 10,
  },
  userInfoContainer: {
    marginTop: 0,
    marginBottom: 0,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: colors.ratingTable.borderBottomColor,
  },
  flatListContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
