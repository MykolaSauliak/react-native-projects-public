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
import ProgressSteps from '../../../components/ProgressSteps/ProgressSteps'
import Feather from "react-native-vector-icons/Feather";
import Collapsible from 'react-native-collapsible';

const SeeMore = ({
  title = "", 
  titleStyle = {},
  collapseTextStyle={},
  headerStyle = {},
  collapseText = "",
  btnText = 'Show',
  hideBtnText = 'Hide',
}) => {

  let [isCollapsed, setCollapsed] = React.useState(true)

  return (
    <View style={[{width: "100%"}, ]}>
        <View style={[{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, headerStyle]}>
          <Text style={[titleStyle]} bold largeSize>{title}</Text>
          <TouchableOpacity onPress={() => setCollapsed(!isCollapsed)}>
            {isCollapsed ? <Text bold>{btnText}</Text> : <Text bold>{hideBtnText}</Text>}
          </TouchableOpacity>
        </View>
        <Collapsible collapsed={isCollapsed}>
          <Text style={[collapseTextStyle]}>
            {collapseText}
          </Text>
        </Collapsible>
    </View>
  )
}

const Stats = ({

}) => {
    return (
        <View style={{flex:1}}>
            <BackHeader title="My stats"/>
            <ScrollView>
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

            {/* <View style={{padding: 20, width: '100%'}}>
                <Text xmediumSize bold style={{paddingBottom: 10}}>To become Trusted Seller</Text>
                <View style={{paddingLeft: 15}}>
                    <Text><Text bold>Volume:</Text> Sell 2 more items</Text>
                    <Text><Text bold>Conformity:</Text>Ensure item descriptions conform to reality</Text>
                    <Text><Text bold>Shipping:</Text> Sell 2 more items</Text>
                </View>
            </View> */}
            <View style={{flex:1, backgroundColor: colors.gray}}>
              <View style={{backgroundColor: 'white', marginTop: 14, paddingHorizontal: 20,}}>
                  <SeeMore 
                    title="Volume" 
                    headerStyle={{marginBottom: 15}}
                    titleStyle={{textTransform: 'uppercase', paddingVertical: 10}}
                    collapseTextStyle={{opacity: 0.5, lineHeight: 22}}
                    collapseText={`To qualify as a Trusted Seller, sell 2 items in the span of 4 month.\n- Trusted: 2 items sold\n- Expert: 5 items sold`}/>
                  <ProgressSteps 
                      unfilledColor={colors.gray}
                      color={colors.black}
                      borderWidth={0.5}
                      height={5}
                      progress={0.0}
                      containerStyle={{marginTop: 25, marginBottom: 25}}
                      pointerTitle={"0 items sold"}  
                      showLines={true}
                      bedges={[
                        {
                            progress: 0.4,
                            Component: <View style={{alignItems:'center'}}>
                                <Feather name="award" size={25}  color={colors.orange} /> 
                                <Text bold smallSize style={{marginLeft: 1}}>2</Text>
                              </View>
                        },
                        {
                            progress: 1,
                            Component: <View style={{alignItems:'center'}}>
                            <Feather name="award" size={25}  color={colors.orange} /> 
                            <Text bold smallSize style={{marginLeft: 1}}>5</Text>
                          </View>
                        }
                      ]}
                      />

                </View>
                <View style={{backgroundColor: 'white', marginTop: 14, paddingHorizontal: 20,}}>
                  <SeeMore 
                    title="CONFORMITY" 
                    headerStyle={{marginBottom: 15}}
                    titleStyle={{textTransform: 'uppercase', paddingVertical: 10}}
                    collapseTextStyle={{opacity: 0.5, lineHeight: 22}}
                    collapseText={`To qualify as a Trusted Seller, 100% of items sold in the past 4 months must have been genuine; 80% of these items must have conformed to their description\n- Trusted: 80 %\n- Expert: 90 %`}/>
                  <ProgressSteps 
                      unfilledColor={colors.gray}
                      color={colors.black}
                      borderWidth={0.5}
                      progress={0.0}
                      height={5}
                      containerStyle={{marginTop: 15, marginBottom: 25}}
                      pointerTitle={"0 %"}  
                      showLines={true}
                      bedges={[
                        {
                            progress: 0.8,
                            Component: <View style={{alignItems:'center'}}>
                                <Feather name="award" size={25}  color={colors.orange} /> 
                                <Text bold smallSize style={{marginLeft: 2}}>80%</Text>
                              </View>
                        },
                        {
                            progress: 0.9,
                            Component: <View style={{alignItems:'center'}}>
                            <Feather name="award" size={25}  color={colors.orange} /> 
                            <Text bold smallSize style={{marginLeft: 2}}>90%</Text>
                          </View>
                        }
                      ]}
                      />
                </View>
                <View style={{backgroundColor: 'white', marginTop: 14, paddingHorizontal: 20,}}>
                  <SeeMore 
                    title="Shipping" 
                    headerStyle={{marginBottom: 15}}
                    titleStyle={{textTransform: 'uppercase', paddingVertical: 10}}
                    collapseTextStyle={{opacity: 0.5, lineHeight: 22}}
                    collapseText={`To qualify as a Trusted Seller, 80& of items sold in the past 4 month must have shipped within 5 days\n -Trusted: 80 %\n- Expert: 90 %`}/>
                  <ProgressSteps 
                      unfilledColor={colors.gray}
                      color={colors.black}
                      borderWidth={0.5}
                      progress={0}
                      height={5}
                      containerStyle={{marginTop: 15, marginBottom: 25}}
                      pointerTitle={"0 %"}  
                      showLines={true}
                      bedges={[
                        {
                            progress: 0.8,
                            Component: <View style={{alignItems:'center'}}>
                                <Feather name="award" size={25}  color={colors.orange} /> 
                                <Text bold smallSize style={{marginLeft: 5}}>80%</Text>
                              </View>
                        },
                        {
                            progress: 0.9,
                            Component: <View style={{alignItems:'center'}}>
                            <Feather name="award" size={25}  color={colors.orange} /> 
                            <Text bold smallSize style={{marginLeft: 5}}>90%</Text>
                          </View>
                        }
                      ]}
                      />
                </View>
               
              </View>   
            </ScrollView>          
            <View style={{padding: 15}}>
                <ButtonBlack title="SELL NOW" onPress={() => NavigationService.navigateToDrafts()}/>
            </View>
        </View>
    );
};

export default Stats;