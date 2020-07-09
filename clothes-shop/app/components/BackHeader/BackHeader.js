import React from 'react';
import {
  Platform,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../styles/colors';
import globalStyles from '../../styles';
import {NavigationService} from '../../services';
import {   Text } from "../../components";

const BackHeader = ({goBack, containerStyle, hideBack, title, ...restProps}) => (
  <Header
    leftComponent={
      // <View >
        <TouchableOpacity style={{height: '100%', justifyContent:'center'}} 
          onPress={goBack}>
          <Entypo name="chevron-thin-left" size={25} color={colors.orange} />
          {/* <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: 'bold',
              paddingHorizontal: 5,
            }}>
            {title}
          </Text> */}
        </TouchableOpacity>
        // {/* <View style={{height: '100%', justifyContent:'center'}}> */}

        // {/* </View> */}

      // </View>
    }
    centerComponent={{
      text: title,
      style: {fontSize: 20, color: 'black',  ...globalStyles.text},
    }}
    placement="left"
    // centerContainerStyle={{flex: 0}}
    containerStyle={[
      {
        backgroundColor: 'white',
        minHeight: 40,
        borderWidth: 0,
        paddingBottom: 5,
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