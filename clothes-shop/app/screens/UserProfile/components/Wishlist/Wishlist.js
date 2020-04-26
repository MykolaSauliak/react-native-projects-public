import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import GridList from '../../../../components/GridList/GridList';
import {NavigationService} from '../../../../services';

const Wishlist = ({items, onPress, loading}) => {
  return (
    <View>
      {loading && <ActivityIndicator />}
      <GridList items={items} onPress={item => onPress(item)} />
    </View>
  );
};

Wishlist.defaultProps = {
  loading: false,
  items: [],
  onPress: item => NavigationService.navigateToProduct(item),
};

export default Wishlist;
