import React, {useState} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalColors from '../../../../../../styles/colors';
import constants from '../../../../../../constants';
import ItemsList from '../../../../../../components/ItemsList';
import S from './SelectSellSerialNumber.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import {BackHeaderCenter, Input} from '../../../../../../components'
import {  Text} from '../../../../../../components';
import { globalStyles } from '../../../../../../styles';

const SelectSellColorView = ({
  serialNumber,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  chooseItem,
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
      <Text style={[S.text, globalStyles.botomSheetTitle]}>
        How can I ensure that colour of the item is clear?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={[S.text, globalStyles.botomSheetSubtitle]}>
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
          title="Serial number"
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
          />
        <Text
          style={globalStyles.sellPlaceholder}>
            This information will not be publicly displayed
        </Text>
        <Input
          value={serialNumber}
          multiline
          // placeholder="Describe your article"
          onChangeText={text => chooseItem(text)}
        />
      </View>
    </View>
  );
};

SelectSellColorView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellColorView;
