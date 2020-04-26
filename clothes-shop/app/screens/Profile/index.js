import ProfileView from './ProfileView';
import {
  compose,
  withProps,
  withHandlers,
  withState,
  lifecycle,
} from 'recompose';
import {AuthService} from '../../services';
import {withAuth} from '../../utils/enhancers';

const enhance = compose(

  withAuth(),
  withState('checked', 'setChecked', false),
  withState('locale', 'setLocale', null),
  withHandlers({
    onLogout: props => async () => {
      await AuthService.logout();
    },
  }),
);

export default enhance(ProfileView);
