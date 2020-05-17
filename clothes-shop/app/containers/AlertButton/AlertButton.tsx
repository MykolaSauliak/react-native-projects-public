import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationService } from '../../services';

type AlertButtonProps = {
  item: any,
  id: string,
  btnStyle: any,
}

const styles = StyleSheet.create({
    wishlistBtn: {    
        // flex: 0.15,
        // backgroundColor: 'white',
        // width: 50,
        // borderRadius: 8,
        // height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 0.8,
    },
    btnText: {
      fontSize: 14,
      marginTop: 10,
    }
})

const AlertButton = ({
    item = {},
    btnStyle = {},
    color = ' black'
} : AlertButtonProps) => {
  // console.log('item',item)
    return (
      <View style={{justifyContent:'space-around', backgroundColor: null}}>
            <TouchableOpacity
                onPress={() => NavigationService.navigateToAlertCreate({item})}
                style={[styles.wishlistBtn, btnStyle]}
                >
              <EvilIcons name="bell" size={30} color={color}/>
              <Text style={[styles.btnText, {color:color}]}>Create an alert</Text>
            </TouchableOpacity>
      </View>
    );
};

export default (AlertButton);