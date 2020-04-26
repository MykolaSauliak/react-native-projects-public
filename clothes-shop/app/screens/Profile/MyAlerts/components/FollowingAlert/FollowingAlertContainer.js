import {compose, withState, withHandlers, lifecycle} from 'recompose';
import FollowingAlert from './FollowingAlert';
import {withFollowing} from '../../../../../utils/enhancers';
// import screens from '../../constants/screens';
// import {ShopService} from '../../services';

const enhance = compose(
  withFollowing(),
  // lifecycle({
  // async componentDidMount() {
  //   console.log('this.props.price_reduce_ids',this.props.price_reduce_ids)
  //   let items = await ShopService.getUsers(this.props.price_reduce_ids)
  //   console.log('items',items)

  //   this.props.setItems(items)
  // },
  // }),
  // connect(mapStateToProps),
  // withState('myorders', 'setMyorders', []),
);

export default enhance(FollowingAlert);
