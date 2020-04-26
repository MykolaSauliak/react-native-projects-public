import {connect} from 'react-redux';
import CarHeaderView from '../components/CarHeaderView';
import {getMyCars, getSelectedCar} from '../features/mycars/selectors';
import {compose, withState, withHandlers} from 'recompose';
import {setSelectedCar} from '../features/mycars/actions';

function mapStateToProps(state) {
  return {
    cars: getMyCars(state),
    selectedCar: getSelectedCar(state),
  };
}

const enhance = compose(
  connect(mapStateToProps),
  withState('extended', 'setExtended', false),
  withState('maxHeight', 'setMaxHeight', 0),
  withState('minHeight', 'setMinHeight', 0),
  withState('isCollapsed', 'setIsCollapsed', true),
  withHandlers({
    selectCar: ({dispatch}) => car => {
      console.log('set selected car ...', car.type);
      dispatch(setSelectedCar(car));
    },
  }),
);

export default enhance(CarHeaderView);
