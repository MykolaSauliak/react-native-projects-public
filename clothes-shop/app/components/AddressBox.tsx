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
import colors from '../styles/colors';
import {NavigationService} from '../services';
import {ListItem} from 'react-native-elements';
import {string, object} from 'prop-types';


const AddressBox = ({
  id,
  title,
  first_name,
  last_name,
  address,
  address_line_2,
  postal_code,
  city,
  updatedAt,
  createdAt,
  country,

  onPress,
  onRemovePress,
  // selectAddress,
}) => (
  <ListItem
    containerStyle={{marginVertical: 5}}
    leftElement={
      <View style={{padding: 10, borderRadius: 10, backgroundColor: 'white'}}>
        {/* <Text>{i18n.t('myorders.orderid')} {id}</Text> */}
        <Text>
          {first_name} {last_name}
        </Text>
        <Text>{address}</Text>
        <Text>{address_line_2} </Text>
        <Text>{postal_code} </Text>
        <Text>{city}</Text>
        <Text>{country ? (country.name ? country.name : country) : ''}</Text>
        {/* <Text>Items: </Text> */}
        {/* {createdAt && <Text>{i18n.t('myorders.createdtime')} {createdAt}</Text> }
            {updatedAt && <Text>{i18n.t('myorders.lastupdate')} {updatedAt} </Text> } */}
      </View>
    }
    rightElement={
      <TouchableOpacity onPress={() => onRemovePress({id})}>
        <Icon type="antdesign" name="close" size={20} />
      </TouchableOpacity>
    }
    chevron
    onPress={() => {
      // selectAddress({ id, title, first_name, last_name, address, address_line_2, updatedAt, postal_code, country, createdAt, city })
      onPress({
        id,
        title,
        first_name,
        last_name,
        address,
        address_line_2,
        updatedAt,
        postal_code,
        country,
        createdAt,
        city,
      });
    }}
  />
);

AddressBox.propTypes = {
  title: string,
  first_name: string,
  last_name: string,
  address: string,
  address_line_2: string,
  postal_code: string,
  country: object,
  city: string,
};

AddressBox.defaultProps = {
  onPress: () => {},
  selectAddress: () => {},
};

export default AddressBox;
