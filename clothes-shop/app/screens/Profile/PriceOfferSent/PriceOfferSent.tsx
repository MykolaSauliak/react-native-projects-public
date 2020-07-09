import React from 'react';
import {View,Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import colors from '../../../styles/colors';
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from '../../../components/Loading'
import {Text} from '../../../components'
import constants from '../../../constants';
import { Negotiation } from '../../../types/Negotiation.type';
import R from 'ramda'
import { BackHeader, BackHeaderCenter, ListItem } from '../../../components';
import { NavigationService } from '../../../services';
import { List } from '@ui-kitten/components';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const S = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.dark,
  },
  statusTitle: {
    color:
    colors.orange, 
    fontSize: widthPercentageToDP(4.5),
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
  
  const timeLeft = (created_time) => {
      let b = moment(new Date(created_time))
      let a = moment(new Date(created_time)).add(2, 'days');
      // return `${a.diff(b, 'hours')} hours and ${a.diff(b, 'minutes')} minutes`
      return `${a.diff(b, 'hours')} hours`
  }

  const isActive = (created_time : number) => {
    let isActive = created_time > (Date.now() - (constants.TWO_DAYS_MILISECONDS))
    // console.log('isActive',isActive)
    return isActive
    // let b = moment(new Date(created_time))
    // let a = moment(new Date(created_time)).add(2, 'days');
    // console.log(a.diff(b, 'minutes'))
    // console.log('created_time',created_time)
    // return a.diff(b, 'minutes') > 0 ? true : false
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeaderCenter title="Price offers sent" 
      rightComponent={<TouchableOpacity onPress={() =>  NavigationService.navigateToNegotiationOptions({goBack: () => NavigationService.navigateToMyNegotiations()})}>
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
                  onPress={() => {
                    if(isActive(item.created_time) == true){
                      NavigationService.navigateToNegotiations({id:item.id})
                    }
                  }}
                  disabled={!isActive(item.created_time)}
                  title={<View style={{justifyContent:'space-between'}}>
                    <Text xxmediumSize style={{fontWeight:'bold', lineHeight: 24}}>
                      {item.brand_name }
                    </Text>
                    <Text xmediumSize>
                      {item.type_name + ' ' + item.color}
                    </Text>
                    <Text xmediumSize style={{fontWeight: "normal", lineHeight: 24}}>{`Starting Price: ${item.starting_price} ${item.currency}`}
                      </Text>
                      <Text xmediumSize style={{fontWeight: "bold", lineHeight: 24}}>
                      {`${isActive(item.created_time) == true ? `Offer ${item.status}: ${item.offer_price} ${item.currency}` : 'Negotiation closed'}`}
                      </Text>
                  </View>
                  }
                  // subtitle={
                  //   <>

                  //   </>
                  // }
                  containerStyle={{borderBottomWidth: 0}}
                  bottomDivider
                  topDivider
                  />
              {isActive(item.created_time) == false ? (
                  null
              ): (
                <>
                  {item.status == 'sent' && (
                    <ListItem 
                      leftIcon={{type: 'ionicon', name: 'ios-timer',color: colors.orange,size: 18}}
                      title={`You offer has been sent.\nSeller has ${timeLeft(item.created_time)} to answer`}
                      titleStyle={S.statusTitle}
                      containerStyle={{borderTopWidth: 0}}
                      bottomDivider
                      />
                  )}
                  {item.status == 'accepted' && (
                    <ListItem 
                      // leftIcon={{type: 'Ionicons', name: 'ios-timer'}}
                      title={"You offer has been approved"}
                      titleStyle={S.statusTitle}
                      containerStyle={{borderTopWidth: 0}}
                      bottomDivider
                      />
                  )}
                  {item.status == 'declined' && (
                    <ListItem 
                      leftIcon={{type: 'ionicon', name: 'ios-timer', color: colors.orange, size: 18}}
                      title={`You offer has been declined\nYou have  ${timeLeft(item.created_time)} to make a new offer`}
                      titleStyle={S.statusTitle}
                      containerStyle={{borderTopWidth: 0}}
                      bottomDivider
                      />
                  )}
                </>
              )}
             </>
          )}
          />
      }

    </View>
  );
};

export default PriceOfferSent;
