import SelectSellInformationView from './SelectSellInformationView';
import {compose, withProps, withHandlers} from 'recompose';
import {withSell} from '../../../../utils/enhancers';
import constants from '../../../../constants';

const enhance = compose(
  withSell({pick: [constants.material, constants.color, constants.printed]}),
  withHandlers({
    onPress: ({navigation, dispatch}) => model => {
      dispatch(setSelectedModel(model));
      // //console.log('model',model)
      // navigation.navigate(screens.SelectType, {
      //     model,
      //     cars : navigation.getParam('cars','[]')
      // })
    },
  }),
);

export default enhance(SelectSellInformationView);
