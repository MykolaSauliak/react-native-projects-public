import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import globalStyles from '../../constants/styles';
import colors from '../../styles/colors';
import i18n from '../../i18n';
import AddressList from '../../containers/AddressList';
import StepIndicator from 'react-native-step-indicator';
import {CheckBox, ListItem} from 'react-native-elements';
import constants from '../../constants';
import {PaymentMethod, Review, ChooseCard} from './components';
import {StripeService, NavigationService} from '../../services';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';

// import {
//     ButtonGroup
// } from 'react-native-elements';
const SelectAddress = () => <View />;

const S = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.dark,
  },
});

const CheckoutScreenView = ({}) => {
  let [useSameAddressForBilling, setUseSameBillingAddress] = useState(false);
  let [paymentMethod, choosePayment] = useState(null);
  let [token, setToken] = useState(null);
  let [paymentModalVisible, setPaymentModalVisible] = useState(false);
  let [safeOrder, safeOrderChange] = useState(false);
  let [selectedAddress, setSelectedAddress] = useState({});
  let [selectedBillingAddress, setSelectedBillingAddress] = useState({});
  let [selectedIndex, updateIndex] = useState(0);
  const labels = [
    'Invoice & Delivery',
    'Billing address',
    'Payment Method',
    'Confirmation',
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: 'black',
    // stepStrokeCurrentColor: 'black',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: 'black',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: 'black',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: 'black',
    // stepIndicatorFinishedColor: 'black',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: 'black',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    // labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: 'black',
  };

  console.log('token', token);
  // console.log('safeOrder',safeOrder)
  // console.log('selectedAddress',selectedAddress)
  // const component1 = () => <TouchableOpacity disabled><Text>1</Text></TouchableOpacity>
  // const component2 = () => <TouchableOpacity disabled><Text>2</Text></TouchableOpacity>
  // const component3 = () => <TouchableOpacity disabled><Text>3</Text></TouchableOpacity>
  // const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]

  // const _renderOrder = ({ id, first_name, email, last_name, postal_code, orderStatus, createdAt, updatedAt, items = [] }) => (
  //     <View style={{padding: 10,borderRadius :10, backgroundColor : "white"}}>
  //         <Text>{i18n.t('myorders.orderid')} {id}</Text>
  //         <Text>{first_name} {last_name} </Text>
  //         <Text>{email} </Text>
  //         <Text>{i18n.t('myorders.orderstatus')} {orderStatus}</Text>
  //         <Text>{i18n.t('myorders.postalcode')} {postal_code} </Text>
  //         {/* <Text>Items: </Text> */}
  //         {createdAt && <Text>{i18n.t('myorders.createdtime')} {createdAt}</Text> }
  //         {updatedAt && <Text>{i18n.t('myorders.lastupdate')} {updatedAt} </Text> }
  //     </View>
  // )
  // const _renderHeader = (cart=false) => (
  //     <View style={S.header}>
  //         <View style={{flex:.25, flexDirection:'row', justifyContent:'space-around' }}>
  //         </View>
  //         <Text style={[globalStyles.text, {flex: 0.5, textAlign:'center', color: 'white', fontWeight: 'bold'}]}>My orders</Text>
  //     </View>
  // )

  let ActiveElement = null;
  console.log('selectedIndex', selectedIndex);
  switch (selectedIndex) {
    case 0:
      ActiveElement = (
        <>
          <CheckBox
            // checkedIcon={<Image source={require('../checked.png')} />}
            // uncheckedIcon={<Image source={require('../unchecked.png')} />}
            checkedColor="black"
            checked={useSameAddressForBilling}
            title="Use the same address for the billing"
            onPress={() => setUseSameBillingAddress(!useSameAddressForBilling)}
          />
          <AddressList
            onPress={address => {
              if (useSameAddressForBilling) {
                updateIndex(2);
              } else {
                updateIndex(1);
              }
              setSelectedAddress(address);
            }}
          />
          <TouchableOpacity
            onPress={() => NavigationService.navigateToAddressEditor()}>
            <Text style={{textAlign: 'center'}}>{'add address'}</Text>
          </TouchableOpacity>
        </>
      );
      break;
    case 1:
      ActiveElement = (
        <>
          <AddressList
            onPress={address => {
              updateIndex(2);
              setSelectedBillingAddress(address);
            }}
          />
          <TouchableOpacity
            onPress={() => NavigationService.navigateToAddressEditor()}>
            <Text style={{textAlign: 'center'}}>{'add address'}</Text>
          </TouchableOpacity>
        </>
      );
      break;
    case 2:
      ActiveElement = (
        <PaymentMethod
          chooseToken={setToken}
          updateIndex={updateIndex}
          choosePayment={paymentMethod => {
            choosePayment(paymentMethod);
          }}
        />
      );
      break;
    case 3:
      ActiveElement = (
        <Review
          token={token}
          updateIndex={updateIndex}
          paymentMethod={paymentMethod}
          shippingAddress={selectedAddress}
          safe_order={safeOrder}
          safeOrderChange={value => safeOrderChange(value)}
        />
      );
      break;
    default:
      ActiveElement = null;
  }
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      {/* <Modal isVisible={paymentModalVisible}>
                <Payment/>
            </Modal> */}
      <ScrollView style={{flex: 1}}>
        <View style={{padding: 15}}>
          <StepIndicator
            stepCount={4}
            customStyles={customStyles}
            currentPosition={selectedIndex}
            labels={labels}
            labelColor={colors.gray}
            onPress={position => updateIndex(position)}
          />
        </View>
        {ActiveElement}
      </ScrollView>
    </View>
  );
};

export default CheckoutScreenView;
