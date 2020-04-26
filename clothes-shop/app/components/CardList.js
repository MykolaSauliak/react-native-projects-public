import React from 'react';
import {
  Platform,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AddressBox from './AddressBox';
import {string, object, array} from 'prop-types';
import {CardView} from 'react-native-credit-card-input';

const CardList = ({tokens, onPress}) => {

    // console.log('tokens',tokens.length)

  return (
    <View>
      {tokens.map(token => {
        let card = token.card;


          <TouchableOpacity onPress={() => onPress(token)}>
            <CardView
              brand={card.brand}
              expiry={card.expMonth + '/' + card.expYear}
              number={'**** **** ****' + card.last4}
              cvc={card.cvc}
              onPress={onPress}
              // {...card}
            />
          </TouchableOpacity>;
        );
      })}
    </View>;
  );
};

CardList.propTypes = {
  tokens: array,
};

CardList.defaultProps = {
  tokens: [],
  onPress: () => {},
};

export default CardList;
