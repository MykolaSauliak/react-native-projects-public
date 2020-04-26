import SelectSellMainView from './SelectSellMainView';
import {compose, withProps, withHandlers} from 'recompose';
import {withSell} from '../../../../utils/enhancers';

const enhance = compose(
  withSell(),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
  })),
  withHandlers({
    // onPress : ({navigation, dispatch}) => ({type, car_id}) => {
    //     navigation.navigate(screens.AddCar)
    // },
  }),
);

export default enhance(SelectSellMainView);
