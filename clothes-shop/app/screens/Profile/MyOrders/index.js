import {compose, withState, withHandlers, lifecycle} from 'recompose';
import MyOrdersView from './MyOrdersView';
// import { getSounds } from '../../features/sounds/selectors';
import {connect} from 'react-redux';
import screens from '../../../constants/screens';
import {ShopService} from '../../../services';
import {withReduxLoading, withStateLoading} from '../../../utils/enhancers';

const enhance = compose(
  withStateLoading(),
  withState('orders', 'setMyorders', []),
  withHandlers({
    openAudio: props => item => {
      // props.navigation.navigate(screens.PlayerScreen, {...item})
    },
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      const {count, items: orders} = await ShopService.getMyOrders();
      this.props.setMyorders(orders);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(MyOrdersView);
