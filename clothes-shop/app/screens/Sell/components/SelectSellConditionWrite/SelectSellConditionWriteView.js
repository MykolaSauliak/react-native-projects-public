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
import {SearchBar, ListItem, Header, Input} from 'react-native-elements';
import globalColors from '../../../../styles/colors';
import constants from '../../../../constants';
import conditions, {conditionDesc} from '../../../../constants/conditions';
import globalStyles from '../../../../constants/styles';
import ItemsList from '../../../../components/ItemsList';
import ListItemWithDropDown from '../../../../components/ListItemWithDropDown';
import i18n from '../../../../i18n';
import S from './SelectSellConditionWrite.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import {BackHeaderCenter} from '../../../../components'

const SelectSellConditionWriteView = ({
  description,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  setSellDescription,
  setCondition,
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
      <Text style={[globalStyles.botomSheetTitle]}>
        What should you do if you are unsure of the condition of your item?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={[globalStyles.botomSheetTitle]}>
        If you are unsure which condition category your item falls into, we
        advise you specify the less good of the two and provide futher detail in
        your item description.Once your article has been sold, we will base our
        quality control eveluation on the condition indicated.
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
          title="Condition"
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}  
        />
        {/* <Text style={{opacity:0.5, padding: 5,paddingHorizontal: 15, fontStyle: 'italic', fontSize: 15, marginVertical : 15, textAlign : 'left'}}>
                </Text>  */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListItemWithDropDown
            onPress={() => setCondition(constants.neverWornWithTag)}
            title={constants.neverWornWithTag}
            subtitle={conditionDesc.neverWornWithTag}
            collapseTitle="Reasons for refusal"
            collapseSubtitle={conditions.refusal.neverWornWithTag}
          />
          <ListItemWithDropDown
            onPress={() => setCondition(constants.neverWorn)}
            title={constants.neverWorn}
            subtitle={conditionDesc.neverWorn}
            collapseTitle="Reasons for refusal"
            collapseSubtitle={conditions.refusal.neverWorn}

          />
          <ListItemWithDropDown
            onPress={() => setCondition(constants.perfectCondition)}
            title="Very good condition"
            subtitle="A bag in very good condition is a second-hand bag which has been barely used and shows no defects"
            collapseTitle="Reasons for refusal"
            collapseSubtitle={`- Damaged fabric or material \n- Worn or damaged corners\n- Stains or marks (outside and inside)\n- Broken zip\n- Scratches / oxidation / rust\n- Modifications
                                                `}
          />
          <ListItemWithDropDown
            onPress={() => setCondition(constants.goodCondition)}
            title="Good condition"
            subtitle="A bag in good condition is a second-hand bag which has been used and well maintained. If the pierce has any defets they must be mentioned in the description and visible in the photos"
            collapseTitle="Reasons for refusal"
            collapseSubtitle={`- Damaged fabric or material \n- Punctrured corners\n- Obvious stains\n- Broken zip\n- Persistent smells\n- Modifications
                                                `}
          />
          <ListItemWithDropDown
            onPress={() => setCondition(constants.fairCondition)}
            title="Fair condition"
            subtitle="A bag in correct condition is a bag which has been used frequently and may show defects. If the piece has any defects they must be mentioned in the description and visible in the photos"
            collapseTitle="Reasons for refusal"
            collapseSubtitle={
              'No criteria excluding items as correct condition'
            }
          />
        </ScrollView>
      </View>
    </View>
  );
};

SelectSellConditionWriteView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellConditionWriteView;
