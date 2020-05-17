import {compose, withState, withHandlers, lifecycle} from 'recompose';
import ItemLookingFor from './ItemLookingFor';
import {withAlerts} from '../../../../../utils/enhancers';

const enhance = compose(
    withAlerts()
);

export default enhance(ItemLookingFor);
