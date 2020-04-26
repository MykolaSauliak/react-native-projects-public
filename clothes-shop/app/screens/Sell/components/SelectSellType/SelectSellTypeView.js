import React from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import {List, Checkbox} from 'react-native-paper';
import S from './SelectSellType.style';
import colors from '../../../../styles/colors';
import i18n from '../../../../i18n';
import { BackHeaderCenter } from '../../../../components';

const SelectSellTypeView = ({
  types,
  subtypes,
  selectedCategory,
  category,
  search,
  updateSearch,
  placeholder,
  onItemPress,
  goBack,
}) => {
  console.log('types length', types.length);
  console.log('category', category);
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
  // console.log('selectedCategory',selectedCategory)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        <View style={{marginTop: 25}}>
          <BackHeaderCenter
            title="Submit item"
          />
          <Text
            style={{
              padding: 15,
              fontSize: 22,
              marginVertical: 15,
              textAlign: 'center',
            }}>
            What type of item is it?
          </Text>
          {/* <ListItem /> */}
          {!category && <Text>Choose category first</Text>}
          <FlatList
            data={types.filter(
              t =>
                t.category_ids &&
                t.category_ids.length > 0 &&
                t.category_ids.includes(category.id),
            )}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({item}) => (
              <View style={[S.listAccordion]}>
                <List.Accordion
                  title={item.title}
                  titleStyle={{fontWeight: 'bold'}}
                  // left={props => <List.Icon {...props} icon="folder" />}
                >
                  {subtypes
                    .filter(sb => sb.type_id == item.id)
                    .map(sb => (
                      // <View style={{width: '100%',}}>
                      <TouchableOpacity
                        key={sb.title}
                        onPress={() => onItemPress({type: item, subtype: sb})}>
                        <View
                          style={{
                            width: '100%',
                            backgroundColor: colors.inputBackground,
                          }}
                        />
                        <List.Item title={sb.title} />
                      </TouchableOpacity>
                      // </View>
                    ))}
                </List.Accordion>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

SelectSellTypeView.defaultProps = {
  selectedCategory: {},
  category: {},
};

export default SelectSellTypeView;
