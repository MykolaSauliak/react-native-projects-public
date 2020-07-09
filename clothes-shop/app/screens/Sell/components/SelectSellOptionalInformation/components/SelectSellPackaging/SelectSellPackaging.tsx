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
import S from './SelectSellPackaging.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import { BackHeaderCenter, Checkbox } from '../../../../../../components';
import {  Text} from '../../../../../../components';
import { globalStyles } from '../../../../../../styles';

const SelectSellColorView = ({
  colors,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  chooseItem,
  setSellSoldWith,
  soldWith = {}
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
      <Text style={[S.text,  globalStyles.botomSheetTitle]}>
        What happens if I have the packaging for my item
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={[S.text, globalStyles.botomSheetSubtitle]}>
       Once your item has been sold, you must include any packaging when you send it to us. The condition of the packaging will also be evaluated in our quality control process
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
          title="Color"
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
          />
        {/* <Text
          style={{
            opacity: 0.5,
            padding: 5,
            paddingHorizontal: 15,
            fontStyle: 'italic',
            fontSize: 15,
            marginVertical: 15,
            textAlign: 'left',
          }}>
          Specify the main colour of the item
        </Text> */}
        <Checkbox 
          title="Card or certificate"
          titleStyle={globalStyles.leftListItem}
          checked={soldWith[constants.cardcertificate]}
          onPress={(value) => setSellSoldWith(constants.cardcertificate, !soldWith[constants.cardcertificate])}
          />
        <Checkbox 
          title="Dustbag"
          titleStyle={globalStyles.leftListItem}
          checked={soldWith[constants.dustbag]}
          onPress={(value) => setSellSoldWith(constants.dustbag, !soldWith[constants.dustbag])}
          />
        <Checkbox 
          title="Original box"
          titleStyle={globalStyles.leftListItem}
          checked={soldWith[constants.originalbox]}
          onPress={() => setSellSoldWith(constants.originalbox, !soldWith[constants.originalbox])}
          /> 
        {/* <ItemsList items={colors} onItemPress={onPress} /> */}
      </View>
    </View>
  );
};

SelectSellColorView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellColorView;
