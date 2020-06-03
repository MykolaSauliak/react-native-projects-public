import React, {useState, Suspense} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { withFollowing, withAuth} from '../../utils/enhancers';
import { color } from 'react-native-reanimated';
import { compose } from 'redux';

const FollowButton = ({
    uid,
    isUserFollowed,
    addToFollowing,
    removeFromFollowing,
    titleStyle={},
    containerStyle = {},
    loggedInUser,
}) => {
    if(loggedInUser?.uid == uid){
        return null
    }
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

const enhance = compose(
    withAuth(),
    withFollowing()
)

export default enhance(FollowButton);