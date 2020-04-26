import React from 'react';
import {View, Text, FlatList, SectionList, StyleSheet} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import colors from '../../../../styles/colors';
import {BackHeaderCenter} from '../../../../components'

const S = StyleSheet.create({});

const SelectSellConditionView = ({
  condition,
  price,
  currency,
  material,
  color,
  printed,

  search,
  selectedCarMake,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  goToPriceChoose,
  goToConditionChoose,
}) => {
  let priceString = '';
  console.log('priceString', priceString);
  console.log('price', price);
  if (price && price.currency && price.price) {
    priceString = price.price + ' ' + price.currency;
  }
  // console.log('measurementsString',measurementsString)
  /**
   * carmakes - {title,image}
   */

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
        title="Condition"
        />
      <ListItem
        containerStyle={{backgroundColor: 'white'}}
        rightElement={
          <View style={{}}>
            <Text>{condition && condition.slice(0, 25)}</Text>
          </View>
        }
        title="Condition"
        // titleProps={{numOfLines :1}}
        bottomDivider
        onPress={goToConditionChoose}
      />
      <ListItem
        title="Price"
        rightElement={
          <View style={{}}>
            <Text>{priceString}</Text>
          </View>
        }
        bottomDivider
        onPress={goToPriceChoose}
      />
    </View>
  );
};

export default SelectSellConditionView;
