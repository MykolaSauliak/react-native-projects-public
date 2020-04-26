import SelectSellPrintedView from './SelectSellPrintedView';
import {compose, withProps, withHandlers, withState} from 'recompose';
// import { connec/t } from "react-redux";
import printed from '../../../../mockData/printed';
import screens from '../../../../constants/screens';
// import {
//     setSelectedSellPrinted,
// } from '../../../../features/seller/actions'
// import {
//     getSelectedCar,
//     getSelectedCarMake,
//     getSelectedType,
//     getSelectedModel
// } from '../../../../features/mycars/selectors'   // import { getCartitems } from '../../features/cart/selectors'
import {withSell} from '../../../../utils/enhancers';

// const mapStateToProps = (state) => ({
//     selectedCarMake : getSelectedCarMake(state),
//     selectedModel : getSelectedModel(state),
// })

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
// })

const enhance = compose(
  withSell(),
  // connect(mapStateToProps,mapDispatchToProps),
  withState('searchText', 'setSearchText', ''),
  withState('printed', 'setPrinted', printed),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
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
