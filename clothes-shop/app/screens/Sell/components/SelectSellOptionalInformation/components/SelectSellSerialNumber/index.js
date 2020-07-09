import SelectSellSerialNumber from './SelectSellSerialNumber';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../../../constants/screens';
import {withSell} from '../../../../../../utils/enhancers';
import constants from '../../../../../../constants';

const enhance = compose(
  withSell({pick: [constants.serialNumber]}),
  withState('searchText', 'setSearchText', ''),
  withHandlers({
    onPress: ({setSellProperty, navigation, dispatch}) => serialNumber => {
      setSellProperty(constants.serialNumber, serialNumber);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      // navigation.navigate(screens.SelectSellInformation);
    },
    chooseItem: ({setSellProperty, navigation}) => serialNumber => {
      setSellProperty(constants.serialNumber, serialNumber);
      // navigation.navigate(screens.SelectSellInformation);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellOptionalInformation);
    },
  }),
);

export default enhance(SelectSellSerialNumber);
