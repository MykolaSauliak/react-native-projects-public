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
import _ from 'lodash'

const UserInfo = ({
  rating,
  email = "",
  first_name = "",
  last_name = "",
  onLogout,
  showViewProfile = false,
  textReview = false,
  showAverageRating = false,
  styleContainer,
  reviewsCount,
  titleStyle = {}
}) => {
  return (
      <View 
        style={[s.container, styleContainer]}
        >
        {/* <View style={s.mainContainer}> */}
          {/* <View style={s.infoContainer}> */}
            <View style={s.name}>
              <Text xlargeSize style={[titleStyle]}>{first_name} {last_name}</Text>
            </View>
            {!_.isEmpty(email) && (<View style={s.name}>
              <Text smallSize>{email}</Text>
            </View>)}
            {onLogout && (
              <TouchableOpacity onPress={onLogout}>
                <Text smallSize>log out</Text>
              </TouchableOpacity>
            )}
          {/* </View> */}
        {/* </View> */}
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
