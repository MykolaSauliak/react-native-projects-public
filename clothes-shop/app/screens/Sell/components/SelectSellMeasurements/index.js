import SelectSellMeasurementsView from './SelectSellMeasurementsView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import subcategories from '../../../../mockData/subcategories';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';

const enhance = compose(
  withSell(),
  // connect(mapStateToProps,mapDispatchToProps),
  withState('searchText', 'setSearchText', ''),
  withState('subcategories', 'setSubcategories', subcategories),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => category => {
      // dispatch(setSelectedSellSubcategory(category))
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellDescription);
    },
    // goBack: ({navigation}) => () => {
    //     navigation.goBack();
    // },
    // onDone: ({dispatch, navigation}) => () => {
    //     navigation.navigate(screens.SelectSellDescription);
    // },
  }),
);

export default enhance(SelectSellMeasurementsView);
