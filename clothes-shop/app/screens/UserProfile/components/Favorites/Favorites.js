import React from 'react';
import {View} from 'react-native';
import GridList from '../../../../components/GridList/GridList';
import {NavigationService} from '../../../../services';
import { Loading } from '../../../../components';

const Favorites = ({items, onPress, loading}) => {
  return (
    <View>
      {loading && <Loading />}
      <GridList items={items} onPress={item => onPress(item)} />
    </View>
  );
};

Favorites.defaultProps = {
  loading: true,
  onPress: item => NavigationService.navigateToProduct(item),
};

export default Favorites;
