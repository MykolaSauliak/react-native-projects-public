import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { withCart } from "../utils/enhancers";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../constants/styles'
import { NavigationService } from '../services';
import { Badge} from 'react-native-elements';

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

const ShippingCartIcon = ({
    cartCount,
} : ShippingCartIconProps) => {
    return (
        <TouchableOpacity onPress={() => NavigationService.navigateToCart()}>
        {cartCount > 0 && (
          <Badge
            containerStyle={{
              position: 'absolute',
              top: -8,
              right: -10,
              zIndex: 2,
            }}
            value={cartCount}
            status="error"
            badgeStyle={{width: 25, height: 15}}
            textStyle={globalStyles.badgeText}
          />
        )}
        <FontAwesome name="shopping-bag" size={20} />
      </TouchableOpacity>
    );
};

export default withCart()(ShippingCartIcon);