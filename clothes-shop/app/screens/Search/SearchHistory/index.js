import {compose, withState, withHandlers, withProps} from 'recompose';
import SearchHistory from './SearchHistory';
import {withSearch} from '../../../utils/enhancers';
import constants from '../../../constants';

const enhance = compose(withSearch(constants.clothes));

export default enhance(SearchHistory);
