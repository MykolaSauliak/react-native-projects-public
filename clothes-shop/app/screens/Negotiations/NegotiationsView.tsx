import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {BackHeader, Text, Loading, BackHeaderCenter} from '../../components';
import { ActivityIndicator } from 'react-native-paper';
import { 
  Negotiation,
  Product 
} from "../../types/Negotiation.type";
import NegotiationContainer from '../../containers/Negotiations/NegotiationContainer'
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationService } from '../../services';
import { colors } from '../../styles';
interface Metadata {
  key: string,
  value: any
}

interface NegotiationProps {
  id: string,
  product_id?: string,
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
  id,
  product_id,
  isSignedIn,
  loggedInUser
} : NegotiationProps) => {
  // console.log('brand_name',brand_name)
  if(loading){
    return <Loading />
  };

  if(!isSignedIn){
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
       <Text style={{textAlign:'center'}}>login to view negotiation info</Text>
    </View>
  }
  console.log('id',id)
  return (
    // <ScrollView>
    <View style={{flex: 1}}>
      <BackHeaderCenter 
        title="Negotiating area" 
        rightComponent={(<TouchableOpacity onPress={() =>  NavigationService.navigateToNegotiationOptions() }>
              <Ionicons name="ios-settings" size={25} color={colors.orange} />
            </TouchableOpacity>)
        }/>
      <NegotiationContainer 
          negotiation={negotiation}
          product={item}
          product_id={item.id || product_id}
          id={id}
          sellerUser={sellerUser}
          />
    </View>
    // {/* </ScrollView> */}
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
