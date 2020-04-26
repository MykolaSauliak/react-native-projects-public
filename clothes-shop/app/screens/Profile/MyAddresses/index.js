import {compose, withState, withHandlers, lifecycle} from 'recompose';
import MyAddressesView from './MyAddressesView';
import {withAddresses} from '../../../utils/enhancers';

const enhance = compose(withAddresses());

export default enhance(MyAddressesView);
