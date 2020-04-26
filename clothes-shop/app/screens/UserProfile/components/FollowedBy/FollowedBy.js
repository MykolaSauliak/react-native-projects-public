import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {ListItem} from 'react-native-elements';
import {NavigationService} from '../../../../services';

const FollowedBy = ({items, onPress, loading}) => {
  return (
    <View>
      {loading && <ActivityIndicator />}
      {items.map(item => (
        <ListItem title={item.name} />
      ))}
    </View>
  );
};

FollowedBy.defaultProps = {
  loading: true,
  onPress: item => NavigationService.navigateToProduct(item),
};

export default FollowedBy;
