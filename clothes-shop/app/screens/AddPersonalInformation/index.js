import AddPersonalInformation from './AddPersonalInformation';
import {
  compose,
  withProps,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';
import screens from '../../constants/screens';
import constants from '../../constants';
import { withSell } from '../../utils/enhancers';

const enhance = compose(
  withSell({pick: [constants.seller]}),
  withState('loading', 'setLoading', false),
  withHandlers({
    onPress: ({navigation, dispatch}) => color => {
      dispatch(setSelectedSellColor(color));
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellInformation);
    },
    chooseItem: ({dispatch, navigation}) => color => {
      // dispatch(setSelectedSellColor(color))
      navigation.navigate(screens.SelectSeller);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.goBack();
    },
  }),
);

export default enhance(AddPersonalInformation);
