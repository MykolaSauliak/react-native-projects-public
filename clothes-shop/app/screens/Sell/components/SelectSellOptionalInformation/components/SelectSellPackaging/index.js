import SelectSellPackaging from './SelectSellPackaging';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../../../constants/screens';
import {withSell} from '../../../../../../utils/enhancers';
import constants from '../../../../../../constants';

const enhance = compose(
  withSell({pick: [constants.soldWith]}),
  withState('searchText', 'setSearchText', ''),
  withHandlers({
    // onPress: ({setSellProperty, navigation, dispatch}) => item => {
    //   setSellProperty(constants.packaging, item);
    //   // dispatch(setSelectedCarId(car_id))
    //   // console.log('type',type)
    //   // console.log('car_id',car_id)
    //   // navigation.navigate(screens.SelectSellInformation);
    // },
    // chooseItem: ({setSelectedSellColor, navigation}) => color => {
    //   setSellProperty(constants.packaging, item);
    //   // navigation.navigate(screens.SelectSellInformation);
    // },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellOptionalInformation);
    },
  }),
);

export default enhance(SelectSellPackaging);
