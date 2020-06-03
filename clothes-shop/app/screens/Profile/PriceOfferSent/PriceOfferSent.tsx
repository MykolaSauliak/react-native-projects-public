import React from 'react';
import {View, Text,Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colors from '../../../styles/colors';
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from '../../../components/Loading'
import constants from '../../../constants';
import {ListItem, Avatar} from 'react-native-elements'
import { Negotiation } from '../../../types/Negotiation.type';
import R from 'ramda'
import { BackHeader, BackHeaderCenter } from '../../../components';
import { NavigationService } from '../../../services';
import { List } from '@ui-kitten/components';

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
      <BackHeaderCenter title="Price offers sent" rightComponent={<TouchableOpacity onPress={() =>  NavigationService.navigateToNegotiationOptions()}>
        <Ionicons name="ios-settings" size={25} color={colors.orange} />
      </TouchableOpacity>} />
      {loading ? 
        <Loading /> :
        <FlatList
          keyExtractor={(item) => item && item.id}
          data={items}
          ListEmptyComponent={<Text style={{textAlign:'center', margin:15}}>You have no current negotiations</Text>}
          renderItem={({item} : {item: Negotiation}) => (
            <>
              <ListItem 
                  leftElement={<Image 
                    source={{uri: R.path(['image',"src"], item) }}
                    style={{width: constants.DEVICE_WIDTH * 0.25, height: '100%' }}
                    resizeMode="contain"
                  />}
                  // leftAvatar={{
                  //   source: {uri: R.path(['image',"src"], item) }, 
                  //   rounded: false, 
                  //   size: 'large', 
                  //   ImageComponent:Image,
                  //   containerStyle: {backgroundColor: "white"},
                  //   imageProps: {resizeMode:'contain',  defaultSource: constants.defaultImage},
                  // }}
                  onPress={() => NavigationService.navigateToNegotiations({id:item.id})}
                  title={item.brand_name + " "+ item.type_name + ' ' + item.color}
                  subtitle={<Text style={{fontWeight: "bold"}}>
                    {`Starting Price: ${item.starting_price} ${item.currency}`}
                    {`\nOffer ${item.status}: ${item.offer_price} ${item.currency}`}
                  </Text>}
                  containerStyle={{borderBottomWidth: 0}}
                  bottomDivider
                  />
              {item.status == 'sent' && (
                <ListItem 
                  leftIcon={{type: 'ionicon', name: 'ios-timer',color: colors.orange}}
                  title={"You offer has been sent.\nSeller has 2 days to answer"}
                  titleStyle={{color: colors.orange}}
                  containerStyle={{borderTopWidth: 0}}
                  bottomDivider
                  />
              )}
              {item.status == 'accepted' && (
                <ListItem 
                  // leftIcon={{type: 'Ionicons', name: 'ios-timer'}}
                  title={"You offer has been approved"}
                  titleStyle={{color: colors.orange}}
                  containerStyle={{borderTopWidth: 0}}
                  bottomDivider
                  />
              )}
              {item.status == 'declined' && (
                <ListItem 
                  leftIcon={{type: 'ionicon', name: 'ios-timer', color: colors.orange}}
                  title={"You offer has been declined\nYou have 2 days to make a new offer"}
                  titleStyle={{color: colors.orange}}
                  containerStyle={{borderTopWidth: 0}}
                  bottomDivider
                  />
              )}
              {/* <ListItem 
              //   leftIcon={{type: 'Ionicons', name: 'ios-timer'}}
              //   title={}
              //   titleStyle={{color: colors.orange}}
              //   />
              // <Text style={{}}>

              // </Text> */}
              </>
              )
            }
          />
      }

    </View>
  );
};

export default PriceOfferSent;
