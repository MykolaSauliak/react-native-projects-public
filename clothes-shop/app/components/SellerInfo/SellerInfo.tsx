import React, {useState, Suspense} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import constants from '../../constants';
import globalStyles from '../../styles';
import {NavigationService} from '../../services';
import {
    Chip
} from 'react-native-paper';
import {ListItem, Text} from '../../components';
import FollowButton from '../../containers/FollowButton/FollowButton';
import { colors } from '../../styles';
import { trim } from '../../utils';

const SellerInfo = ({
    name = "",
    last_name = "",
    sold_item = 0,
    avatar,
    uid,
    reputation,
    errorMessage = "Can't fetch seller info",
    paddingHorizontal = 15,
    containerStyle = {},
}) => {
    return (
       <View style={[{ backgroundColor: 'white', paddingHorizontal, marginTop: 10, paddingVertical: 15}, containerStyle]}>
        {/* <Text style={globalStyles.listTitle}>
          Seller
        </Text> */}
        {
          !uid
        ?<Text style={{textAlign:'center',marginVertical: 10}}>{errorMessage}</Text>
          :(<View style={{}}>  
            {/* <View style={{alignItems:'flex-start'}}>
              {reputation === constants.trusted_seller && <Chip >{reputation}</Chip>}
                            {reputation === constants.expert_seller && <Chip >{reputation}</Chip>}

            </View> */}
        <ListItem
          onPress={() => {
            // console.log('navigate to user screen', uid);
            NavigationService.navigateToCustomUserProfile({user_id: uid});
          }}
          title={<View>
          <Text style={{fontSize: 17, lineHeight: 22}}>{`${trim(name)} ${trim(last_name)}`}</Text>
          <Text style={{fontSize: 14,marginTop: -15, lineHeight: 22}}>
              {`${reputation === constants.expert_seller ? "\nProfessional seller" : ""}${reputation === constants.trusted_seller ? "\nTrusted seller" : ""} `}
            </Text>
          <Text style={{fontSize: 13,lineHeight: 22}}>{`${sold_item || 0} sold items`}</Text>
         </View>}
          // rightElement={}
          // rightAvatar={{
          //   source: avatar ? {uri: avatar} : require('./avatar-placeholder-300x300.png'),
          // }}
          rightElement={<View style={{alignItems: 'center', justifyContent: 'center',  borderRadius: 35}}>
              <Image 
                source={avatar ? {uri: avatar} : require('./avatar-placeholder-300x300.png')}
                style={{width: 50, height: 50, marginBottom: 10, borderRadius: 25}}
                resizeMode="cover"
                />
              <FollowButton uid={uid} 
                  containerStyle={{borderColor: colors.orange, borderWidth: 1, padding: 3, borderRadius: 3}} 
                  titleStyle={{color: colors.orange}}
                  />
          </View>}
        />
        </View>)}
      </View>
    );
};

export default SellerInfo;