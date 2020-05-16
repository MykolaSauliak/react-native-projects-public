import SelectSellDescriptionWriteView from './SelectSellDescriptionWriteView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';

const enhance = compose(
  withSell({pick: [constants.description]}),
  withState('searchText', 'setSearchText', ''),
  withHandlers({
    onPress: ({navigation, setSelectedSellSubcategory}) => category => {
      setSelectedSellSubcategory(category);
      navigation.navigate(screens.SelectSellInformation);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellDescription);
    },
  }),
);

export default enhance(SelectSellDescriptionWriteView);
