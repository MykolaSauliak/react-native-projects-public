import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Product as ProductType} from '../../../../../types';
import {NavigationService} from '../../../../../services';
import constants from '../../../../../constants';
import UserListItem from '../../../../../containers/UserListItem';

type Props = {
  items: ProductType[],
};

const FollowingAlert = ({following}: Props) => {
  console.log('following', following);
  return (
    <View style={{}}>
      <FlatList
        data={following}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          console.log('item', item);
          return (
            <UserListItem
              onPress={() =>
                NavigationService.navigateToCustomUserProfile({user_id: item})
              }
              user_id={item}
            />
          );
        }}
        // <ListItem
        // containerStyle={{margin: 10}}
        // leftElement={<Image
        //             style={{width: constants.DEVICE_WIDTH * 0.3, height: 100}}
        //             resizeMode="contain"
        //             source={{uri: item?.images[0].src }}
        //             />}
        // onPress={() => NavigationService.navigateToProduct({...item})}
        // title={`${item.brand_name}\n${item.color} ${item.material} ${item.type_name}`}
        // subtitle={`${item.price} ${item.currency}`}
        // rightContentContainerStyle={{width: 0}}
      />
    </View>
  );
};

export default FollowingAlert;
