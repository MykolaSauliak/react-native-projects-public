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
import S from './SelectSellVintage.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import {BackHeaderCenter, Checkbox} from '../../../../../../components'
import {  Text} from '../../../../../../components';
import { globalStyles } from '../../../../../../styles';

const SelectSellColorView = ({
  vintage,
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
      {/* <BottomSheet
        onCloseEnd={() => setClosed(true)}
        onOpenEnd={() => setClosed(false)}
        snapPoints={[sheetInitialHeight, constants.DEVICE_HEIGHT * 0.9]}
        renderContent={renderContent}
        // renderHeader = {renderHeader}
      /> */}
      <View style={{flex: 1, paddingBottom: sheetInitialHeight}}>
        <BackHeaderCenter
          title="Vintage" 
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
          />
        <Text
          style={globalStyles.sellPlaceholder}>
          Item that is at least 15 years old
        </Text>
        <Checkbox 
          title="Vintage article"
          titleStyle={globalStyles.leftListItem}
          checked={vintage}
          // subtitle="item that is at least 15 years old"
          onPress={() => onPress(!vintage)}
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
