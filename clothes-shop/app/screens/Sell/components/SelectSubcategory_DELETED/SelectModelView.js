import React from 'react';
import {View, Text, FlatList, SectionList} from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';
import colors from '../../../../styles/colors';
import convertForSectionList from '../../../../utils/convertForSectionList';
import i18n from '../../../../i18n';

const SelectModelView = ({
  cars,
  search,
  selectedCarMake,
  updateSearch,
  placeholder,
  onPress,
}) => {
  /**
   * carmakes - {title,image}
   */

  let filteredCars = cars.filter(c => c.carmake == selectedCarMake.title);
  let models = [];
  filteredCars.map(c => {
    if (models.filter(car => c.model == car.title).length == 0) {
      models.push({type: c.model_series || '', title: c.model});
    }
  });
  // // filteredCars = filteredCars
  // const models = filteredCars.map(c => ())
  const DATA = convertForSectionList(models, 'type');
  // //console.log('DATA',DATA)

  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <SearchBar
        containerStyle={{
          alignItems: 'center',
          width: '100%',
          // backgroundColor: 'white',
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
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.id || item.title}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={{
                padding: 5,
                paddingLeft: 15,
                fontSize: 18,
                marginTop: 15,
              }}>
              {title}
            </Text>
          )}
          renderItem={({item}) => {
            // //console.log('item',item);
            return (
              <ListItem
                title={item.title}
                onPress={() => onPress(item)}
                // leftAvatar={{ source: { uri: item.image } }}
                bottomDivider
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default SelectModelView;
