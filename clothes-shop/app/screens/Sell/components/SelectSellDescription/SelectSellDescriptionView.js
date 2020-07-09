import React from 'react';
import {View, FlatList, SectionList, StyleSheet} from 'react-native';
import {SearchBar, Header} from 'react-native-elements';
import colors from '../../../../styles/colors';
import convertForSectionList from '../../../../utils/convertForSectionList';
import i18n from '../../../../i18n';
import T from 'prop-types';
import { BackHeaderCenter, ListItem } from '../../../../components';
import {  Text} from '../../../../components';
import {  globalStyles} from '../../../../styles';

const S = StyleSheet.create({});

const SelectSellDescriptionView = ({
  description = '',
  measurements,
  material = '',
  color,
  printed,

  search,
  selectedCarMake,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  goToMeasurementsChoose,
  goToDescriptionWrite,
}) => {
  console.log('measurements', measurements);
  let measurementsString = '';
  if (
    measurements &&
    measurements.unit &&
    measurements.width &&
    measurements.height
  ) {
    measurementsString = `${measurements.width}x${ measurements.height}${measurements.depth ? 'x'+measurements.depth :""} ${measurements.unit}`
      // measurements.width + 'x' + measurements.height + ' ' + measurements.unit;
  }
  console.log('measurementsString', measurementsString);
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
       title="Description"
      />
      <ListItem
        containerStyle={{backgroundColor: 'white'}}
        rightElement={
          <View style={{}}>
            <Text style={[globalStyles.rightListItem, {color: colors.orange}]}>{description.slice(0, 35)}...</Text>
          </View>
        }
        titleStyle={globalStyles.leftListItem}
        title="Description"
        // titleProps={{numOfLines :1}}
        bottomDivider
        onPress={goToDescriptionWrite}
      />
      <ListItem
        title="Measurements"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{measurementsString}</Text>
          </View>
        }
        
        bottomDivider
        onPress={goToMeasurementsChoose}
      />
    </View>
  );
};

SelectSellDescriptionView.propTypes = {
  description: T.string,
};

export default SelectSellDescriptionView;
