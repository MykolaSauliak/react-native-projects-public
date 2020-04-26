import {compose, lifecycle, withState, withHandlers} from 'recompose';
import {withNotifications} from '../../../../utils/enhancers';
import FilmNotificationsSettings from './FilmNotificationsSettings';
import {NotifService} from '../../../../services';
import constants from '../../constants';

const enhance = compose(
  withNotifications({listName: constants.films}),
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
      // await  NotifService.init()
      let hasPermission = await NotifService.hasPermission();
      console.log('hasPermission', hasPermission);
      this.props.setHasPermission(hasPermission);
    },
  }),
);

export default enhance(FilmNotificationsSettings);
