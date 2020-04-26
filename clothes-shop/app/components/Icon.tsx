import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { withCart } from "../utils/enhancers";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors'
import PriceReductionButton from '../components/PriceReductionButton'

type ShippingCartIconProps = {
  item: any,
  id: string,
  btnStyle: any,
  isInWishlist: (item : any) => boolean,
  toWishlist: (item : any) => void,
  fromWishlist: (id : string) => void,
}

const styles = StyleSheet.create({
    wishlistBtn: {    
        // flex: 0.15,
        backgroundColor: 'white',
        // width: 50,
        // borderRadius: 8,
        // height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0.8,
    }
})

const Icon = ({
    onDone,
    onDiscard,
    done,
    item,
    containerStyle = {},
} : ShippingCartIconProps) => {
    return (
      <PriceReductionButton 
        onDone={(item) => {}}
        onDiscard={(item) => {}}
        />
    );
};

export default Icon;