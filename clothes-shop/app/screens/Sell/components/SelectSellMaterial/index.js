import SelectSellMaterialView from './SelectSellMaterialView';
import {compose, withProps, withHandlers, withState} from 'recompose';
// import { connect } from "react-redux";
import materials from '../../../../mockData/materials';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
// import {
//     setSelectedSellBrand,
//     setSelectedSellMaterial,
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
//     // chooseMaterial: (m) => dispatch(setSelectedSellMaterial(m))
// })

const enhance = compose(
  // connect(mapStateToProps,mapDispatchToProps),
  withSell(),
  withState('searchText', 'setSearchText', ''),
  withState('materials', 'setMaterials', materials),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    onPress: ({setSelectedSellBrand, navigation, dispatch}) => ({brand}) => {
      setSelectedSellBrand(brand);
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellMainSteps);
    },
    chooseMaterial: ({setSelectedSellMaterial, navigation, dispatch}) => m => {
      setSelectedSellMaterial(m);
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

export default enhance(SelectSellMaterialView);
