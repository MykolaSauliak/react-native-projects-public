import SelectSellOptionalInformationView from './SelectSellOptionalInformationView';
import {compose, withProps, withHandlers} from 'recompose';
import screens from '../../../../constants/screens';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';

const enhance = compose(
  withSell({pick: [constants.vintage, constants.soldWith]}),
  withProps(props => ({
    // cars : JSON.parse(props.navigation.getParam('cars',[]) || '[]'),
    // models
  })),
  withHandlers({
    onPress: ({navigation, dispatch}) => model => {
    },
  }),
);

export default enhance(SelectSellOptionalInformationView);
