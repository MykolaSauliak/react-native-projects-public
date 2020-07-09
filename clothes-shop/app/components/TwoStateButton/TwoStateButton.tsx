import React, { Component } from 'react'
import { 
    View,

    TouchableOpacity,
    StyleSheet
} from "react-native";
import Text from '../../components/Text/Text'
import {Icon} from 'react-native-elements'

type TwoStateButtonProps = {
  toggled: boolean,
  title: string,
  color?: string,
  type?: string,
  name?: string,
  toggledTitle: string,
  btnStyle?: any,
  onPress: () => void,
  onToggledPress: () => void,
  iconProps : any,
  textStyle : any,
}

const styles = StyleSheet.create({
    wishlistBtn: {    
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
      textAlign:"center",
      fontSize: 14,
      marginTop: 10,
    }
})

const TwoStateButton = ({
    toggled = false,
    onPress,
    onToggledPress,
    title = "",
    toggledTitle,
    btnStyle = {},
    color = 'black',
    type ="",
    name ="",
    iconProps = {},
    toggledIconProps = {},
    disabled=false,
    textStyle={
      fontSize: 12,
    },
}: TwoStateButtonProps) => {
    return (
        <View style={{justifyContent:'space-around', backgroundColor: null}}>
            {toggled == false ? (
            <TouchableOpacity
              onPress={onPress}
              disabled={disabled}
              style={[styles.wishlistBtn, btnStyle]}
            >
              <Icon type={type} name={name}  size={30} color={color} {...iconProps}/>
              {title.length> 0 && <Text mediumSize style={[styles.btnText, {color:color}, textStyle]}>{title}</Text>}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onToggledPress}
              style={[styles.wishlistBtn, btnStyle]}
                >
              <Icon type={type} name={name} size={30} color={color} {...toggledIconProps}/>
              {toggledTitle.length> 0 && <Text mediumSize style={[styles.btnText, {color:color}, textStyle]}>{toggledTitle}</Text>}
            </TouchableOpacity>
        )}
      </View>
    );
};

export default TwoStateButton;