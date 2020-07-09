import React from 'react';
import {View, FlatList, SectionList, StyleSheet} from 'react-native';
import {SearchBar, Header} from 'react-native-elements';
import colors from '../../../../styles/colors';
import convertForSectionList from '../../../../utils/convertForSectionList';
import i18n from '../../../../i18n';
import { BackHeaderCenter, Checkbox, ListItem } from '../../../../components';
import constants from '../../../../constants';
import _ from 'lodash'
import {  Text} from '../../../../components';
import { globalStyles } from '../../../../styles';

const S = StyleSheet.create({});

const SelectSellConditionView = ({
  vintage,
  serialNumber,
  origin,
  proofOfOrigin,
  packaging,
  setSellSoldWith,
  soldWith = {},

  goToVintageChoose,
  goToProofOfOriginChoose,
  goToOriginChoose,
  goToSerialNumberChoose,
  goToPackagingChoose,

}) => {
  console.log('soldWith',soldWith)
  console.log('constants.cardcertificate',constants.cardcertificate)
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeaderCenter
        title="Optional information"
      />
      {/* <Checkbox 
        title="Vintage"
        checked={vintage}
        subtitle="item that is at least 15 years old"
        onPress={() => setSellVintage(!vintage)}
        />
      <ListItem 
        title="Packaging" 
        titleStyle={{color: "black"}}
        containerStyle={{marginTop: 20, height: 20, backgroundColor: colors.gray}}
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
        /> */}

      <ListItem
        title="Vintage"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{vintage ? 'yes' : 'no'}</Text>
          </View>
        }
        bottomDivider
        onPress={goToVintageChoose}
      />
      <ListItem
        title="Proof of origin"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{!_.isEmpty(proofOfOrigin) ? 'Saved' : ""}</Text>
          </View>
        }
        bottomDivider
        onPress={goToProofOfOriginChoose}
      />
      <ListItem
        title="Origin"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{!_.isEmpty(origin) ? 'Saved' : ""}</Text>
          </View>
        }
        bottomDivider
        onPress={goToOriginChoose}
      />
      <ListItem
        title="Serial number"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{serialNumber}</Text>
          </View>
        }
        bottomDivider
        onPress={goToSerialNumberChoose}
      />
      <ListItem
        title="Packaging"
        titleStyle={globalStyles.leftListItem}
        rightElement={
          <View style={{}}>
            <Text style={globalStyles.rightListItem}>{!_.isEmpty(soldWith) ? 'Saved' : ""}</Text>
          </View>
        }
        bottomDivider
        onPress={goToPackagingChoose}
      />
    </View>
  );
};

export default SelectSellConditionView;
