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
import globalColors from '../../../../../../styles/colors';
import constants from '../../../../../../constants';
import S from './SelectSellProofOfOrigin.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import {BackHeaderCenter} from '../../../../../../components'
import ImagePickerRow from '../../../../../../components/ImagePickerRow';
import { globalStyles } from '../../../../../../styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const SelectSellColorView = ({
  colors,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  chooseItem,
  proofOfOrigin = {}
}) => {
  let [closed, setClosed] = useState(true);
  let sheetInitialHeight = 80;
  console.log('proofOfOrigin',proofOfOrigin)
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
        Why do you require the receipt for my item?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={[S.text, globalStyles.botomSheetSubtitle]}>
        We are committed to combating the trade of counterfeit products and each item placed online is approced by our curation team. By including your item receipt with your deposit form, its authenticity can be seen and there is greate chane that your item will be accepted and proccesse quickly
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
          title="Proof of origin"
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
          />
        <Text
          style={[globalStyles.sellPlaceholder,]}>
          {`This information is mandatory for luxury brands.\nThis information will no be publicly displayed`}
        </Text>
        <ImagePickerRow 
            imagesContainer={{width: '100%', justifyContent: 'center', alignItems: 'center'}} 
            containerStyle={{alignItems:'center'}} 
            title="Invoice"
            titleStyle={{fontSize: widthPercentageToDP(5)}}
            source={proofOfOrigin}
            onImageUpload={(image) => chooseItem(image)}
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
