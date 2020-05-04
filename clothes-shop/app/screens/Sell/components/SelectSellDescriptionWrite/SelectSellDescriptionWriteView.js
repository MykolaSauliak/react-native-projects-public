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
import {Input} from '../../../../components';
import i18n from '../../../../i18n';
import S from './SelectSellDescriptionWrite.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import { BackHeaderCenter } from '../../../../components';

const SelectSellDescriptionWriteView = ({
  description,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  setSelectedSellDescription,
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
        What should I include in the description?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={S.text}>
        Describe your item objectively and in detail here: list any defects, any
        alterations, the absense of labels (composition or brand name), etc
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
          title="Description"
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
        <Input
          value={description}
          placeholder="Describe your article"
          onChangeText={text => setSelectedSellDescription(text)}
        />
      </View>
    </View>
  );
};

SelectSellDescriptionWriteView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellDescriptionWriteView;
