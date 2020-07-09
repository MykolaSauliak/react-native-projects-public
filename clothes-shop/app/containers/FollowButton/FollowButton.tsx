import React, {useState, Suspense} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { withFollowing, withAuth} from '../../utils/enhancers';
import { color } from 'react-native-reanimated';
import { compose } from 'redux';
import { colors } from '../../styles';

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
    console.log(' FollowButton uid',uid)
    return (
        <View>
            {isUserFollowed({user_id: uid}) === false
            ? <TouchableOpacity style={[S.contentContainerStyle,containerStyle, ]} onPress={() => addToFollowing(uid)}>
            <Text style={{...titleStyle}}>+ Follow</Text>
            </TouchableOpacity>
            :<TouchableOpacity style={[S.contentContainerStyle,containerStyle, ]} onPress={() => removeFromFollowing(uid)}>
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

const S = StyleSheet.create({
    contentContainerStyle: {
        color:'white',
        borderColor: colors.orange, 
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 1, 
        padding: 5, 
        borderRadius: 3
    }
})