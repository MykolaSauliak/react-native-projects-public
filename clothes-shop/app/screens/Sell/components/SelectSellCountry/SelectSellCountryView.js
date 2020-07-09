import React, {useState} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SearchBar, Header} from 'react-native-elements';
import colors from '../../../../styles/colors';
import S from './SelectSellCountry.style';
import {BackHeaderCenter, ListItem} from '../../../../components'
import {  Text} from '../../../../components';

const SelectSellCountryView = ({
  countries,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
}) => {
  let [searchText, setSearchText] = useState('');
  let [closed, setClosed] = useState(true);
  let sheetInitialHeight = 80;

  if (searchText && searchText.length > 0) {
    countries = countries.filter(
      b => b.title && b.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  let alpabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let DATA = [];
  alpabet.forEach(letter => {
    DATA.push({
      title: letter ? letter.toUpperCase() : letter,
      data: countries.filter(
        item => item.title && item.title.toLowerCase().startsWith(letter),
      ),
    });
  });
  // function onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  // }

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
      <Text style={[S.text, {opacity: 0.5}]}>
        Why are you asking me for this information?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={S.text}>
        These details enable us to fill out the pre-paid shipping voucher that
        be provided yo you when your item has sold. You will only be asked for
        these once, when you make your first consignment.
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BottomSheet
        onCloseEnd={() => setClosed(true)}
        onOpenEnd={() => setClosed(false)}
        snapPoints={[sheetInitialHeight, constants.DEVICE_HEIGHT * 0.9]}
        renderContent={renderContent}
        // renderHeader = {renderHeader}
      />
      <View style={{flex: 1, marginTop: 10, paddingBottom: sheetInitialHeight}}>
        <BackHeaderCenter
          title="Shipping Item From"
          />
        <SearchBar
          onChangeText={text => setSearchText(text)}
          inputStyle={{borderWidth: null, borderColor: null}}
          containerStyle={{
            backgroundColor: 'white',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'gray',
          }}
          // placeholder="Lookup all brands"
          value={searchText}
        />
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onPress({brand: item})}>
              <ListItem bottomDivider title={item.title} />
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <ListItem containerStyle={S.header} bottomDivider title={title} />
          )}
        />
      </View>
    </View>
  );
};

export default SelectSellCountryView;
