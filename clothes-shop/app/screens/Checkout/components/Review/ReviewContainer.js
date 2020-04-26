import {compose} from 'recompose';
import Review from './Review';
import {withCart, withWishlist} from '../../../../utils/enhancers';

const enhance = compose(
  withCart(),
  withWishlist(),
);

export default enhance(Review);
