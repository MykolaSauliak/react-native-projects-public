import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {NavigationService} from '../../../../services';

const UsersList = ({items, onPress}) => {
  return (
    <FlatList
      keyExtractor={(item, i) => i.toString()}
      data={items}
      renderItem={({item, index}) => (
        <ListItem
          leftAvatar={{
            source: {uri: item.avatar ? item.avatar.src : item.avatar},
          }}
          onPress={() => onPress(item)}
          title={item.name + ' ' + item.last_name}
          subtitle={item.createdAt}
        />
      )}
    />
  );
};

UsersList.defaultProps = {
  items: [],
  onPress: item =>
    NavigationService.navigateToCustomUserProfile({user_id: item.user_id}),
};

export default UsersList;
