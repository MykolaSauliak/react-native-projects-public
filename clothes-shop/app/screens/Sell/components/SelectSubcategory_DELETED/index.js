import SelectModelView from './SelectModelView';
import {compose, withProps, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import models from '../../mockData/models';
import screens from '../../../../constants/screens';
import {setSelectedModel} from '../../../../features/mycars/actions';
import {
  getSelectedCar,
  getSelectedCarMake,
  getSelectedType,
  getSelectedModel,
} from '../../../../features/mycars/selectors'; // import { getCartitems } from '../../features/cart/selectors'

const mapStateToProps = state => ({
  selectedCarMake: getSelectedCarMake(state),
});

const enhance = compose(
  connect(mapStateToProps),
  withProps(props => ({
    cars: JSON.parse(props.navigation.getParam('cars', []) || '[]'),
    // models
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => model => {
      dispatch(setSelectedModel(model));
      // //console.log('model',model)
      navigation.navigate(screens.SelectType, {
        model,
        cars: navigation.getParam('cars', '[]'),
      });
    },
  }),
);

export default enhance(SelectModelView);
