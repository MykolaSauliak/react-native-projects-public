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

const AddressList = ({addresses, ...rest}) => (
  <View>
    {addresses.map(ad => {
      return <AddressBox {...rest} {...ad} />;
    })}
  </View>
);

AddressList.propTypes = {
  addresses: array,
};

AddressList.defaultProps = {
  addresses: [],
  onPress: () => {},
};

export default AddressList;
