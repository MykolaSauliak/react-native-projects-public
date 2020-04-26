import {compose, withState, withHandlers, lifecycle} from 'recompose';
import MyItems from './MyItems';
// import { getSounds } from '../../features/sounds/selectors';
import {ShopService} from '../../../services';
import {withReduxLoading, withStateLoading} from '../../../utils/enhancers';

const enhance = compose(
  withState('offerReceived', 'setOfferReceived', []),
  withState('forSaleItems', 'setForSaleItems', []),
  withState('imageCroppedItems', 'setImageCroppedItems', []),
  withState('refusedItems', 'setRefusedItems', []),
  withState('priceReductionItems', 'setPriceReductionItems', []),
  withState('soldItems', 'setSoldItems', []),
  withState('unreceivedItems', 'setUnreceivedItems', []),
  withStateLoading(),
  withHandlers({
    openAudio: props => item => {
      // props.navigation.navigate(screens.PlayerScreen, {...item})
    },
  }),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      const {items: offerReceived} = await ShopService.getReceivedOffer();
      const {items: priceReductionItems} = await ShopService.getPriceReductionItems();
      const {items: forSaleItems} = await ShopService.getMyItems();
      const {items: imageCroppedItems} = await ShopService.getNotConfirmedItems();
      const {items: soldItems} = await ShopService.getSoldItems();
      const {items: refusedItems} = await ShopService.getRefusedItems();
      // const {items: unreceivedItems} = await ShopService.getUnreceivedItems();
      this.props.setOfferReceived(offerReceived);
      this.props.setForSaleItems(forSaleItems);
      this.props.setImageCroppedItems(imageCroppedItems);
      this.props.setPriceReductionItems(priceReductionItems);
      this.props.setSoldItems(soldItems);
      this.props.setRefusedItems(refusedItems);
      // this.props.setUnreceivedItems(unreceivedItems);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(MyItems);
