import {compose, withState, withHandlers, lifecycle} from 'recompose';
import MyAlerts from './MyAlerts';
// import { getSounds } from '../../features/sounds/selectors';
// import {connect} from 'react-redux';
// import screens from '../../constants/screens';
// import {ShopService} from '../../services';
// import Auth from '../../api/Auth';

// const mapStateToProps = state => ({
//   // sounds:  getSounds(state),
// });

// const mapDispatchToProps = {};

const enhance = compose();
// connect(mapStateToProps),
// withState('myorders', 'setMyorders', []),
// withHandlers({
//   openAudio: props => item => {
//     // props.navigation.navigate(screens.PlayerScreen, {...item})
//   },
// }),
// lifecycle({
//   async componentDidMount() {
//     // const email = Auth.getEmail();
//     // if(email){
//     // console.log('try to get orders ...');
//     try{
//       const {count, items : myorders} = await ShopService.getMyOrders();
//       // console.log('myorders length -', myorders.length);
//       this.props.setMyorders(myorders);
//     }catch(err){

//     }

//     // }
//   },
// }),

export default enhance(MyAlerts);
