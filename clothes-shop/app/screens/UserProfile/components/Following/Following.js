import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import GridList from '..';
import {ListItem} from 'react-native-elements';
import {NavigationService} from '../../../../services';

const Following = ({items, onPress, loading}) => {
  return (
    <View>
      {loading && <ActivityIndicator />}
      {items.map(item => (
        <ListItem title={item.name} />
      ))}
    </View>
  );
};

Following.defaultProps = {
  loading: true,
  onPress: item => NavigationService.navigateToProduct(item),
};

export default Following;
