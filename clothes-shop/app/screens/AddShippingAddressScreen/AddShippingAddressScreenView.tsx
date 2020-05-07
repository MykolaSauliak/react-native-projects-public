import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator, 
  KeyboardAvoidingView   ,
  Platform
} from 'react-native';
import S from './styles';
import globalStyles from '../../constants/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../styles';
import constants from '../../constants';
import {ListItem, Header} from 'react-native-elements';
import {List, Checkbox} from 'react-native-paper';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import {Formik} from 'formik';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CountryPicker from 'react-native-country-picker-modal';
import {Address} from '../../types'
import {BackHeaderCenter, Input } from '../../components'
import ButtonBlack from '../../components/Button/ButtonBlack'
// import { CountryCode, Country } from './types'
import * as Yup from 'yup';
const uuidv4 = require('uuid/v4');

let radio_props = [
  {label: 'Mr', value: 'Mr'},
  {label: 'Mrs', value: 'Mrs'},
  {label: 'Company', value: 'Company'},
];

const AddressSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  company: Yup.string(),
  phone_number: Yup.number()
    .required('Required'),
  address: Yup.string()
    .required('Required'),
  address_line_2: Yup.string()
    .required('Required'),
  postal_code: Yup.string()
    .required('Required'),
  city: Yup.string()
    .required('Required'),
  // countryCode: Yup.string()
  //   .required('Required'),
  // country: Yup.object({
  //     name : Yup.string()
  //   }).required('Required'),
});

const AddShippingAddressScreenView = ({
  onDone,
  address,
  addresses,
  addAddress,
}) => {
  if (!address) {
    address = {};
  }
  // //console.log('categories length',subcategories.length);
  // console.log('subcategories length',subcategories.length);

  let [closed, setClosed] = useState(true);
  let sheetInitialHeight = 80;

  const [countryCode, setCountryCode] = useState('FR');
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [country, setCountry] = useState({name: 'France'});
  const [title, setTitle] = useState('Mr');

  const onSelect = (country: Country) => {
    console.log();
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const renderContent = () => (
    <View
      style={{
        padding: 10,
        backgroundColor: colors.weLoveColor || 'gray',
        height: constants.DEVICE_HEIGHT,
      }}>
      <View style={{width: '100%', alignItems: 'center'}}>
        {closed ? (
          <AntDesign name="up" size={15} />
        ) : (
          <AntDesign name="down" size={15} />
        )}
      </View>
      <Text style={[globalStyles.text, {opacity: 0.5}]}>
        Why are you asking me for this information?
      </Text>
      <View style={{width: 50, marginVertical: 15, borderWidth: 2}} />
      <Text style={globalStyles.text}>
        These details enable us to fill out the pre-paid shipping voucher that
        will be provided to you when your item has sold. You will only beb asked
        for these once, when you make your first consignment
      </Text>
    </View>
  );

  let inputStyle = {
    fontSize: 12,
    // textAlign: 'flex-start',
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BottomSheet
        onCloseEnd={() => setClosed(true)}
        onOpenEnd={() => setClosed(false)}
        snapPoints={[sheetInitialHeight, constants.DEVICE_HEIGHT * 0.9]}
        renderContent={renderContent}
        // renderHeader = {renderHeader}
      />
      <View style={{flex: 1, paddingBottom: sheetInitialHeight}}>
        <BackHeaderCenter
          title="Personal Contact Information"
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
          />
        <ScrollView>
          <Text
            style={{
              opacity: 0.5,
              padding: 5,
              paddingHorizontal: 15,
              fontStyle: 'italic',
              fontSize: 15,
              marginVertical: 15,
              textAlign: 'left',
            }}>
            This information will not be publicly displayed
          </Text>
          <Formik
            initialValues={{
              title: address.title || 'Mr',
              first_name: address.first_name,
              last_name: address.last_nam,
              company: address.company,
              phone_number: address.phone_number,
              phone_country_code: address.phone_country_code,
              // country : '',
              // country : 'Spain',
              // street: address.street || '',
              // house: address.house || '',
              address: address.address,
              address_line_2: address.address_line_2,
              postal_code: address.postal_code,
              city: address.city,
            }}
            validationSchema={AddressSchema}
            onSubmit={(values, actions) => {
              let newAddress : Address = {
                  id: uuidv4(),
                  countryCode, 
                  title,
                  country,
                  ...values,
              }
              console.log('new address',newAddress)
              addAddress(newAddress);
              actions.resetForm();
              onDone();
            }}>
            {({errors, handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                {/* <Text style={S.title}>Personal Information</Text> */}
                <ListItem
                  title="Title"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  rightElement={
                    <View style={{justifyContent: 'center', height: '100%'}}>
                      <RadioForm
                        buttonColor={'gray'}
                        buttonSize={10}
                        selectedButtonColor={'gray'}
                        buttonOuterSize={16}
                        style={{alignItems: 'center', justifyContent: 'center'}}
                        // buttonWrapStyle={{marginLeft: 10, alignItems: 'center'}}
                        labelStyle={{
                          fontSize: 12,
                          color: 'black',
                          marginRight: 15,
                        }}
                        // labelWrapStyle={{}}
                        radio_props={radio_props}
                        initial={'Mr'}
                        formHorizontal={true}
                        value={title}
                        animated={false}
                        onPress={value => setTitle(value)}
                      />
                    </View>
                  }
                  // onBlur={handleBlur('first_name')}
                  // value={values.first_name}
                  bottomDivider
                />
                <ListItem
                  title="First name"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.first_name, onChangeText: handleChange('first_name'), 
                  //   inputStyle
                  // }}
                  rightElement={<Input 
                    errorMessage={errors.first_name}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    value={values.first_name}
                    containerStyle={{
                      width: '50%'
                    }}
                  />}
                  bottomDivider
                />
                <ListItem
                  title="Last name"
                  titleStyle={S.listItemTitle}
                  containerStyle={S.listItemcontainerStyle}
                  rightElement={<Input 
                    errorMessage={errors.last_name}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    value={values.last_name}
                    containerStyle={{
                      width: '50%'
                    }}
                  />}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.last_name, 
                  //   onChangeText: handleChange('last_name'), 
                  //   inputStyle,
                  //   // inputContainerStyle: {
                  //   //   justifyContent:'flex-start'
                  //   // }
                  // }}
                  bottomDivider
                />
                <ListItem
                  title="Company"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.company, onChangeText: handleChange('company'), inputStyle}}
                  rightElement={<Input 
                    errorMessage={errors.company}
                    onChangeText={handleChange('company')}
                    onBlur={handleBlur('company')}
                    value={values.company}
                    containerStyle={{
                      width: '50%'
                    }}
                  />}
                  bottomDivider
                />
                <ListItem
                  title="Phone number"
                  containerStyle={[S.listItemcontainerStyle, {height:null ,minHeight: 75}]}
                  titleStyle={S.listItemTitle}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.phone_number, onChangeText: handleChange('phone_number'), inputStyle}}
                  rightElement={<Input 
                    errorMessage={errors.phone_number}
                    onChangeText={handleChange('phone_number')}
                    onBlur={handleBlur('phone_number')}
                    value={values.phone_number}
                    containerStyle={{
                      width: '50%'
                    }}
                  />}
                  bottomDivider
                />
                <ListItem
                  title="Country"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  onPress={() => setCountryModalVisible(!countryModalVisible)}
                  rightElement={
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {errors.country && <Text>{errors.country}</Text>}
                      <Text style={S.country}>
                        {country ? country.name : ''}
                      </Text>
                      <CountryPicker
                        {...{
                          countryCode,
                          onSelect,
                          withAlphaFilter : true,
                          withFilter : true,
                        }}
                        visible={countryModalVisible}
                      />
                    </View>
                  }
                  // onChangeText={handleChange('address')}
                  // onBlur={handleBlur('address')}
                  // value={values.address}
                  bottomDivider
                />

                <ListItem
                  title="Address"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  // input={{
                    // errorStyle : {position: "absolute", bottom: 0},
                    // errorMessage:errors.address, onChangeText: handleChange('address'), inputStyle}}
                  rightElement={<Input 
                      errorMessage={errors.address}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                      containerStyle={{
                        width: '50%'
                      }}
                  />}
                  bottomDivider
                />
                <ListItem
                  title="Address line 2"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.address_line_2,
                  //   onChangeText: handleChange('address_line_2'),
                  //   inputStyle,
                  // }}
                  rightElement={<Input 
                      errorMessage={errors.address_line_2}
                      onChangeText={handleChange('address_line_2')}
                      onBlur={handleBlur('address_line_2')}
                      value={values.address_line_2}
                      containerStyle={{
                        width: '50%'
                      }}
                  />}
                  bottomDivider
                />
                <ListItem
                  title="Postcode"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.postal_code,onChangeText: handleChange('postal_code'), inputStyle}}
                  rightElement={<Input 
                    errorMessage={errors.postal_code}
                    onChangeText={handleChange('postal_code')}
                    onBlur={handleBlur('postal_code')}
                    value={values.postal_code}
                    containerStyle={{
                      width: '50%'
                    }}
                  />}
                  bottomDivider
                />
                <ListItem
                  title="City"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.city,onChangeText: handleChange('city'), inputStyle}}
                  rightElement={<Input 
                    errorMessage={errors.city}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                    containerStyle={{
                      width: '50%'
                    }}
                  />}
                  bottomDivider
                />
                <View
                  style={{
                    color: 'white',
                    height: 75,
                    marginHorizontal: 25,
                    marginVertical: 15,
                  }}>
                  <ButtonBlack onPress={handleSubmit} title="Submit"/>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default AddShippingAddressScreenView;
