import ProfileView from './ProfileView';
import {
  compose,
  withProps,
  withHandlers,
  withState,
  lifecycle,
} from 'recompose';
import {AuthService, NavigationService} from '../../services';
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
  lifecycle({
    componentDidMount() {
      // if(this.props.navigation){
      //     this.didBlurSubscription = this.props.navigation.addListener(
      //       'willFocus',
      //       payload => {
      //         console.log('profile screen will focus')
      //         if(!this.props.isSignedIn){
      //           try{
      //             NavigationService.navigateToAuth()
      //           }catch(err){

      //           }
      //         }
      //       }
      //   );
      // }
    },
    componentWillUnmount() {
      // if(this.didBlurSubscription){
      //   this.didBlurSubscription.remove();
      // }
    }
  })
);

export default enhance(ProfileView);
