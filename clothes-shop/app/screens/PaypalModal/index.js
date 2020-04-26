import {compose, withState, withHandlers, withProps} from 'recompose';
import PaypalModalView from './PaypalModalView';
import {connect} from 'react-redux';
import screens from '../../constants/screens';
import axios from 'axios';
import ShopService from '../../services';
// const mapStateToProps = (state) => ({
//     // sounds:  getSounds(state),
// })

// const mapDispatchToProps = {

// }

const enhance = compose(
  // connect(mapStateToProps),
  withProps(props => ({
    href: props.navigation.getParam('href', ''),
    accessToken: props.navigation.getParam('accessToken', ''),
    // onFinish : props.navigation.ge
  })),
  // withState('viewType','setViewType', 'list'),
  withHandlers({
    openAudio: props => item => {
      props.navigation.navigate(screens.PlayerScreen, {...item});
    },
    _onNavigationStateChange: ({
      accessToken,
      href,
      navigation,
    }) => webViewState => {
      if (webViewState.url.includes('https://example.com/')) {
        //console.log('webViewState',webViewState)
        let regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match;
        while ((match = regex.exec(webViewState.url))) {
          params[match[1]] = match[2];
        }
        //console.log(params)
        const {PayerID, paymentId} = params;
        //console.log('PayerID',PayerID)
        //console.log('paymentId',paymentId)
        //console.log('accessToken',accessToken)
        // setApprovalUrl(null)

        axios
          .post(
            `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
            {payer_id: PayerID},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          .then(async response => {
            // //console.log('execute function - ',response)
            // //console.log('payer',response.payer)
            // //console.log('payer',Object.keys(response))
            // //console.log('payer cart',Object.keys(response.data))
            //console.log('payer data',response.data)
            //console.log('payer data',response.data)
            //console.log('response.data.payer.payer_info.',response.data.payer.payer_info)
            // //console.log('payer data payer')
            // //console.log({...response.data.payer})
            // //console.log('payer data transactions')
            // //console.log({...response.data.transactions})
            // //console.log('payer data transactions.item_list')
            // //console.log({...response.data.transactions.item_list})
            // //console.log()

            const payid = response.data.id;
            const create_time = response.data.create_time;
            const payment_method = response.data.payer.payment_method;
            const status = response.data.payer.status;
            const email = response.data.payer.payer_info.email;
            const last_name = response.data.payer.payer_info.last_name;
            const first_name = response.data.payer.payer_info.first_name;
            const city = response.data.payer.payer_info.shipping_address.city;
            const postal_code =
              response.data.payer.payer_info.shipping_address.postal_code;
            const country_code =
              response.data.payer.payer_info.shipping_address.country_code;
            const recipient_name =
              response.data.payer.payer_info.shipping_address.recipient_name;
            const line1 = response.data.payer.payer_info.shipping_address.line1;
            const items = response.data.transactions[0].item_list.items;

            //console.log('status',status)
            //console.log('recipient_name',recipient_name)
            try {
              await ShopService.createOrder({
                items,
                payid,
                email,
                payment_method,
                last_name,
                first_name,
                create_time,
                city,
                postal_code,
                country_code,
                recipient_name,
                line1,
                status,
              });
            } catch (err) {
            } finally {
              if (navigation.state.params.onFinish) {
                navigation.state.params.onFinish();
              }
              // this.props.navigation.state;
              // navigation.navigate(screens.Cart)
            }

            // //console.log('line1',line1)
            // //console.log('payer',response.data.)
            // //console.log('response.data.payer',Object.keys(response.data.payer)) //  ["email", "first_name", "last_name", "payer_id", "shipping_address", "country_code"]
            // //console.log('response.data.payer',Object.keys(response.data.payer.payer_info.shipping_address))
            // //console.log('response.data.intent',response.data.intent)
            // //console.log('response.data.cart',response.data.cart)
            // //console.log('payer',Object.keys(response.request))
          })
          .catch(err => {
            //console.log({ ...err })
          });
      }
    },
  }),
);

export default enhance(PaypalModalView);
