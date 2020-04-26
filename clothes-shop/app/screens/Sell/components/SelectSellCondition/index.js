import SelectSellConditionView from './SelectSellConditionView';
import {compose, withProps, withHandlers} from 'recompose';
// import { connect } from "react-redux";
// import models from '../../../../mockData/models'
import {withSell} from '../../../../utils/enhancers';
import screens from '../../../../constants/screens';
// import {  setSelectedModel } from '../../../../features/mycars/actions'
// import {
//     getSelectedSellCategory,
//     getSelectedSellSubcategory,
//     getSelectedSellType,
//     getSelectedSellSubtype,
//     getSelectedSellBrand,
//     getSelectedSellMaterial,
//     getSelectedSellColor,
//     getSelectedSellPrinted,
//     getSelectedSellPhotos,
//     getSelectedSellDescription,
//     getSelectedSellMeasurements,
//     getSelectedSellCondition,
//     getSelectedSellPrice,
//     getSeller
// } from '../../../../features/seller/selectors'   // import { getCartitems } from '../../features/cart/selectors'

// const mapStateToProps = (state) => ({
//     material : getSelectedSellMaterial(state),
//     category : getSelectedSellCategory(state),
//     subcategory : getSelectedSellSubcategory(state),
//     color : getSelectedSellColor(state),
//     printed : getSelectedSellPrinted(state),
//     photos : getSelectedSellPhotos(state),
//     description : getSelectedSellDescription(state),
//     measurements : getSelectedSellMeasurements(state),
//     condition : getSelectedSellCondition(state),
//     price : getSelectedSellPrice(state),
//     seller : getSeller(state),
//     // selectedModel : getSelectedModel(state),
// })

const enhance = compose(
  withSell(),
  // connect(mapStateToProps),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
    // models
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => model => {
      // dispatch(setSelectedModel(model))
      // //console.log('model',model)
      // navigation.navigate(screens.SelectType, {
      //     model,
      //     cars : navigation.getParam('cars','[]')
      // })
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    goToPriceChoose: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellPrice);
    },
    goToConditionChoose: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellConditionWrite);
    },
  }),
);

export default enhance(SelectSellConditionView);
