import React from 'react';
import {View, Text} from 'react-native';
import {ListItem, Loading} from '../../../../components';
import {NavigationService} from '../../../../services';

const FollowedBy = ({items, onPress, loading}) => {
  return (
    <View>
      {loading && <Loading/>}
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
