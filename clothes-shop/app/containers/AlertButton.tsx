import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { withWishlist } from "../utils/enhancers";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors'

type AlertButtonButtonProps = {
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
        // borderColor: 'black',
        // borderWidth: 0.8,
    },
    btnText: {
      fontSize: 12,
      marginTop: 10,
      textAlign:'center',
    }
})

const AlertButton = ({
    toWishlist,
    fromWishlist,
    isInWishlist,
    item,
    btnStyle = {},
} : AlertButtonButtonProps) => {
    return (
      <View style={[styles.wishlistBtn, {justifyContent:'space-around'},]}>
        {/* {isInWishlist(item) == true ? (
            <TouchableOpacity
              onPress={() => fromWishlist(item.id)}
              style={ btnStyle]}
            >
              <FontAwesome name="bell-o" size={30} color='black' />
              <Text style={styles.btnText}>Create an alert</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => toWishlist(item)}
              style={[styles.wishlistBtn, btnStyle]}
                >
              <FontAwesome name="chevron-down" size={30} />
              <Text style={[styles.btnText, {opacity: 0.5}]}>{`Price reduction \nupdates`}</Text>
            </TouchableOpacity>
        )} */}
      </View>
    );
};

export default withWishlist()(AlertButton);