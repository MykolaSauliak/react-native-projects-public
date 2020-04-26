import SelectSellerView from './SelectSellerView';
import {compose, withProps, withHandlers} from 'recompose';
import screens from '../../../../constants/screens';
import {withSell, withAddresses} from '../../../../utils/enhancers';


const enhance = compose(
  withSell(),
  withAddresses(),
  withHandlers({
    goBack: ({navigation}) => () => {
      navigation.goBack();
    },
    onDone: ({navigation}) => () => {
      navigation.navigate(screens.SelectSellMainSteps);
    },
    goToPersonalContact: ({navigation}) => () => {
      navigation.navigate(screens.AddShippingAddressScreen);
    },
  }),
);

export default enhance(SelectSellerView);
