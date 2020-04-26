import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import constants from '../../../../constants';
import {StripeService} from '../../../../services';
// import CardList from '../../../../components/CardList';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChooseCard = ({
  chooseToken,
  tokens,
  addToken,
  selectToken,
  onBack,
  updateIndex,
}) => {
  // console.log('tokens',tokens.length)
  const addCard = async () => {
    let token = await StripeService.paymentRequestWithCardForm();
    console.log('new token ', token);
    if (token) {
      let successfull = await StripeService.addPayment(token.tokenId);
      // console.log('successfull',successfull)
      if (successfull) {
        try {
          addToken(token);
          chooseToken(token);
          selectToken(token);
          updateIndex(3);
        } catch (err) {
          console.log('CANT ADD CARD', err);
        }
      } else {
        console.log('CANT ADD CARD');
      }
    }
  };

  return (
    <View style={{padding: 15}}>
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={onBack}>
          <AntDesign name="arrowleft" size={25} />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold'}}>Choose you card to pay</Text>
      </View>
      {/* <CardList tokens={tokens} onPress={(token) => {updateIndex(3);chooseToken(token)}}/> */}
      <TouchableOpacity onPress={addCard}>
        <Text style={{textAlign: 'center'}}>{'add card'}</Text>
      </TouchableOpacity>
    </View>
  );
};

ChooseCard.defaultProps = {
  tokens: [],
  addStripeToken: () => {},
  addToken: () => {},
  chooseToken: () => {},
  selectToken: () => {},
  onBack: () => {},
};

export default ChooseCard;
