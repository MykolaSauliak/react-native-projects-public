import React from 'react';
import {View} from 'react-native';
import GridList from '../../../../components/GridList/GridList';
import {NavigationService} from '../../../../services';
import { Loading } from '../../../../components';

const ItemsForSale = ({items, onPress, loading}) => {
  return (
    <View style={{flex: 1}}>
      {/* <Text>item for sales</Text> */}
      {loading && <Loading />}
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
