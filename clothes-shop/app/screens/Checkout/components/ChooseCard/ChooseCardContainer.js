import {compose} from 'recompose';
import ChooseCard from './ChooseCard';
import {withCards} from '../../../../utils/enhancers';

const enhance = compose(withCards());

export default enhance(ChooseCard);
