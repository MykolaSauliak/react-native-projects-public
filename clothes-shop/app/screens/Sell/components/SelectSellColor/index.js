import SelectSellColorView from './SelectSellColorView';
import {compose, withProps, withHandlers, withState} from 'recompose';
// import { connect } from "react-redux";
import colors from '../../../../mockData/colors';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
// import {
//     setSelectedSellBrand,
//     setSelectedSellMaterial,
//     setSelectedSellColor,
// } from '../../../../features/seller/actions'
// import {
//     getSelectedCar,
//     getSelectedCarMake,
//     getSelectedType,
//     getSelectedModel
// } from '../../../../features/mycars/selectors'   // import { getCartitems } from '../../features/cart/selectors'

// const mapStateToProps = (state) => ({
//     selectedCarMake : getSelectedCarMake(state),
//     selectedModel : getSelectedModel(state),
// })

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
//     // chooseItem: (c) => dispatch(setSelectedSellColor(c))
// })

const enhance = compose(
  withSell(),
  // connect(mapStateToProps,mapDispatchToProps),
  withState('searchText', 'setSearchText', ''),
  withState('colors', 'setColors', colors),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
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
