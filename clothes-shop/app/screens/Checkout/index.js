import {compose, withState, withHandlers, lifecycle} from 'recompose';
import CheckoutScreenView from './CheckoutScreenView';
import {withAddresses} from '../../utils/enhancers';
// import { connect } from 'react-redux';
// import {ShopService} from '../../services';

const enhance = compose(
  // connect(mapStateToProps),
  withAddresses(),
  withHandlers({
    openAudio: props => item => {
      // props.navigation.navigate(screens.PlayerScreen, {...item})
    },
  }),
  lifecycle({
    async componentDidMount() {
      // console.log('try to get orders ...')
      // const myorders = await ShopService.getMyOrders()
      // console.log('myorders length -',myorders.length)
      // this.props.setMyorders(myorders)
    },
  }),
);

export default enhance(CheckoutScreenView);
