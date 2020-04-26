import React from 'react';
import {
  Platform,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const NotificationIcon = ({notificationsCount, focused, color, size}) => {
  const iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
  return (
    <View>
      {notificationsCount > 0 ? (
        <View
          style={{
            zIndex: 2,
            position: 'absolute',
            right: -5,
            top: -5,
            backgroundColor: 'red',
            borderRadius: 9,
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>{notificationsCount}</Text>
        </View>
      ) : null}
      <Ionicons name={iconName} size={size} color={color} />
    </View>
  );
};

NotificationIcon.defaultProps = {
  notificationsCount: 0,
  color: 'black',
  size: 25,
};

export default NotificationIcon;
