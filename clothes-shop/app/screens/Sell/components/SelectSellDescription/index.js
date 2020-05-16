import SelectSellDescriptionView from './SelectSellDescriptionView';
import {compose, withProps, withHandlers} from 'recompose';
// import { connect } from "react-redux";
// import models from '../../../mockData/models'
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';
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
  withSell({pick: [constants.description, constants.measurements]}),
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
    goToDescriptionWrite: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellDescriptionWrite);
    },
    goToMeasurementsChoose: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellMeasurements);
    },
  }),
);

export default enhance(SelectSellDescriptionView);
