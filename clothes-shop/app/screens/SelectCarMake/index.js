import SelectCarMakeView from './SelectCarMakeView';
import {compose, withProps, withHandlers} from 'recompose';
import {connect} from 'react-redux';
// import carmakes from '../../mockData/carmakes'
import screens from '../../constants/screens';
import {setSelectedCarMake} from '../../features/mycars/actions';
import {
  getSelectedCar,
  getSelectedCarMake,
  getSelectedType,
  getSelectedModel,
} from '../../features/mycars/selectors';
// import { getCartitems } from '../../features/cart/selectors'

const mapStateToProps = state => ({
  // wishlist : getWishList(state),
});

const enhance = compose(
  connect(mapStateToProps),
  withProps(props => ({
    // carmakes : props.navigation.getParam('carmakes',[]),
    cars: JSON.parse(props.navigation.getParam('cars', []) || '[]'),
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => carmake => {
      dispatch(setSelectedCarMake(carmake));
      navigation.navigate(screens.SelectModel, {
        carmake: JSON.stringify(carmake),
        cars: navigation.getParam('cars', '[]'),
      });
    },
  }),
);

export default enhance(SelectCarMakeView);
