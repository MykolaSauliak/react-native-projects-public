import React from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import {BackHeader} from '../../components';
import { ActivityIndicator } from 'react-native-paper';
import { 
  Negotiation,
  Product 
} from "../../types/Negotiation.type";
import NegotiationContainer from '../../containers/Negotiations/NegotiationContainer'

interface Metadata {
  key: string,
  value: any
}

interface NegotiationProps {
  item: Product,
  loading : boolean,
  error : string,
  negotiation : Negotiation,
  onCreateNew : () => void,
  acceptOffer : () => void,
  declineOffer : () => void,
  setOfferPrice : () => void,
  offerPrice : number,
  lastUpdate : number,
  sellerUser : {
    [key: string]: Metadata
  },
  buyerUser : {
    [key: string]: Metadata
  },
  user : {
    uid: string
  },
  isSignedIn :boolean
}

const NegotiationsView = ({
  item,
  negotiation,
  sellerUser,
  loading,
  isSignedIn
} : NegotiationProps) => {
  // console.log('brand_name',brand_name)
  if(loading){
    return <ActivityIndicator />
  };

  if(!isSignedIn){
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
       <Text style={{textAlign:'center'}}>login to view negotiation info</Text>
    </View>
  }
  // console.log('negotiation',negotiation)
  return (
    <ScrollView>
    <View style={{zIndex: 1, flex: 1, width: '100%'}}>
      <BackHeader title="Negotiating area" />
      <NegotiationContainer 
          negotiation={negotiation}
          product={item}
          sellerUser={sellerUser}
          />
    </View>
    </ScrollView>
  );
};

NegotiationsView.defaultProps = {
  error : '',
  type_name : '',
  subtype_name:'',
  price: 0,
  currency: 'USD'
}

export default NegotiationsView;
