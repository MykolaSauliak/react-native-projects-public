import {compose, withState, withHandlers, lifecycle} from 'recompose';
import PriceReductionAlert from './PriceReductionAlert';
import {withNotifications} from '../../../../../utils/enhancers';
import {ShopService} from '../../../../../services';

const enhance = compose(
  withNotifications(),
  withState('items', 'setItems', []),
  // withHandlers({
  //   openAudio: props => item => {
  //     // props.navigation.navigate(screens.PlayerScreen, {...item})
  //   },
  // }),
  lifecycle({
    async componentDidMount() {
      console.log('this.props.price_reduce_ids', this.props.price_reduce_ids);
      let items = await ShopService.getGoodsById(this.props.price_reduce_ids);
      console.log('items', items);

      this.props.setItems(items);
    },
  }),
);

export default enhance(PriceReductionAlert);
