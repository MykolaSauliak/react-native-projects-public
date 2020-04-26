import {compose, lifecycle, withState, withHandlers} from 'recompose';
import {withNotifications} from '../../utils/enhancers';
import Nofications from './Notifications';
import {NotifService} from '../../services';
import notifications from '../../mockData/notifications';

const enhance = compose(
  withNotifications(),
  // withState('notifications','setNotifications',notifications),
  withState('hasPermission', 'setHasPermission', true),
  withHandlers({
    requestPermission: () => async () => {
      let hasPermission = await NotifService.requestPermission();
      console.log('hasPermission', hasPermission);
      this.props.setHasPermission(hasPermission);
    },
  }),
  lifecycle({
    async componentDidMount() {
      // this.props.resetMotifications()
      let hasPermission = await NotifService.hasPermission();
      console.log('hasPermission', hasPermission);
      this.props.setHasPermission(hasPermission);
    },
  }),
);

export default enhance(Nofications);
