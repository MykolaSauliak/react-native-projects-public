import SelectSellColorView from './SelectSellColorView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import colors from '../../../../mockData/colors';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';

const enhance = compose(
  withSell({pick: [constants.color]}),
  withState('searchText', 'setSearchText', ''),
  withState('colors', 'setColors', colors),
  withHandlers({
    onPress: ({setSelectedSellColor, navigation, dispatch}) => color => {
      setSelectedSellColor(color);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellInformation);
    },
    chooseItem: ({setSelectedSellColor, navigation}) => color => {
      setSelectedSellColor(color);
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

export default enhance(SelectSellColorView);
