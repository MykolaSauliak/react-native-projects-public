import React from 'react';
import {View, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {BackHeaderCenter, ListItem} from '../../../../components'
import colors from '../../../../styles/colors';
import i18n from '../../../../i18n';
import {  Text} from '../../../../components';
import S from './styles'

const SelectSellInformationView = ({
  categories,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
}) => {
  // function onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  // }

  // let carmakes = []
  // cars.map( car => {
  //     if(carmakes.filter(c => c.title == car.carmake.trim()).length == 0){
  //         carmakes.push({
  //             title: car.carmake ? car.carmake.trim() : car.carmake,
  //             image : car.logo ? car.logo.src ? car.logo.src : '' : ''
  //         })
  //     }
  // })

  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <View style={{}}>
        <BackHeaderCenter
          title="Submit item"
          />
        <Text
          style={S.sellPlaceholder}>
          In which category should you place your article
        </Text>
        {/* <ListItem /> */}
        <FlatList
          data={categories}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              titleStyle={S.listItem}
              onPress={() => onPress(item)}
              // leftAvatar={{ source: { uri: item.image } }}
              bottomDivider
            />
          )}
        />
      </View>
    </View>
  );
};

export default SelectSellInformationView;
