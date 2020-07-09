import SelectSellOrigin from './SelectSellOrigin';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../../../constants/screens';
import {withSell} from '../../../../../../utils/enhancers';
import constants from '../../../../../../constants';

const enhance = compose(
  withSell({pick: [constants.origin]}),
  withHandlers({
    onPress: ({setSellProperty, navigation, dispatch}) => origin => {
      setSellProperty(origin);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      // navigation.navigate(screens.SelectSellInformation);
    },
    chooseItem: ({setSellProperty, navigation}) => origin => {
      setSellProperty(constants.origin, origin);
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

export default enhance(SelectSellOrigin);
