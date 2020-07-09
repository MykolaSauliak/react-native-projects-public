import React from 'react';
import {View, FlatList, SectionList, StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';
import convertForSectionList from '../../../../utils/convertForSectionList';
import i18n from '../../../../i18n';
import {NavigationService} from '../../../../services';
import { BackHeaderCenter, ListItem } from '../../../../components';
import {  Text} from '../../../../components';
import {  globalStyles} from '../../../../styles';

const S = StyleSheet.create({});

const SelectInformationView = ({
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
  goToSubcategoryChoose,
  goToColorChoose,
  goToMaterialChoose,
  goToPrintChoose,
}) => {
  console.log('color', color);
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
        title="Information"
      />
      {/* <ListItem
        containerStyle={{backgroundColor: 'white'}}
        rightElement={
          <View style={{}}>
            <Text>
              {subcategory
                ? subcategory.title
                  ? subcategory.title
                  : subcategory
                : subcategory}
            </Text>
          </View>
        }
        title="Sub-category"
        bottomDivider
        onPress={goToSubcategoryChoose}
      /> */}
      <ListItem
        title="Material"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{material}</Text>
          </View>
        }
        bottomDivider
        onPress={goToMaterialChoose}
      />
      <ListItem
        title="Color"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{color}</Text>
          </View>
        }
        bottomDivider
        onPress={goToColorChoose}
      />
      <ListItem
        title="Printed"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{printed}</Text>
          </View>
        }
        bottomDivider
        onPress={goToPrintChoose}
      />
    </View>
  );
};

SelectInformationView.defaultProps = {
  goBack: () => NavigationService.goBack(),
  goToSubcategoryChoose: () =>
    NavigationService.navigateToSellProductSubcategorySelect(),
  goToMaterialChoose: () =>
    NavigationService.navigateToSellProductMaterialSelect(),
  goToColorChoose: () => NavigationService.navigateToSellProductColorSelect(),
  goToPrintChoose: () => NavigationService.navigateToSellProductPrintedSelect(),
};

export default SelectInformationView;
