import SelectSellPriceView from './SelectSellPriceView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';

const enhance = compose(
  withSell({pick: [constants.price]}),
  // connect(mapStateToProps,mapDispatchToProps),
  withState('searchText', 'setSearchText', ''),
  // withState('subcategories','setSubcategories',subcategories),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => category => {
      // dispatch(setSelectedSellSubcategory(category))
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
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

export default enhance(SelectSellPriceView);
