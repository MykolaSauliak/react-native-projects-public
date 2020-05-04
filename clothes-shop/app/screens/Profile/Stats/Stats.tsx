import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { CheckBox, Header} from 'react-native-elements';
import colors from '../../../styles/colors';
import i18n from '../../../i18n';
import {NavigationService} from '../../../services';
import ShippingCartIcon from '../../../containers/ShippingCartIcon';
import AvatarUpload from '../../../containers/AvatarUpload';
import UserInfo  from '../../../components/UserInfo/UserInfo'
import { BackHeader } from '../../../components';
import ListItem from '../../../components/ListItem/ListItem';
import NotAuthorizedUser from '../../../components/NotAuthorizedUser/NotAuthorizedUser'
import globalStyles from '../../../constants/styles'
import Text from '../../../components/Text/Text';
import ButtonBlack from '../../../components/Button/ButtonBlack';

const Stats = ({

}) => {
    return (
        <View style={{flex:1}}>
            <BackHeader title="My stats"/>
            <View
              style={{aspectRatio: 3 / 1, width: '100%', flexDirection: 'row', alignItems : "flex-start", paddingTop: 15}}>
              <View style={{flex: 0.3}}>
                <AvatarUpload disabled/>
              </View>
              <View  style={{flex: 0.7, justifyContent:'flex-start'}}>
                <Text style={{...globalStyles.text, fontWeight: 'bold', lineHeight : 26}}>
                    Start selling and become 
                    a Trusted Seller!
                  </Text>
              </View>
            </View>

            <View style={{padding: 20}}>
                <Text xmediumSize bold style={{paddingBottom: 10}}>To become Trusted Seller</Text>
                <View style={{paddingLeft: 15}}>
                    <Text><Text bold>Volume:</Text> Sell 2 more items</Text>
                    <Text><Text bold>Conformity:</Text>Ensure item descriptions conform to reality</Text>
                    <Text><Text bold>Shipping:</Text> Sell 2 more items</Text>
                </View>
            </View>
            <View style={{padding: 15}}>
                <ButtonBlack title="SELL NOW" onPress={() => NavigationService.navigateToDrafts()}/>
            </View>
        </View>
    );
};

export default Stats;