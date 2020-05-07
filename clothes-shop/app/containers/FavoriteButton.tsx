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
    container: {
      flexDirection:'row',
      justifyContent:'center', 
      alignItems:'flex-start', 
      backgroundColor: 'white',
    },
    wishlistBtn: {    
        // flex: 0.15,
        // backgroundColor: 'white',
        // width: 50,
        // borderRadius: 8,
        // height: 50,
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderColor: 'black',
        // borderWidth: 0.8,
    },
    favoriteCount: {
      borderRadius: 5,
      fontSize: 18,
      marginTop: -5,
      // backgroundColor: colors.gray,
      // textAlign: 'center',
      // padding: 2,
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
    count = 0,
    btnStyle = {},
    containerStyle = {},
    iconSize = 25,
    activeTitle,
    color = 'black',
    textColor,
    unactiveTitle
} : FavoriteButtonProps) => {
    return (
      <View style={[styles.container,containerStyle]}>
        {isFavorite({item}) == true ? (
            <TouchableOpacity
              onPress={() => toggleFavorite({id: item.id})}
              style={[styles.wishlistBtn, btnStyle]}
            >
              <AntDesign name="heart" size={iconSize} color={color} />
              {activeTitle && <Text style={styles.btnText}>{activeTitle}</Text>}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => toggleFavorite({id: item.id})}
              style={[styles.wishlistBtn, btnStyle]}
                >
              <AntDesign name="hearto" size={iconSize} color={color}/>
              {unactiveTitle && <Text style={[styles.btnText, {opacity: 0.5}]}>{unactiveTitle}</Text>}
            </TouchableOpacity>
        )}
        <View style={{padding:5,}}>
          <Text style={[styles.favoriteCount, {color : textColor || color}]}>{item.favorite_count}</Text>
        </View>
      </View>
    );
};

export default withFavorite({listName: constants.clothes})(FavoriteButton);