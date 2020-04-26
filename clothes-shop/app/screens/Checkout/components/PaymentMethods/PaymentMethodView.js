import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import constants from '../../../../constants';
import {ChooseCard} from '..';

const PaymentMethodView = ({
  choosePayment,
  updateIndex,
  paymentMethod,
  chooseToken,
}) => {
  let [showCardChooseView, setCardChooseView] = useState(false);
  console.log('showCardChooseView', showCardChooseView);
  // console.log('setCardChooseView',setCardChooseView)
  return (
    <View style={{padding: 15}}>
      {
        // !showCardChooseView
        // ?
        <>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 18}}>
            CHOOSE PAYMENT METHOD
          </Text>
          {/* <ListItem
            leftElement={
              <Image
                style={{width: 35, height: 35}}
                resizeMode="contain"
                source={constants.PAYPAL_LOGO}
              />
            }
            onPress={() => {
              updateIndex(3);
              choosePayment('paypal');
            }}
            title="Paypal"
            bottomDivider
            chevron
          /> */}
          <ListItem
            leftElement={
              <Image
                style={{width: 35, height: 35}}
                resizeMode="contain"
                source={constants.VISA_LOGO}
              />
            }
            title="Credit cards"
            onPress={() => {
              updateIndex(3);
              choosePayment('creditcard');
            }}
            // onPress={() => {setCardChooseView(true); choosePayment('creditcard')} }
            bottomDivider
            chevron
          />
        </>
        // :  <ChooseCard updateIndex={updateIndex} onBack={() => setCardChooseView(false)} chooseToken={chooseToken} />
      }
    </View>
  );
};

PaymentMethodView.defaultProps = {
  updateIndex: () => {},
};

export default PaymentMethodView;
