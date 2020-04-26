import {compose} from 'recompose';
import CardList from '../components/CardList';
import {withCards} from '../utils/enhancers';

const enhance = compose(withCards());

export default enhance(CardList);
