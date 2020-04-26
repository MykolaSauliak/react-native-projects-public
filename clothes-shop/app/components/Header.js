import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import screens from '../constants/screens';

const BACKGROUND_IMAGE = require('../assets/background.png');
const RIP_IMAGE = require('../assets/rip.png');

const Header = ({
  navigation,
  onHomeClick = () => navigation.navigate(screens.AudioList),
  onFavoriteClick = () => {},
  onPlayerClick = () => navigation.navigate(screens.PlayerScreen),

  style,
}) => {
  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={[{width: '100%', height: '100%'}, style]}>
      <View
        style={{
          flex: 1,
          borderBottomColor: 'black',
          borderBottomWidth: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={onHomeClick}>
          <AntDesign name="home" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFavoriteClick}>
          <AntDesign name="hearto" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayerClick}>
          <Entypo name="music" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFavoriteClick}>
          <Feather name="settings" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onFavoriteClick}>
          <Image
            source={RIP_IMAGE}
            style={{height: 35, width: 35}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Header;
