import SelectSellerView from './SelectSellerView';
import {compose, withProps, withHandlers} from 'recompose';
import screens from '../../../../constants/screens';
import {withSell, withAddresses} from '../../../../utils/enhancers';
import constants from '../../../../constants';

const enhance = compose(
  withSell({pick: [constants.shipping_country, constants.shipping_country_code, constants.seller]}),
  withAddresses(),
  withHandlers({
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellMainSteps);
    },
    goToPersonalContact: ({navigation}) => () => {
      navigation.navigate(screens.AddPersonalInformation);
    },
  }),
);

export default enhance(SelectSellerView);
