import React, { Component } from 'react'
import { 
    View,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationService } from '../../services';
import {Text} from '../../components'

type AlertButtonProps = {
  item: any,
  id: string,
  btnStyle: any,
}

const styles = StyleSheet.create({
    wishlistBtn: {    
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
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
              <Text mediumSize style={[styles.btnText, {color:color}]}>Create an alert</Text>
            </TouchableOpacity>
      </View>
    );
};

export default (AlertButton);