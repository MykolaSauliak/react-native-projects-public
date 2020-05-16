import React from 'react';
import {View, Text, FlatList, SectionList, StyleSheet} from 'react-native';
import {SearchBar, ListItem, Header} from 'react-native-elements';
import colors from '../../../../styles/colors';
import convertForSectionList from '../../../../utils/convertForSectionList';
import i18n from '../../../../i18n';
import { BackHeaderCenter, Checkbox } from '../../../../components';
import constants from '../../../../constants';

const S = StyleSheet.create({});

const SelectSellConditionView = ({
  vintage,
  setSellVintage,
  setSellSoldWith,
  soldWith = {}
}) => {
  console.log('soldWith',soldWith)
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeaderCenter
        title="Optional information"
      />
      <Checkbox 
        title="Vintage"
        checked={vintage}
        subtitle="item that is at least 15 years old"
        onPress={() => setSellVintage(!vintage)}
        />
      <ListItem 
        title="Packaging" 
        containerStyle={{marginTop: 10, height: 20, backgroundColor: colors.gray}}
        />
      <Checkbox 
        title="Card or certificate"
        checked={soldWith[constants.cardcertificate]}
        onPress={(value) => setSellSoldWith(constants.cardcertificate, !soldWith[constants.cardcertificate])}
        />
      <Checkbox 
        title="Dustbag"
        checked={soldWith[constants.dustbag]}
        onPress={(value) => setSellSoldWith(constants.dustbag, !soldWith[constants.dustbag])}
        />
      <Checkbox 
        title="Original box"
        checked={soldWith[constants.originalbox]}
        onPress={() => setSellSoldWith(constants.originalbox, !soldWith[constants.originalbox])}
        />
    </View>
  );
};

export default SelectSellConditionView;
