import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationService} from '../../services';
import colors from '../../constants/colors';

const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  sortBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 3,
    height: 35,
  },
});

const NotificationsView = ({
  notifications,
  // selectedCar,
  // toWishlist,
  // fromWishlist,
  // toCart,
  // fromCart,
  // wishlist,
  // cartItems,
  // products,
  // filteredProducts,
  // setFilteredProducts,
  // openProductInfo
}) => {
  const bottomSheet = React.createRef();

  const onNotificationPress = item => {
    switch (item.type) {
      case 'product':
        NavigationService.navigateToProduct(item);
        break;
      case 'user':
        NavigationService.navigateToCustomUserProfile(item);
        break;
      case 'negotiations':
        NavigationService.navigateToNegotiations(item);
        break;
    }
  };
  //   let sortBy = 'TOP'
  //   let suitsForProducts = filteredProducts.filter(p => !selectedCar.car_id || !p.car_ids || p.car_ids.includes(selectedCar.car_id))
  // console.log('filteredProducts',suitsForProducts.length)
  return (
    <View style={{zIndex: 1, flex: 1}}>
      <FlatList
        keyExtractor={item => item.id}
        data={notifications}
        renderItem={({item}) => {
          console.log('item', item);
          return (
            <ListItem
              title={item.title}
              subtitle={item.date}
              leftAvatar={{source: {uri: item.leftImage}}}
              rightAvatar={{source: {uri: item.rightImage}}}
              subtitleStyle={{opacity: item.viewed ? 0.5 : 1}}
              onPress={() => onNotificationPress(item)}
            />
          );
        }}
      />
    </View>
  );
};

export default NotificationsView;
