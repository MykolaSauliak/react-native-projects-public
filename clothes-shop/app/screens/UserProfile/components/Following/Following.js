import React from 'react';
import {View} from 'react-native';
import GridList from '..';
import {ListItem, Loading} from '../../../../components';
import {NavigationService} from '../../../../services';

const Following = ({items, onPress, loading}) => {
  return (
    <View>
      {loading && <Loading />}
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
