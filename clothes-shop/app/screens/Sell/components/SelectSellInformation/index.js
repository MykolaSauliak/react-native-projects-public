import SelectSellInformationView from './SelectSellInformationView';
import {compose, withProps, withHandlers} from 'recompose';
import {withSell} from '../../../../utils/enhancers';

const enhance = compose(
  withSell(),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
    // models
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => model => {
      dispatch(setSelectedModel(model));
      // //console.log('model',model)
      // navigation.navigate(screens.SelectType, {
      //     model,
      //     cars : navigation.getParam('cars','[]')
      // })
    },
    // goBack: ({navigation}) => () => {
    //     navigation.goBack();
    // },
    // goToSubcategoryChoose : ({navigation}) => () => {
    //     navigation.navigate(screens.SelectSellSubcategory)
    // },
    // goToMaterialChoose : ({navigation}) => () => {
    //     navigation.navigate(screens.SelectSellMaterial)
    // },
    // goToColorChoose : ({navigation}) => () => {
    //     navigation.navigate(screens.SelectSellColor)
    // },
    // goToPrintChoose : ({navigation}) => () => {
    //     navigation.navigate(screens.SelectSellPrinted)
    // },
  }),
);

export default enhance(SelectSellInformationView);
