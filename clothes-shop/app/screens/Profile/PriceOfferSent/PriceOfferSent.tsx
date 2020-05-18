import React from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colors from '../../../styles/colors';
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from '../../../components/Loading'
import constants from '../../../constants';
import {ListItem} from 'react-native-elements'
import { Negotiation } from '../../../types/Negotiation.type';
import R from 'ramda'
import { BackHeader, BackHeaderCenter } from '../../../components';
import { NavigationService } from '../../../services';

const S = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.dark,
  },
});

type Props = {
  items:  Negotiation[],
  loading: boolean
}

const PriceOfferSent = ({
  items = [],
  loading,
} : Props) => {
  
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeaderCenter title="Price offers" rightComponent={<TouchableOpacity onPress={() =>  NavigationService.navigateToNegotiationOptions()}>
        <Ionicons name="ios-settings" size={25} color={colors.orange} />
      </TouchableOpacity>} />
      {loading ? 
        <Loading /> :
        <FlatList
          keyExtractor={(item) => item && item.id}
          data={items}
          ListEmptyComponent={<Text style={{textAlign:'center', margin:15}}>You have no current negotiations</Text>}
          renderItem={({item} : {item: Negotiation}) => (
              <ListItem 
                  leftAvatar={{source: {uri: R.path(['images',0,"src"], item) }}}
                  title={item.brand_name + " "+ item.type_name + ' ' + item.color}
                  subtitle={item.offer_price + " " + (item.currency || constants.MONEY_SYMBOL)}
                  bottomDivider
                  />
              )}
          />
      }

    </View>
  );
};

export default PriceOfferSent;
