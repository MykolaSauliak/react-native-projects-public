import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../../styles';
import colors from '../../../styles/colors';
import i18n from '../../../i18n';
import {Input} from 'react-native-elements';
import {NavigationService, AuthService} from '../../../services';
import AvatarUpload from '../../../containers/AvatarUpload';
import {BackHeader, BackHeaderCenter, Loading} from '../../../components';
import {Formik} from 'formik';
import {ShopService} from '../../../services';
import ButtonBlack from '../../../components/Button/ButtonBlack'
import { setLoading } from '../../../features/user/actions';
import {  Text} from '../../../components';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const S = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.dark,
  },
  bottomRightIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  footer: {
    padding: 15,
    fontSize: widthPercentageToDP(4.6),
    lineHeight: 25
  },
  headerTitle: {
    fontWeight: 'bold', 
    fontSize: widthPercentageToDP(6), 
    paddingVertical: 15
  },
  inputLabel: {
    fontWeight: 'bold', 
    fontSize: widthPercentageToDP(5), 
    paddingVertical: 15,
    color: 'black'
  }
});

const AccountDetails = ({
  addresses,
  onPress,
  toNewAddress,
  selectAddress,
  removeShippingAddress,
  loggedInUser,
  updateUser,
  loading,
  setLoading,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeaderCenter 
        title="My details" 
        rightComponent={loading && <Loading />} 
        />
      <ScrollView>
        <View style={{padding: 15}}>
          <Text style={S.headerTitle}>
            Profile details
          </Text>
          <View
            style={{
              alignItems: 'flex-start',
              backgroundColor: 'white',
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}>
            <AvatarUpload containerStyle={{padding: 10 }}   containerStyle={{marginBottom: 15}} />
            <View style={{flex: 1, width: '100%'}}>
              <Formik
                initialValues={{
                  email: loggedInUser.email,
                  name: loggedInUser.name,
                  last_name: loggedInUser.last_name,
                  bio: loggedInUser.bio,
                }}
                onSubmit={async values => {
                  console.log('values', values);
                  setLoading(true)
                  try{
                    await ShopService.updateUserInfo(values);
                    updateUser(values);
                  }catch(err){

                  }
                  setLoading(false)
                  // NavigationService.navigateToProfile();
                }}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <View style={{flex: 1}}>
                    <Input
                      inputContainerStyle={{color: 'black'}}
                      labelStyle={S.inputLabel}
                      containerStyle={{marginBottom: 10}}
                      label="First name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                    />
                    <Input
                      inputContainerStyle={{color: 'black'}}
                      labelStyle={S.inputLabel}
                      containerStyle={{marginBottom: 10}}
                      label="Surname"
                      onChangeText={handleChange('last_name')}
                      value={values.last_name}
                    />
                    <Input
                      inputContainerStyle={{color: 'black'}}
                      labelStyle={{fontSize: 12, color: 'black'}}
                      containerStyle={{marginBottom: 10}}
                      label="Biography"
                      labelStyle={S.inputLabel}
                      onChangeText={handleChange('bio')}
                      value={values.bio}
                    />
                    <Input
                      inputContainerStyle={{color: 'black'}}
                      labelStyle={S.inputLabel}
                      containerStyle={{marginBottom: 10}}
                      disabled
                      label="Email"
                      onChangeText={handleChange('email')}
                      value={values.email}
                    />
                    {/* <TextInput
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    /> */}
                                    
                    <ButtonBlack
                      onPress={handleSubmit}
                      title="Submit"
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
          <Text style={S.footer}>Information collected is processed electronically in order to manage the service providedby the Site</Text>
          <ButtonBlack 
            title="DEACTIVATE MY ACCOUNT" 
            titleStyle={{color: "white"}} 
            containerStyle={{paddingHorizontal: 10}}
            onPress={() => AuthService.logout()}
            // containerStyle={{backgroundColor:null}} 
            />
        </View>
      </ScrollView>
    </View>
  );
};

AccountDetails.defaultProps = {
  onPress: address => {
    NavigationService.navigateToAddressEditor({...address});
  },
  toNewAddress: () => NavigationService.navigateToAddressEditor(),
};

export default AccountDetails;
