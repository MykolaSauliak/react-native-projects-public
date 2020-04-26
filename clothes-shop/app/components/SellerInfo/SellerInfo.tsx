import React, {useState, Suspense} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import constants from '../../constants';
import globalStyles from '../../constants/styles';
import {NavigationService} from '../../services';
import {
    Chip
} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import FollowButton from '../../containers/FollowButton/FollowButton';

const SellerInfo = ({
    name,
    last_name,
    sold_item,
    avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    uid,
    reputation,
    errorMessage = "Can't fetch seller info",
    paddingHorizontal = 15
}) => {
    return (
       <View style={[{ backgroundColor: 'white', paddingHorizontal, marginTop: 10, paddingVertical: 25}]}>
        <Text style={globalStyles.listTitle}>
          Seller
        </Text>
        {
          !uid
        ?<Text style={{textAlign:'center',marginVertical: 10}}>{errorMessage}</Text>
          :(<View style={{}}>  
            <View style={{alignItems:'flex-start'}}>
              {reputation === constants.trusted_seller && <Chip >{reputation}</Chip>}
              {reputation === constants.expert_seller && <Chip >{reputation}</Chip>}
            </View>

        <ListItem
          onPress={() => {
            // console.log('navigate to user screen', uid);
            NavigationService.navigateToCustomUserProfile({user_id: uid});
          }}
          title={`${name} ${last_name}`}
          subtitle={`${sold_item || 0} sold items`}
          // rightElement={}
          rightAvatar={{
            source: {uri: avatar},
          }}
          rightElement={<FollowButton uid={uid}/>}
        />
        </View>)}
      </View>
    );
};

export default SellerInfo;