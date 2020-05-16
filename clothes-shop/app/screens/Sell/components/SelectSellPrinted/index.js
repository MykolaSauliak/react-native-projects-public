import SelectSellPrintedView from './SelectSellPrintedView';
import {compose, withProps, withHandlers, withState} from 'recompose';
// import { connec/t } from "react-redux";
import printed from '../../../../mockData/printed';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';

const enhance = compose(
  withSell({pick: [constants.printed]}),
  withState('searchText', 'setSearchText', ''),
  withState('printed', 'setPrinted', printed),
  withHandlers({
    onPress: ({setSelectedSellPrinted, navigation, dispatch}) => printed => {
      setSelectedSellPrinted(printed);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellInformation);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellInformation);
    },
  }),
);

export default enhance(SelectSellPrintedView);
