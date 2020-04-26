import SelectSellConditionWriteView from './SelectSellConditionWriteView';
import {compose, withProps, withHandlers, withState} from 'recompose';
// import { connect } from "react-redux";
// import subcategories from '../../../mockData/subcategories'
import screens from '../../../../constants/screens';
// import {
//     setSelectedSellCondition,
// } from '../../../../features/seller/actions'
// import {
//     getSelectedSellCondition,
// } from '../../../../features/seller/selectors'
import {withSell} from '../../../../utils/enhancers';

// const mapStateToProps = (state) => ({
//     condition : getSelectedSellCondition(state),
// })

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
//     // setCondition : (text) => dispatch(setSelectedSellCondition(text)),
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
    setCondition: ({
      setSelectedSellCondition,
      navigation,
      dispatch,
    }) => text => {
      setSelectedSellCondition(text);
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

export default enhance(SelectSellConditionWriteView);
