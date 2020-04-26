import SelectSellDescriptionWriteView from './SelectSellDescriptionWriteView';
import {compose, withProps, withHandlers, withState} from 'recompose';
// import { connect } from "react-redux";
// import subcategories from '../../../../mockData/subcategories'
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
// import {
//     setSelectedSellDescription,
// } from '../../../../features/seller/actions'
// import {
//     getSelectedSellDescription,
// } from '../../../../features/seller/selectors'

// const mapStateToProps = (state) => ({
//     description : getSelectedSellDescription(state),
// })

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
//     setSellDescription : (text) => dispatch(setSelectedSellDescription(text)),
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
    onPress: ({navigation, setSelectedSellSubcategory}) => category => {
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
      navigation.navigate(screens.SelectSellDescription);
    },
  }),
);

export default enhance(SelectSellDescriptionWriteView);
