import React, {useState} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalColors from '../../../../styles/colors';
import constants from '../../../../constants';
import ItemsList from '../../../../components/ItemsList';
import i18n from '../../../../i18n';
import S from './SelectSellSubcategory.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import { BackHeaderCenter } from '../../../../components';
import {  Text} from '../../../../components';

const SelectSellSubcategoryView = ({
  subcategories,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
}) => {
  let [closed, setClosed] = useState(true);
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
      <Text style={[S.text, {opacity: 0.5}]}>
        How can I ensure that colour of the item is clear?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={S.text}>
        We advise that you take photos using a good source of natural light to
        ensure that the colour of your item is clear
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: globalColors.gray}}>
      <BottomSheet
        onCloseEnd={() => setClosed(true)}
        onOpenEnd={() => setClosed(false)}
        snapPoints={[sheetInitialHeight, constants.DEVICE_HEIGHT * 0.9]}
        renderContent={renderContent}
        // renderHeader = {renderHeader}
      />
      <View style={{flex: 1, paddingBottom: sheetInitialHeight}}>
        <BackHeaderCenter
          title="Sub-category"
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
        />
        <Text
          style={{
            opacity: 0.5,
            padding: 5,
            paddingHorizontal: 15,
            fontStyle: 'italic',
            fontSize: 15,
            marginVertical: 15,
            textAlign: 'left',
          }}>
          {/* Specify the main colour of the item */}
        </Text>
        <ItemsList items={subcategories} onItemPress={onPress} />
      </View>
    </View>
  );
};

SelectSellSubcategoryView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellSubcategoryView;
