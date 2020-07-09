import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../styles';
import constants from '../../constants';
import {Text} from "../../components";
import { widthPercentageToDP } from 'react-native-responsive-screen';
import S from './styles'

interface Props {
    title: string,
    source: any,
    onPress: () => void,
}

const SearchCard = ({
    onPress = () => {},
    source,
    title
  } :Props) => (
    <TouchableOpacity
      style={[S.listCard]}
      onPress={onPress}
      >
      <View style={{backgroundColor: colors.gray,padding:10, }}>
        <Image 
          source={source}
          resizeMode="contain"
          style={{width: constants.DEVICE_WIDTH * 0.3, aspectRatio: 1/1,  }}
          
          />
      </View>
      <Text style={S.title}>{title}</Text>
  </TouchableOpacity>
  )

export default SearchCard;