import React, {useState} from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import globalColors from '../../../../styles/colors';
import constants from '../../../../constants';
import ItemsList from '../../../../components/ItemsList';
import i18n from '../../../../i18n';
import S from './SelectSellMeasurements.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import RNPickerSelect from 'react-native-picker-select';
import {NavigationService} from '../../../../services';
import { BackHeaderCenter, Input } from '../../../../components';

const SelectSellMeasurementsView = ({
  subcategories,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  setSelectedSellMeasurements,
}) => {
  let [closed, setClosed] = useState(0);
  let [width, setWidth] = useState(0);
  let [height, setHeight] = useState(0);
  let [unit, setUnit] = useState('cm');

  let sheetInitialHeight = 0;

  // const renderContent = () => (
  //     <View style={{padding:10, backgroundColor: globalColors.weLoveColor || 'gray', height : constants.DEVICE_HEIGHT}}>
  //         <View style={{width:'100%',alignItems:'center', }}>
  //             {
  //                 closed
  //                 ?<AntDesign name="up" size={15} />
  //                 :<AntDesign name="down" size={15} />
  //             }
  //         </View>
  //         <Text style={[S.text, {opacity: 0.5}]}>How can I ensure that colour of the item is clear?</Text>
  //         <View style={{width: 50, borderWidth:2}}/>
  //         <Text style={S.text}>We advise that you take photos using a good source of natural light to ensure that the colour of your item is clear</Text>
  //     </View>
  // )

  return (
    <View style={{flex: 1, backgroundColor: globalColors.gray}}>
      {/* <BottomSheet
                onCloseEnd={() => setClosed(true)}
                onOpenEnd={() => setClosed(false)}
                snapPoints = {[sheetInitialHeight, constants.DEVICE_HEIGHT * 0.9]}
                renderContent = {renderContent}
                // renderHeader = {renderHeader}
                /> */}
      <View style={{flex: 1, paddingBottom: sheetInitialHeight}}>
        <BackHeaderCenter
          title="Measurements"
          rightComponent={{
            icon: 'check',
            color: '#000',
            onPress: () => {
              console.log(unit, width, height);
              setSelectedSellMeasurements({unit, width, height});
              onDone();
            },
          }}
        />
        {/* <Text style={{opacity:0.5, padding: 5,paddingHorizontal: 15, fontStyle: 'italic', fontSize: 15, marginVertical : 15, textAlign : 'left'}}>
                </Text>  */}
        <ListItem
          topDivider
          leftElement={<Text>Unit</Text>}
          rightElement={
            <View style={{width: 100}}>
              <RNPickerSelect
                onValueChange={value => setUnit(value)}
                value={unit}
                items={[{label: 'cm', value: 'cm'}, {label: 'in', value: 'in'}]}
              />
            </View>
          }
          bottomDivider
        />
        <ListItem
          leftElement={<Text>Height</Text>}
          rightElement={<Input 
            // containerStyle={{width: '20%'}}
            onChangeText={text => setHeight(text)}
            keyboardType='number-pad'
            maxLength={9}
            containerStyle={{
                borderBottomColor: 'black',
                // borderBottomWidth: 2,
                width: '50%',
            }}
              style={{
                textAlign:'flex-start'
            }}
            />}
          // input={{
          //   onChangeText: text => setHeight(text),
          //   keyboardType: 'number-pad',
          //   containerStyle: {
          //     borderBottomColor: 'black',
          //     borderBottomWidth: 2,
          //     width: '100%',
          //   },
          //   style: {
          //     textAlign:'flex-start'
          //   }
          // }}
          bottomDivider
        />
        <ListItem
          leftElement={<Text>Width</Text>}
          rightElement={<Input 
            // containerStyle={{width: '20%'}}
            onChangeText={text => setWidth(text)}
            keyboardType='number-pad'
            maxLength={9}
            containerStyle={{
                borderBottomColor: 'black',
                // borderBottomWidth: 2,
                width: '50%',
            }}
              style={{
                textAlign:'flex-start'
            }}
            />}
          // input={{
          //   onChangeText: text => setWidth(text),
          //   keyboardType: 'number-pad',
          //   containerStyle: {
          //     borderBottomColor: 'black',
          //     borderBottomWidth: 2,
          //     width: '100%',
          //   },
          // }}
          // rightElement={<TouchableOpacity>
          //     <Text>Example</Text>
          // </TouchableOpacity>}
          bottomDivider
        />
        {/* <Input
                    placeholder="Describe your article"
                    onChangeText={(text) => setSellDescription(text)}
                    /> */}
      </View>
    </View>
  );
};

SelectSellMeasurementsView.defaultProps = {
  goBack: () => NavigationService.goBack(),
  onDone: () => NavigationService.navigateToSellProductDescriptionSelect(),
};

SelectSellMeasurementsView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellMeasurementsView;
