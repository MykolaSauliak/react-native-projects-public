import SelectSellProofOfOrigin from './SelectSellProofOfOrigin';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../../../constants/screens';
import {withSell} from '../../../../../../utils/enhancers';
import constants from '../../../../../../constants';

const enhance = compose(
  withSell({pick: [constants.proofOfOrigin]}),
  withState('searchText', 'setSearchText', ''),
  withHandlers({
    onPress: ({setSellProperty, navigation, dispatch}) => proofOfOriginImage => {
      setSellProperty(constants.proofOfOrigin, proofOfOriginImage);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      // navigation.navigate(screens.SelectSellInformation);
    },
    chooseItem: ({setSellProperty, navigation}) => image => {
      setSellProperty(constants.proofOfOrigin, image);
      // navigation.navigate(screens.SelectSellOptionalInformation);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellOptionalInformation);
    },
  }),
);

export default enhance(SelectSellProofOfOrigin);
