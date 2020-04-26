import {
  compose,
  lifecycle,
  withState,
  withHandlers,
  withProps,
} from 'recompose';
// import {
//     withNotifications
// } from '../../../../utils/enhancers'
import NotificationInfo from './NotificationInfo';
// import {
//     NotifService
// } from '../../../../services'
// import constants from '../../constants'

const enhance = compose(
  // withNotifications({listName : constants.science}),
  // withState('hasPermission','setHasPermission',true),
  withProps(({navigation}) => ({
    title: navigation.getParam('title', ''),
    image: navigation.getParam('image', ''),
    description: navigation.getParam('description', ''),
    subtitle: navigation.getParam('subtitle', ''),
  })),
  // withHandlers({
  //     requestPermission: () => async () => {
  //         let hasPermission = await NotifService.requestPermission()
  //         console.log('hasPermission',hasPermission)
  //         this.props.setHasPermission(hasPermission)
  //     }
  // }),
  // lifecycle({
  //     async componentDidMount() {
  //         await  NotifService.init()
  //         let hasPermission = await NotifService.hasPermission()
  //         console.log('hasPermission',hasPermission)
  //         this.props.setHasPermission(hasPermission)
  //     }
  // })
);

export default enhance(NotificationInfo);
