import SelectSellVintage from './SelectSellVintage';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../../../constants/screens';
import {withSell} from '../../../../../../utils/enhancers';
import constants from '../../../../../../constants';

const enhance = compose(
  withSell({pick: [constants.vintage]}),
  withState('searchText', 'setSearchText', ''),
  withHandlers({
    onPress: ({setSellProperty, navigation, dispatch}) => vintage => {
      setSellProperty(constants.vintage, vintage);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      // navigation.navigate(screens.SelectSellOptionalInformation);
    },
    chooseItem: ({setSelectedSellColor, navigation}) => color => {
      setSelectSellP(color);
      navigation.navigate(screens.SelectSellOptionalInformation);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellOptionalInformation);
    },
  }),
);

export default enhance(SelectSellVintage);
