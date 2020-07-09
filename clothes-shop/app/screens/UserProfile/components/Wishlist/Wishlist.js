import React from 'react';
import {View} from 'react-native';
import GridList from '../../../../components/GridList/GridList';
import {NavigationService} from '../../../../services';
import { Loading } from '../../../../components';

const Wishlist = ({items, onPress, loading}) => {
  return (
    <View>
      {loading && <Loading />}
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
