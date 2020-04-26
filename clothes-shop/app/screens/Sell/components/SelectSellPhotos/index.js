import SelectSellPhotosView from './SelectSellPhotosView';
import {compose, withProps, withHandlers, withState} from 'recompose';
import {connect} from 'react-redux';
import printed from '../../../../mockData/printed';
import screens from '../../../../constants/screens';
import {
  setSelectedSellPrinted,
  setSelectedSell1Photo,
  setSelectedSell2Photo,
  setSelectedSell3Photo,
  setSelectedSell4Photo,
  setSelectedSell5Photo,
  addToOtherSellPhotos,
  removeFromOtherSellPhtos,
} from '../../../../features/seller/actions';
import {
  getSelectedSellPhotos,
  getSelectedSell1Photo,
  getSelectedSell2Photo,
  getSelectedSell3Photo,
  getSelectedSell4Photo,
  getSelectedSell5Photo,
} from '../../../../features/seller/selectors';
import {
  getSelectedCar,
  getSelectedCarMake,
  getSelectedType,
  getSelectedModel,
} from '../../../../features/mycars/selectors'; // import { getCartitems } from '../../features/cart/selectors'

const mapStateToProps = state => ({
  image1: getSelectedSell1Photo(state),
  image2: getSelectedSell2Photo(state),
  image3: getSelectedSell3Photo(state),
  image4: getSelectedSell4Photo(state),
  image5: getSelectedSell5Photo(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  set1Image: image => dispatch(setSelectedSell1Photo(image)),
  set2Image: image => dispatch(setSelectedSell2Photo(image)),
  set3Image: image => dispatch(setSelectedSell3Photo(image)),
  set4Image: image => dispatch(setSelectedSell4Photo(image)),
  set5Image: image => dispatch(setSelectedSell5Photo(image)),
  addImage: image => dispatch(addToOtherSellPhotos(image)),
  removeImage: image => dispatch(removeFromOtherSellPhtos(image)),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('searchText', 'setSearchText', ''),
  withState('printed', 'setPrinted', printed),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => printed => {
      dispatch(setSelectedSellPrinted(printed));
      // dispatch(setSelectedCarId(car_id))
      // console.log('type',type)
      // console.log('car_id',car_id)
      navigation.navigate(screens.SelectSellMainSteps);
    },
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellMainSteps);
    },
  }),
);

export default enhance(SelectSellPhotosView);
