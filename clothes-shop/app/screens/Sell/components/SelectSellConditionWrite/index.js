import SelectSellConditionWriteView from './SelectSellConditionWriteView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';

const enhance = compose(
  withSell({pick: [constants.condition]}),
  withState('searchText', 'setSearchText', ''),
  withHandlers({
    onPress: ({
      setSelectedSellSubcategory,
      navigation,
      dispatch,
    }) => category => {
      setSelectedSellSubcategory(category);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellInformation);
    },
    setCondition: ({
      setSelectedSellCondition,
      navigation,
      dispatch,
    }) => text => {
      setSelectedSellCondition(text);
      navigation.navigate(screens.SelectSellCondition);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellCondition);
    },
  }),
);

export default enhance(SelectSellConditionWriteView);
