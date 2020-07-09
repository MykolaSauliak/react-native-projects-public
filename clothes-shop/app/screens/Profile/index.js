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
import codePush from "react-native-code-push";

const enhance = compose(
  withAuth(),
  withState('checked', 'setChecked', false),
  withState('locale', 'setLocale', null),
  withState('version', 'setVersion', ""),
  withHandlers({
    onLogout: props => async () => {  
      await AuthService.logout();
    },
  }),
  lifecycle({
    componentDidMount() {

      codePush.getUpdateMetadata()
          .then( metadata => {
              if(metadata){
                this.props.setVersion(metadata.appVersion + " " + metadata.label)
                  // this.setState({label: metadata.label, version: metadata.appVersion, description: metadata.description});
              }
          })
    
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
