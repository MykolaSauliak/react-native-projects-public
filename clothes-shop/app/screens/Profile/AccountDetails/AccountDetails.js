import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../../constants/styles';
import colors from '../../../styles/colors';
import i18n from '../../../i18n';
import {ListItem, Icon, Input} from 'react-native-elements';
import {NavigationService} from '../../../services';
import AvatarUpload from '../../../containers/AvatarUpload';
import {BackHeader} from '../../../components';
import {Formik} from 'formik';
import {ShopService} from '../../../services';
import ButtonBlack from '../../../components/Button/ButtonBlack'

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
});

const AccountDetails = ({
  addresses,
  onPress,
  toNewAddress,
  selectAddress,
  removeShippingAddress,
  loggedInUser,
  updateUser,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeader title="My details" />
      <ScrollView>
        <View style={{padding: 15}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, paddingVertical: 15}}>
            Profile details
          </Text>
          <View
            style={{
              alignItems: 'flex-start',
              backgroundColor: 'white',
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}>
            <AvatarUpload containerStyle={{marginBottom: 15}} />
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
                  await ShopService.updateUserInfo(values);
                  updateUser(values);
                  NavigationService.navigateToProfile();
                }}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <View style={{flex: 1}}>
                    <Input
                      inputContainerStyle={{color: 'black'}}
                      labelStyle={{fontSize: 12, color: 'black'}}
                      containerStyle={{marginBottom: 10}}
                      label="First name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                    />
                    <Input
                      inputContainerStyle={{color: 'black'}}
                      labelStyle={{fontSize: 12, color: 'black'}}
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
                      onChangeText={handleChange('bio')}
                      value={values.bio}
                    />
                    <Input
                      inputContainerStyle={{color: 'black'}}
                      labelStyle={{fontSize: 12, color: 'black'}}
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
