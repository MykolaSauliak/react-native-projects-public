import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import GridList from '../../../../components/GridList/GridList';
import {NavigationService} from '../../../../services';

const Favorites = ({items, onPress, loading}) => {
  return (
    <View>
      {loading && <ActivityIndicator />}
      <GridList items={items} onPress={item => onPress(item)} />
    </View>
  );
};

Favorites.defaultProps = {
  loading: true,
  onPress: item => NavigationService.navigateToProduct(item),
};

export default Favorites;
