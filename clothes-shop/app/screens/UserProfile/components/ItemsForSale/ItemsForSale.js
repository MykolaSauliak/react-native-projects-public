import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import GridList from '../../../../components/GridList/GridList';
import {NavigationService} from '../../../../services';

const ItemsForSale = ({items, onPress, loading}) => {
  return (
    <View style={{flex: 1}}>
      {/* <Text>item for sales</Text> */}
      {loading && <ActivityIndicator />}
      <GridList items={items} onPress={item => onPress(item)} />
    </View>
  );
};

ItemsForSale.defaultProps = {
  loading: true,
  items: [],
  onPress: item => NavigationService.navigateToProduct({...item}),
};

export default ItemsForSale;
