import React from 'react';
import T from 'prop-types';
import {View, Image, ImageBackground,TouchableOpacity} from 'react-native';
import R from 'ramda';

import {NavigationService} from '../../services';
import s from './styles';
import {
  Touchable,
  Text,
  Rating,
  ShadowContainer,
  TextTouchable,
  Avatar,
} from '..';
import i18n from '../../i18n';

const UserInfo = ({
  rating,
  email = "",
  first_name = "",
  onLogout,
  showViewProfile = false,
  textReview = false,
  showAverageRating = false,
  styleContainer,
  reviewsCount,
}) => {
  return (
      <View style={[s.container, styleContainer]}>
        <View style={s.mainContainer}>
          <View style={s.infoContainer}>
            <View style={s.name}>
              <Text medium>{first_name}</Text>
            </View>
            <View style={s.name}>
              <Text medium>{email}</Text>
            </View>
            {onLogout && (
              <TouchableOpacity onPress={onLogout}>
                <Text>log out</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
  );
};

UserInfo.propTypes = {
  showViewProfile: T.bool,
  showAverageRating: T.bool,
  rating: T.number,
  reviewsCount: T.number,
  user: T.object,
  styleContainer: T.any,
};

export default UserInfo;
