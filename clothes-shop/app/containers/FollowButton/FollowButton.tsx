import React, {useState, Suspense} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { withFollowing} from '../../utils/enhancers';
import { color } from 'react-native-reanimated';

const FollowButton = ({
    uid,
    isUserFollowed,
    addToFollowing,
    removeFromFollowing,
    titleStyle={},
    containerStyle = {},
}) => {
    return (
        <View>
            {isUserFollowed({user_id: uid}) === false
            ? <TouchableOpacity style={{...containerStyle}} onPress={() => addToFollowing(uid)}>
            <Text style={{...titleStyle}}>+ Follow</Text>
            </TouchableOpacity>
            :<TouchableOpacity style={{...containerStyle}} onPress={() => removeFromFollowing(uid)}>
            <Text style={{...titleStyle}}>Unfollow</Text>
            </TouchableOpacity>}
        </View>
    );
};

export default withFollowing()(FollowButton);