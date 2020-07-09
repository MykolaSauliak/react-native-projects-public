import React, {useState} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalColors from '../../../../styles/colors';
import constants from '../../../../constants';
import ItemsList from '../../../../components/ItemsList';
import i18n from '../../../../i18n';
import S from './SelectSellPrice.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';
import { BackHeaderCenter, Input } from '../../../../components';
import {  Text} from '../../../../components';
import { globalStyles } from '../../../../styles';
import ButtonBlack from '../../../../components/Button/ButtonBlack';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const SelectSellPriceView = ({
  description,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  setSellDescription,
  setSellPrice,
  setSelectedSellPrice,
}) => {
  let [closed, setClosed] = useState(true);
  let [price, setPrice] = useState(0);
  let [error, setError] = useState("");
  let [currency, setCurrency] = useState('USD');

  let sheetInitialHeight = 80;

  const renderContent = () => (
    <View
      style={{
        padding: 10,
        backgroundColor: globalColors.weLoveColor || 'gray',
        height: constants.DEVICE_HEIGHT,
      }}>
      <View style={{width: '100%', alignItems: 'center'}}>
        {closed ? (
          <AntDesign name="up" size={15} />
        ) : (
          <AntDesign name="down" size={15} />
        )}
      </View>
      <Text style={[S.text, globalStyles.botomSheetTitle]}>
        What is the right price for my item?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={[S.text, globalStyles.botomSheetSubtitle]}>
        You will find prices of similar items yo yours below.Remember we have an
        experienced community and too high a price may affect the sale of your
        item
      </Text>
    </View>
  );

  const getForYouPrice  = () => {
    return price * constants.priceCoef
  }


  return (
    <View style={{flex: 1, backgroundColor: globalColors.gray}}>
      <BottomSheet
        onCloseEnd={() => setClosed(true)}
        onOpenEnd={() => setClosed(false)}
        snapPoints={[sheetInitialHeight, constants.DEVICE_HEIGHT * 0.9]}
        renderContent={renderContent}
        // renderHeader = {renderHeader}
      />
      <View style={{flex: 1, paddingBottom: sheetInitialHeight, }}>
        <BackHeaderCenter
          rightComponent={{
            icon: 'check',
            color: '#000',
            onPress: () => {
              setSelectedSellPrice({price, currency});
              onDone();
            },
          }}
          title="Price"
        />
        {/* <Text style={{opacity:0.5, padding: 5,paddingHorizontal: 15, fontStyle: 'italic', fontSize: 15, marginVertical : 15, textAlign : 'left'}}>
                </Text>  */}
        {/* <ListItem
          topDivider
          leftElement={
            <View
              style={{
                justifyContent: 'flex-start',
                height: 150,
                width: constants.DEVICE_WIDTH * 0.4,
                // height: '100%',
              }}>
              <TextInput
                onChangeText={price => setPrice(price)}
                style={{fontSize: 16, padding: 0, borderBottomWidth: 3}}
                keyboardType="number-pad"
              />
              <Text style={S.forYour}>{'For you:'}</Text>
              <Text style={S.yourPrice}>
                {price * constants.priceCoef} {currency}
              </Text>
            </View>
          }
          rightElement={
            <View
              style={{
                width: constants.DEVICE_WIDTH * 0.4,
                justifyContent: 'flex-start',
                height: '100%',
              }}>
              <RNPickerSelect
                onValueChange={value => setCurrency(value)}
                value={currency}
                items={[
                  // {label: 'AUD', value: 'AUD'},
                  {label: '$ USD', value: 'USD'},
                ]}
              />
            </View>
          }
          bottomDivider
        /> */}
        <View style={{padding: 10, alignItems:'center'}}>
            <Text style={{ opacity: 0.5,  fontSize: widthPercentageToDP(5)}}>Enter new price:</Text>
            <View style={{width: "70%" }}>
                <Input 
                    inputType="number" 
                    onChangeText={(text) => {
                        setPrice(text)
                        setError("")
                    }}
                    placeholder="200"
                    keyboardType="number-pad"
                    value={price}
                    inputContainerStyle={{color: 'black'}}
                    inputStyle={{color: 'black'}}
                    errorMessage={error}
                    />
            </View>
            <Text style={{marginTop: 20, opacity: 0.5, fontSize: widthPercentageToDP(5)}}>For you:</Text>
            <Text style={{ opacity: 0.5,  fontSize: widthPercentageToDP(5)}}>{getForYouPrice()}</Text>
            <Text style={{ fontSize: widthPercentageToDP(6), textAlign:'center', marginTop: 20, lineHeight: 25}}>The new price of your item will appear on your item page:</Text>
            <Text  style={{ fontSize: widthPercentageToDP(5),color: "red", fontWeight: "bold", marginTop: 10,  lineHeight: 25}}>{price} USD</Text>
          {/* <Input 
              onChangeText={price => setPrice(price)}
              style={{fontSize: 16, padding: 0, borderBottomWidth: 3}}
              keyboardType="number-pad"
              />
            <Text style={S.forYour}>{'For you:'}</Text>
            <Text style={S.yourPrice}>
              {price * constants.priceCoef} {currency}
            </Text> */}

        </View>
        {/* <View> */}
        <ButtonBlack
          containerStyle={{paddingHorizontal: 15, marginTop: 25}} 
            title="CONFIRM"
          />
        {/* </View> */}
      </View>
    </View>
  );
};

SelectSellPriceView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellPriceView;
