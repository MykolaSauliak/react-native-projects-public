import AddCarView from './AddCarView';
import {
  compose,
  withProps,
  withHandlers,
  withState,
  lifecycle,
} from 'recompose';
import {connect} from 'react-redux';
// import subcategories from '../../mockData/subcategories'
import screens from '../../constants/screens';
import {
  getSelectedCarMake,
  getSelectedModel,
  getSelectedType,
  getSelectedCarId,
} from '../../features/mycars/selectors';
import {
  addCar,
  setSelectedType,
  setSelectedModel,
  setSelectedCarMake,
  setSelectedCarId,
  setSelectedCar,
} from '../../features/mycars/actions';
import ShopService from '../../services';
function mapStateToProps(state) {
  return {
    selectedCarMake: getSelectedCarMake(state),
    selectedModel: getSelectedModel(state),
    selectedType: getSelectedType(state),
    selectedCarId: getSelectedCarId(state),
  };
}

const enhance = compose(
  connect(mapStateToProps),
  // withState('selectedCarMake','setSelectedCarMake', ''),
  // withState('selectedModel','setSelectedModel', null),
  withState('cars', 'setCars', []),
  withState('loading', 'setLoading', false),
  // withProps({
  //     cars :
  // }),
  withHandlers({
    addCar: ({dispatch}) => ({
      selectedCarMake,
      selectedModel,
      selectedType,
      selectedCarId,
    }) => {
      //console.log(selectedCarMake, selectedModel, selectedType);
      dispatch(
        addCar({
          carmake: selectedCarMake,
          model: selectedModel,
          type: selectedType,
          car_id: selectedType.car_id || selectedCarId,
        }),
      );
      dispatch(
        setSelectedCar({
          carmake: selectedCarMake,
          model: selectedModel,
          type: selectedType,
          car_id: selectedType.car_id || selectedCarId,
        }),
      );
      dispatch(setSelectedCarMake(null));
      dispatch(setSelectedModel(null));
      dispatch(setSelectedType(null));
      dispatch(setSelectedCarId(null));
    },
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      let cars = await Shop.getCars();
      this.props.setCars(cars);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(AddCarView);
