import SelectSellSubcategoryView from './SelectSellSubcategoryView';
import {compose, withProps, withHandlers, withState} from 'recompose';
// import { connect } from "react-redux";
import subcategories from '../../../../mockData/subcategories';
import screens from '../../../../constants/screens';
// import {
//     setSelectedSellSubcategory,
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
  withState('subcategories', 'setSubcategories', subcategories),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    onPress: ({
      setSelectedSellSubcategory,
      navigation,
      dispatch,
    }) => category => {
      setSelectedSellSubcategory(category);
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

export default enhance(SelectSellSubcategoryView);
