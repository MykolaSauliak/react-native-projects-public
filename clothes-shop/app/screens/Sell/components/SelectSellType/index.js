import SelectSellTypeView from './SelectSellTypeView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import types from '../../../../mockData/types';
import subtypes from '../../../../mockData/subtypes';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';

const enhance = compose(
  withSell(),
  withState('types', 'setTypes', types),
  withState('subtypes', 'setSubtypes', subtypes),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    onItemPress: ({
      sellProduct,
      navigation,
      setSelectedSellType,
      setSelectedSellSubtype,
      dispatch,
    }) => ({type, subtype}) => {
      console.log('type, subtype', type, subtype);
      console.log('sellProduct', sellProduct);
      setSelectedSellType(type);
      setSelectedSellSubtype(subtype);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellBrand);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
  }),
);

export default enhance(SelectSellTypeView);
