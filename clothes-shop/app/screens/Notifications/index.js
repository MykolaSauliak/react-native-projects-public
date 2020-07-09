import {compose, lifecycle, withState, withHandlers} from 'recompose';
import {withNotifications} from '../../utils/enhancers';
import Nofications from './Notifications';
import {NotifService, ShopService} from '../../services';
import notifications from '../../mockData/notifications';

const enhance = compose(
  withNotifications(),
  // withState('notifications','setNotifications',notifications),
  withState('hasPermission', 'setHasPermission', true),
  withState('refreshing', 'setRefreshing', false),
  withHandlers({
    requestPermission: () => async () => {
      let hasPermission = await NotifService.requestPermission();
      console.log('hasPermission', hasPermission);
      setHasPermission(hasPermission);
    },
    fetchMore: ({setRefreshing,hasPermission,addNotifications}) => async () => {
      setRefreshing(true)
      if(hasPermission){
        let {notifications, successful} = await ShopService.getUserNotifications()
        if(successful){
          console.log('notifications',notifications)
          addNotifications(notifications)
        }
      }else{
        console.log('user have no access to receive notifications')
      }
      setRefreshing(false)
    },
  }),
  lifecycle({
    async componentDidMount() {
      // this.props.resetMotifications()
      let hasPermission = await NotifService.hasPermission();
      console.log('hasPermission', hasPermission);
      if(hasPermission){
        let {notifications, successful} = await ShopService.getUserNotifications()
        if(successful){
          // console.log('notifications',notifications.length)
          this.props.addNotifications(notifications)
        }
      }else{
        console.log('user have no access to receive notifications')
      }
      this.props.setHasPermission(hasPermission);
    }, 
  }),
);

export default enhance(Nofications);
