import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import colors from '../../../../styles/colors';
import convertForSectionList from '../../../../utils/convertForSectionList';
import i18n from '../../../../i18n';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import { BackHeaderCenter } from '../../../../components';

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

  saveSeller,
  setSeller,
  setShippingCountry,
  setShippingCountryCode,
  shipping_country,
  shipping_country_code,
  // selectedAddress,
  shippingAddresses,

  address,
  addresses,
  // setNumberPhone,
}) => {
  // console.log('address',address)
  // console.log('addresses',addresses)
  /**
   * carmakes - {title,image}
   */
  let phoneInput = useRef('');
  let [phone, setPhone] = useState('');
  let [phonecountry, setPhoneCountry] = useState('');
  let [phoneCode, setPhoneCode] = useState('');

  // const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState({name: 'France'});
  const onSelect = country => {
    setShippingCountryCode(country.cca2);
    setCountry(country);
  };

  const handleSubmit = () => {
    // if(setSeller){
    let newSeller = {
      phone,
      country_code: getCountryCode(),
      personal_contact_information: address || addresses ? addresses[0] : {},
    };
    let shipping_country = country ? country.name : ''
    let shipping_country_code = countryCode
    console.log('newSeller', newSeller);
    setSeller(newSeller);
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

  console.log('phone', phone);
  console.log('addresses', addresses);
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

  const getCountryCode = () => {
    if (phoneInput.current) {
      console.log('get code ...', phoneInput.current.getCountryCode());
      return '+' + phoneInput.current.getCountryCode();
    }
    return '';
  };

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
        bottomDivider
        // onPress={goToSubcategoryChoose}
      />
      <ListItem
        title="Mobile number"
        rightElement={
          <View
            style={{alignItems: 'center', width: '50%', flexDirection: 'row'}}>
            <PhoneInput
              ref={phoneInput}
              style={{width: '25%'}}
              value={phoneCode}
              onSelectCountry={phonecountry => setPhoneCountry(phonecountry)}
              onChangePhoneNumber={code => setPhoneCode(code)}
              />
            <Text>{getCountryCode()}</Text>
            <TextInput
              style={{
                width: '65%',
                borderLeftColor: 'black',
                borderBottomWidth: 1,
              }}
              keyboardType="number-pad"
              onChangeText={text => setPhone(text)}
            />
          </View>
        }
        bottomDivider
        // onPress={goToMaterialChoose}
      />
      <ListItem
        title="Personal Contact Information"
        rightElement={
          <View style={{}}>
            <Text>{addresscomplete() ? 'saved' : ''}</Text>
          </View>
        }
        bottomDivider
        onPress={goToPersonalContact}
      />
      <View
        style={{
          color: 'white',
          height: 75,
          marginHorizontal: 25,
          marginVertical: 15,
        }}>
        <Button color="black" onPress={handleSubmit} title="Submit" />
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
