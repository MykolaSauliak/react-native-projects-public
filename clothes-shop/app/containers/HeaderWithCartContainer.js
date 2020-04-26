import HeaderWithCart from '../components/HeaderWithCart';
import {withCart} from '../utils/enhancers';

export default withCart()(HeaderWithCart);
