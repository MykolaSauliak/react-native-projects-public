import React from 'react';
import {
  Platform,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../styles/colors';
import {NavigationService} from '../services';

const SortSheet = ({navigation, goBack, title}) => (
  <Header
    // statusBarProps={{ barStyle: 'light-content' }}
    // barStyle="light-content" // or directly
    leftComponent={
      <TouchableOpacity onPress={goBack}>
        <Entypo name="chevron-left" size={25} />
      </TouchableOpacity>
    }
    centerComponent={{
      text: title,
      style: {fontSize: 16, color: 'black', fontWeight: 'bold'},
    }}
    containerStyle={{
      backgroundColor: colors.gray || 'gray',
      height: 50,
      borderWidth: 0,
      // justifyContent: 'space-around',
    }}
  />
);

SortSheet.defaultProps = {
  goBack: () => NavigationService.goBack(),
};

export default SortSheet;
