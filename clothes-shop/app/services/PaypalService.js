// import stripe from 'tipsi-stripe';
import config from '../../config';

class StripeService {
  init() {
    // stripe.setOptions({
    //   publishableKey: config.STRIPE_API_KEY,
    // });
  }

  createOrder({items}) {
    // const total = getTotalValue(cartItems)
    // console.log('total - ',total)
    let total = 0;
    const item_list = items.map(i => {
      let price;
      if (i.discount > 0 && i.discountEndTs > Date.now() / 1000) {
        price = ((100 - i.discount) / 100) * i.price;
      } else {
        price = i.price;
      }
      console.log('price', price);
      total += price * (i.count || 1);
      // price = pric
      return {
        sku: i.id.trim(),
        name: i.title.slice(0, 126),
        // "description" : (i.desc || '').slice(0, 126),
        quantity: JSON.stringify(i.count || 1),
        price: price,
        currency: 'USD',
      };
    });
    console.log('total', total);
    // let currency = '100 USD'
    // currency = currency.replace(" USD", "")
    console.log('item_list', item_list);
    let paymentDetails = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: total,
            currency: 'USD',
            details: {
              subtotal: total,
              tax: '0',
              shipping: '0',
              handling_fee: '0',
              shipping_discount: '0',
              insurance: '0',
            },
          },
          description: 'test',
          item_list: {
            items: item_list,
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
    };

    try {
      let details = {
        grant_type: 'client_credentials',
      };

      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `${config.AUTHORIZATION}`,
        },
        body: formBody,
      })
        .then(response => response.text())
        .then(result => {
          console.log('accessToken recieved');
          let accessToken = JSON.parse(result).access_token;
          //console.log('accessToken',accessToken)
          // setAccessToken(accessToken)

          axios
            .post(
              'https://api.sandbox.paypal.com/v1/payments/payment',
              JSON.stringify(paymentDetails), // you can get data details from https://developer.paypal.com/docs/api/payments/v1/
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
              },
            )
            .then(response => {
              const {id, links} = response.data;
              const approvalUrl = links.find(
                data => data.rel == 'approval_url',
              );
              const onFinish = () => {
                cartItems.forEach(item => {
                  dispatch(removeFromCart(item.id));
                });
                navigation.navigate(screens.Cart);
              };
              // //console.log(id)
              //console.log(approvalUrl)
              //console.log('href',approvalUrl.href)
              console.log('navigate to PaypalModal');
              navigation.navigate(screens.PaypalModal, {
                onFinish: onFinish,
                accessToken,
                href: JSON.stringify(approvalUrl.href),
              });
              // props.setApprovalUrl(approvalUrl.href)
            })
            .catch(err => {
              console.log('ERROR DURING CREATE ORDER ..', err);
              // console.log(Object.keys(err))
              // console.log(Object.keys(err.response))
              // console.log(err.response)
              // console.log({ ...err })
            });
          /*
                    issue\":\"Item amount must add up to specified amount subtotal (or total if amount details not specified)\"}],
                      */
        });
    } catch (err) {}
  }

  paymentRequestWithCardForm(options) {
    // return stripe.paymentRequestWithCardForm(options);
  }

  createTokenWithCard(params) {
    // return stripe.createTokenWithCard(params);
  }
}

export default new StripeService();
