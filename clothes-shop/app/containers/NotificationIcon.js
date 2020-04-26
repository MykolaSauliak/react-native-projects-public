import NotificationIcon from '../components/NotificationIcon';
import {compose} from 'recompose';
import {withNotifications} from '../utils/enhancers';

const enhance = compose(withNotifications());

export default enhance(NotificationIcon);
