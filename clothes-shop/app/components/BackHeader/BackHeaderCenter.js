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
import {NavigationService} from '../../services';
import {   Text } from "../../components";
import globalStyles from "../../styles";

const BackHeader = ({hideBack, goBack, containerStyle, title, ...restProps}) => (
  <Header
    leftComponent={!hideBack && 
      (<View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={goBack}>
          <Entypo name="chevron-thin-left" size={25} color={colors.orange} />
        </TouchableOpacity>
      </View>)
    }
    // centerComponent={{
    //   text: title,
    //   style: {fontSize: 24, color: 'black',  fontWeight: 'bold'},
    // }}
    containerStyle={[
      {
        backgroundColor: 'white',
        minHeight: 40,
        borderBottomWidth:0,
        // borderBottomColor:'black',
        margin:0,
        padding:0,
        paddingBottom: 5,

        // justifyContent: 'space-around',
      },
      containerStyle,
    ]}
    centerComponent={{
        text: title,
        style: {fontSize: 20, color: '#000',  ...globalStyles.boldText},
        numberOfLines: 1
      }}
    {...restProps}
  />
);

BackHeader.defaultProps = {
  goBack: () => NavigationService.goBack(),
};

export default BackHeader;