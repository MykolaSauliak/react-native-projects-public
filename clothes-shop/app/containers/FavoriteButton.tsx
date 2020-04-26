import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import {  withFavorite } from "../utils/enhancers";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors'
import constants from '../constants'

type FavoriteButtonProps = {
  item: any,
  id: string,
  containerStyle: any,
  btnStyle: any,
  iconSize: number,
  activeTitle: string,
  unactiveTitle: string,
  isFavorite: ({item, id}: {item: any,id:string}) => boolean,
  toggleFavorite: ({item, id}: {item: any, id:string}) => void,
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

const FavoriteButton = ({
    toggleFavorite,
    isFavorite,
    item = {},
    btnStyle = {},
    containerStyle = {},
    iconSize = 25,
    activeTitle,
    unactiveTitle
} : FavoriteButtonProps) => {
    return (
      <View style={[{justifyContent:'space-around', backgroundColor: null},containerStyle]}>
        {isFavorite({item}) == true ? (
            <TouchableOpacity
              onPress={() => toggleFavorite({id: item.id})}
              style={[styles.wishlistBtn, btnStyle]}
            >
              <AntDesign name="heart" size={iconSize} color='black' />
              <Text style={styles.btnText}>{activeTitle}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => toggleFavorite({id: item.id})}
              style={[styles.wishlistBtn, btnStyle]}
                >
              <AntDesign name="hearto" size={iconSize} />
              <Text style={[styles.btnText, {opacity: 0.5}]}>{unactiveTitle}</Text>
            </TouchableOpacity>
        )}
      </View>
    );
};

export default withFavorite({listName: constants.clothes})(FavoriteButton);