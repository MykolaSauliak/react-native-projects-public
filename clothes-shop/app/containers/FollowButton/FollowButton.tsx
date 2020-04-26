import React, {useState, Suspense} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { withFollowing} from '../../utils/enhancers';

const FollowButton = ({
    uid,
    isUserFollowed,
    addToFollowing,
    removeFromFollowing,
}) => {
    return (
        <View>
            {isUserFollowed({user_id: uid}) === false
            ? <TouchableOpacity onPress={() => addToFollowing(uid)}>
            <Text>+ Follow</Text>
            </TouchableOpacity>
            :<TouchableOpacity onPress={() => removeFromFollowing(uid)}>
            <Text>Unfollow</Text>
            </TouchableOpacity>}
        </View>
    );
};

export default withFollowing()(FollowButton);