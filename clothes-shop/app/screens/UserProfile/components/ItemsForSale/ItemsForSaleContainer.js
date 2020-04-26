import {compose, withState} from 'recompose';
import ItemsForSale from './ItemsForSale';

const enhance = compose(withState('loading', 'setLoading', false));

export default enhance(ItemsForSale);
