import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  SectionList,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import colors from '../../../../styles/colors';
import constants from '../../../../constants';
import convertForSectionList from '../../../../utils/convertForSectionList';
import i18n from '../../../../i18n';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import { BackHeaderCenter, ListItem } from '../../../../components';
import _ from 'lodash'
import ButtonBlack from '../../../../components/Button/ButtonBlack';
import {  Text} from '../../../../components';
import { globalStyles } from '../../../../styles';

const S = StyleSheet.create({});

const SelectSellerView = ({
  subcategory,
  material,
  color,
  printed,

  search,
  selectedCarMake,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  goToSubcategoryChoose,
  goToPersonalContact,
  goToMaterialChoose,
  goToPrintChoose,
  seller = {},
  saveSeller,
  setSeller,
  setShippingCountry,
  setShippingCountryCode,
  shipping_country,
  shipping_country_code,
  setSellerProperty,
  // selectedAddress,
  shippingAddresses,
  personalInfo,

  address,
  addresses,
  // setNumberPhone,
}) => {

  const getPhoneCountryCode = () => {
    if (phoneInput.current) {
      console.log('get code ...', phoneInput.current.getCountryCode());
      return '+' + phoneInput.current.getCountryCode();
    }
    return '';
  };

  const getCountryCode = () => {
    if (phoneInput.current) {
      console.log('get code ...', phoneInput.current.getCountryCode());
      return '+' + phoneInput.current.getCountryCode();
    }
    return '';
  };

  let phoneInput = useRef('');
  // let [phone, setPhone] = useState(seller.phone || "");
  let [phonecountry, setPhoneCountry] = useState('');
  let [error, setError] = useState('');
  // let [phoneCode, setPhoneCode] = useState(seller.phone_country_code || 1);

  // const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState({name: 'France', cca2: "FR"});
  
  const onSelect = country => {
    // console.log('country.cca2',country.cca2)
    setShippingCountryCode(country.cca2);
    setShippingCountry(country.name)
    setCountry(country);
  };


  const handleSubmit = () => {
    // if(setSeller){
    // if(_.isEmpty(seller.phoneCode)){
    //   setError('Phone code is required')
    //   return
    // }
    // else{
    //   setError('')
      
    // }
    // let newSeller = {
    //   // phone: seller[constants.phone],
    //   // phone_country_code: seller.phoneCode,
    //   personal_contact_information: address || addresses ? addresses[0] : {},
    // };
    let shipping_country = country ? country.name : ''
    let shipping_country_code = country ? country.cca2 : ''
    // console.log('newSeller', newSeller);
    // setSeller(newSeller);
    setShippingCountry(shipping_country)
    setShippingCountryCode(shipping_country_code)
    onDone();
  };

  const addresscomplete = () => {

    return (
      (address != null &&
        address.title != null &&
        address.first_name != null &&
        address.last_name != null &&
        // address.street != null &&
        address.address_line_2 != null &&
        // address.postcode != null &&
        address.city != null) ||
      (addresses[0] != null &&
        addresses[0].title != null &&
        addresses[0].first_name != null &&
        addresses[0].last_name != null &&
        // addresses[0].street != null &&
        addresses[0].address_line_2 != null &&
        // addresses[0].postcode != null &&
        addresses[0].city != null)
    );
  };


  const personalInfoCompleted = () => {
    return !_.isEmpty(seller.personal_contact_information)
  };

  
  const complete = () => {
    //console.log('seller.phone',seller.phone)
    //console.log('seller phoneCode',seller.phoneCode)
    //console.log('addresscomplete',addresscomplete())
    return (personalInfoCompleted() == true && shipping_country_code !== null
      && shipping_country !== null)
      // && !_.isEmpty(seller.phoneCode)
      // && !_.isEmpty(seller.phone)
  }
  // console.log('phone', phone);
  // console.log('addresses', addresses);
  // let filteredCars = cars.filter(c => c.carmake == selectedCarMake.title)
  // let models = []
  // filteredCars.map( c => {
  //     if(models.filter(car => c.model == car.title).length == 0){
  //         models.push({type: c.model_series || '', title : c.model})
  //     }
  // })
  // // // filteredCars = filteredCars
  // // const models = filteredCars.map(c => ())
  // const DATA = convertForSectionList(models, 'type')
  // //console.log('DATA',DATA)
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeaderCenter
        title="Seller"
      />
      <ListItem
        containerStyle={{backgroundColor: 'white'}}
        rightElement={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Text>{country ? country.name : ''}</Text> */}
            <CountryPicker
              {...{
                countryCode: shipping_country_code,
                onSelect,
                withCountryNameButton:true,
                withAlphaFilter:true,
                withFilter:true,
              }}
              // visible={}
            />
          </View>
        }
        title="Shipping Item From"
        titleStyle={globalStyles.leftListItem}
        bottomDivider
        // onPress={goToSubcategoryChoose}
      />
      {/* <ListItem
        title="Mobile number"
        rightElement={
          <View
            style={{alignItems: 'center', width: '50%', flexDirection: 'row'}}>
            <PhoneInput
              ref={phoneInput}
              style={{width: '25%'}}
              value={seller.phoneCode}
              initialCountry={seller.phoneCountry}
              onSelectCountry={phonecountry => {
                // setPhoneCountry(phonecountry)
                console.log('phonecountry',phonecountry)
                setSellerProperty(constants.phoneCountry, phonecountry)
                setSellerProperty(constants.phoneCode, phoneInput.current.getCountryCode())
                // setPhoneCode(phoneInput.current.getCountryCode())
              }}
              onChangePhoneNumber={code => {
                setSellerProperty(constants.phoneCode, code)
              }}
              />
            <Text>{seller[constants.phoneCode] || ""}</Text>
            <TextInput
              style={{
                width: '65%',
                borderLeftColor: 'black',
                borderBottomWidth: 1,
                marginLeft: 5
              }}
              keyboardType="number-pad"
              value={seller[constants.phone]}
              onChangeText={text => {
                setSellerProperty(constants.phoneCode, phoneInput.current.getCountryCode())
                setSellerProperty(constants.phone, text)}
              }
            />
          </View>
        }
        bottomDivider
        // onPress={goToMaterialChoose}
      /> */}
      <ListItem
        title="Personal Contact Information"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{personalInfoCompleted() ? 'saved' : ''}</Text>
          </View>
        }
        bottomDivider
        onPress={goToPersonalContact}
      />
      <Text style={{textAlign:'center', color: "red", marginVertical: 2}}>{error}</Text>
      <View
        style={{
          color: 'white',
          height: 75,
          marginHorizontal: 25,
          marginVertical: 15,
        }}>
        <ButtonBlack 
          disabled={!complete()}  
          color="black" 
          onPress={handleSubmit} 
          title="Submit" 
        />
      </View>
      {/* <ListItem
                    title="Payments"
                    rightElement={<View style={{flexDirection: "row"}}>
                        <PhoneInput ref='phone'/>
                        <TextInput keyboardType="number-pad" onChangeText={(text) => setNumberPhone(text)}/>
                    </View>}
                    bottomDivider
                    onPress={goToPrintChoose}
                    /> */}
    </View>
  );
};

SelectSellerView.defaultProps = {
  onDone: () => {},
};

export default SelectSellerView;
