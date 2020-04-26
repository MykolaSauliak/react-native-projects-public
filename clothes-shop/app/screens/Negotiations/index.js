import {
  compose,
  withProps,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import {
  withNotifications, 
  withLoading, 
  withAuth
} from '../../utils/enhancers';
import NegotiationsView from './NegotiationsView';
import _ from 'lodash';
import {ShopService} from '../../services';

const enhance = compose(
  withNotifications(),
  withLoading(),
  withAuth(),
  withState('lastUpdate', 'setLastUpdate', null),
  // withState('item','setItem',{}),
  withProps(({navigation}) => ({
    id: navigation.getParam('id', null), // negotiation id
    item: navigation.getParam('item', {}),
    sellerUser: navigation.getParam('sellerUser', {}),
  })),
  // lifecycle({
  //   async componentDidMount() {
  //     // console.log('componentDidMount')
  //     this.props.setLoading(true);
  //     let negotiation = await ShopService.getNegotiation({
  //       id: this.props.id,
  //     });
  //     console.log('componentDidMount negotiation', negotiation);
  //     // if(negotiation && (negotiation.user_id === this.props.user.uid || negotiation.seller_id === this.props.user.uid)){
  //     // if(!this.props.item.id){
  //     if (negotiation) {
  //       let item = await ShopService.getGood(negotiation.product_id);
  //       console.log('item', item);
  //       this.props.setItem(item);
  //       this.props.setLastUpdate(Date.now());
  //       // }
  //       this.props.setNegotiation(negotiation);
  //       let sellerUser = await ShopService.getUser(negotiation.seller_id);
  //       let buyerUser = await ShopService.getUser(negotiation.user_id);
  //       this.props.setSellerUser(sellerUser);
  //       this.props.setBuyerUser(buyerUser);
  //       // }
  //     }
  //     this.props.setLoading(false);
  //   },
  //   async componentDidUpdate(prevProps, prevState) {
  //     if (!_.isEqual(prevProps.id, this.props.id)) {
  //       this.props.setLoading(true);
  //       let negotiation = await ShopService.getNegotiation({
  //         id: this.props.id,
  //      });
  //       // console.log('componentDidUpdate negotiation', negotiation);
  //       if (negotiation) {
  //         let item = await ShopService.getGood(negotiation.product_id);
  //         this.props.setItem(item);
  //         console.log('item', item.id);
  //         this.props.setNegotiation(negotiation);
  //         let sellerUser = await ShopService.getUser(negotiation.seller_id);
  //         let buyerUser = await ShopService.getUser(negotiation.user_id);
  //         this.props.setSellerUser(sellerUser);
  //         this.props.setBuyerUser(buyerUser);
  //       }
  //       this.props.setLoading(false);
  //     }
  //   },
  // }),
);

export default enhance(NegotiationsView);
