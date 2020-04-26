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
import colors from '../constants/colors';
import {NavigationService} from '../services';

const BackHeader = ({goBack, containerStyle, title, ...restProps}) => (
  <Header
    leftComponent={
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={goBack}>
          <Entypo name="chevron-left" size={25} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            fontWeight: 'bold',
            paddingHorizontal: 5,
          }}>
          {title}
        </Text>
      </View>
    }
    // centerComponent={{
    //   text: title,
    //   style: {fontSize: 24, color: 'black',  fontWeight: 'bold'},
    // }}
    centerContainerStyle={{flex: 0}}
    containerStyle={[
      {
        backgroundColor: 'white',
        height: 70,
        borderWidth: 0,
        paddingBottom: 15,
        // justifyContent: 'space-around',
      },
      containerStyle,
    ]}
    {...restProps}
  />
);

BackHeader.defaultProps = {
  goBack: () => NavigationService.goBack(),
};

export default BackHeader;
