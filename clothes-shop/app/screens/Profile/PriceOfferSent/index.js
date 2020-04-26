import {compose, withState, withHandlers, lifecycle} from 'recompose';
import PriceOfferSent from './PriceOfferSent';
import {ShopService} from '../../../services';
import {withReduxLoading, withStateLoading} from '../../../utils/enhancers';

const enhance = compose(
  withStateLoading(),
  withState('items', 'setItems', []),
  lifecycle({
    async componentDidMount() {
      this.props.setLoading(true);
      const {
        count,
        items: myNegotiations,
      } = await ShopService.getSendNegotiations();
      this.props.setItems(myNegotiations);
      this.props.setLoading(false);
    },
  }),
);

export default enhance(PriceOfferSent);
