import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';
import colors from '../../constants/colors';
import i18n from '../../i18n';

const SelectCarMakeView = ({
  cars,
  search,
  updateSearch,
  placeholder,
  onPress,
}) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  let carmakes = [];
  cars.map(car => {
    if (carmakes.filter(c => c.title == car.carmake.trim()).length == 0) {
      carmakes.push({
        title: car.carmake ? car.carmake.trim() : car.carmake,
        image: car.logo ? (car.logo.src ? car.logo.src : '') : '',
      });
    }
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <SearchBar
        containerStyle={{
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'white',
          maxHeight: 50,
          backgroundColor: null,
          borderBottomWidth: null,
          borderTopWidth: null,
        }}
        inputContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{color: colors.SECONDARY_COLOR, fontSize: 13}}
        //  style={{borderColor:'white', borderWidth:0}}
        placeholder={placeholder || i18n.t('search')}
        lightTheme
        round
        // showLoading={false}
        // underlineColorAndroid={false}
        onChangeText={text => {
          // updateSearch({text})
        }}
        value={search}
      />
      <View style={{marginTop: 25}}>
        <FlatList
          data={carmakes}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              onPress={() => onPress(item)}
              leftAvatar={{source: {uri: item.image}}}
              bottomDivider
            />
          )}
        />
      </View>
    </View>
  );
};

export default SelectCarMakeView;
