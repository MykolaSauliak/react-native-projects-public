import SelectSellPriceView from './SelectSellPriceView';
import {compose, withProps, withHandlers, withState} from 'recompose';
// import { connect } from "react-redux";
// import subcategories from '../../mockData/subcategories'
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
// import {
//     setSelectedSellPrice,
// } from '../../../../features/seller/actions'
// import {
//     getSelectedSellDescription,
// } from '../../../../features/seller/selectors'

// const mapStateToProps = (state) => ({
//     description : getSelectedSellDescription(state),
// })

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
//     // setSellDescription : (text) => dispatch(setSelectedSellDescription(text)),
//     setSellPrice : ({currency, price}) => dispatch(setSelectedSellPrice({currency, price})),
// })

const enhance = compose(
  withSell(),
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
