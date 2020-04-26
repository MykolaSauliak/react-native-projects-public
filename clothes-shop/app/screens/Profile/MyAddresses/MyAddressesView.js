import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../../constants/styles';
import colors from '../../../styles/colors';
import i18n from '../../../i18n';
import {ListItem, Icon} from 'react-native-elements';
import {NavigationService} from '../../../services';

const S = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.dark,
  },
  bottomRightIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

const MyAddressesView = ({
  addresses,
  onPress,
  toNewAddress,
  selectAddress,
  removeShippingAddress,
}) => {
  const _renderOrder = ({
    id,
    title,
    address,
    address_line_2,
    first_name,
    last_name,
    postal_code = '',
    orderStatus,
    country = '',
    createdAt,
    city = '',
    updatedAt,
    items = [],
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
        <TouchableOpacity onPress={() => removeShippingAddress({id})}>
          <Icon type="antdesign" name="close" size={20} />
        </TouchableOpacity>
      }
      chevron
      onPress={() => {
        selectAddress({
          id,
          title,
          first_name,
          last_name,
          address,
          address_line_2,
          orderStatus,
          updatedAt,
          postal_code,
          country,
          createdAt,
          city,
          items,
        });
        onPress();
      }}
    />
    // <View style={{padding: 10,borderRadius :10, backgroundColor : "white"}}>
    //     <Text>{i18n.t('myorders.orderid')} {id}</Text>
    //     <Text>{first_name} {last_name} </Text>
    //     <Text>{email} </Text>
    //     <Text>{i18n.t('myorders.orderstatus')} {orderStatus}</Text>
    //     <Text>{i18n.t('myorders.postalcode')} {postal_code} </Text>
    //     {/* <Text>Items: </Text> */}
    //     {createdAt && <Text>{i18n.t('myorders.createdtime')} {createdAt}</Text> }
    //     {updatedAt && <Text>{i18n.t('myorders.lastupdate')} {updatedAt} </Text> }
    // </View>
  );

  // const _renderHeader = (cart=false) => (
  //     <View style={S.header}>
  //         <View style={{flex:.25, flexDirection:'row', justifyContent:'space-around' }}>
  //         </View>
  //         <Text style={[globalStyles.text, {flex: 0.5, textAlign:'center', color: 'white', fontWeight: 'bold'}]}>My orders</Text>
  //     </View>
  // )

  return (
    <View style={{flex: 1, backgroundColor: colors.gray, padding: 15}}>
      {/* <StatusBar backgroundColor={colors.gray}/> */}
      {/* {_renderHeader()} */}
      <FlatList
        // keyExtractor={(item) => item.itemNumber}
        data={addresses}
        renderItem={({item}) => {
          console.log('render addres ', item);
          return _renderOrder({...item});
        }}
      />
      <TouchableOpacity style={S.bottomRightIcon} onPress={toNewAddress}>
        <Icon type="antdesign" name="pluscircle" size={50} />
      </TouchableOpacity>
    </View>
  );
};

MyAddressesView.defaultProps = {
  onPress: address => {
    NavigationService.navigateToAddressEditor({...address});
  },
  toNewAddress: () => NavigationService.navigateToAddressEditor(),
};

export default MyAddressesView;
