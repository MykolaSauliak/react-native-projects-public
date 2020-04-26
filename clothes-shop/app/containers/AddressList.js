import {compose, withProps, withHandlers} from 'recompose';
import AddressList from '../components/AddressList';
import {withAddresses} from '../utils/enhancers';

const enhance = compose(
  withAddresses(),
  // withProps(({removeShippingAddress}) => ({
  //     onRemovePress: (item) => removeShippingAddress(item)
  // })),
  withHandlers({
    onRemovePress: ({removeShippingAddress}) => item => {
      removeShippingAddress(item);
    },
  }),
);

export default enhance(AddressList);
