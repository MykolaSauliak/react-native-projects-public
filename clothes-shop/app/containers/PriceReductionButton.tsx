import React, { Component } from 'react'
import { 
    View,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import Text from '../components/Text/Text'
import { withNotifications } from "../utils/enhancers";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors'

type PriceReductionButtonProps = {
  item: any,
  id: string,
  btnStyle: any,
  isPriceAlert: (item : string) => boolean,
  isFollowingAlert: (id : string) => boolean,
  unsubscribeToPriceReduce: (id : string) => void,
  subscribeToPriceReduce: (id : string) => void,
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
      // fontSize: 12,
      marginTop: 10,
      textAlign:'center',
    }
})

const PriceReductionButton = ({
    isPriceAlert,
    isFollowingAlert,
    unsubscribeToPriceReduce,
    subscribeToPriceReduce,
    item,
    color = ' black',
    btnStyle = {},
    onPress,
} : PriceReductionButtonProps) => {
    return (
      <View style={[{justifyContent:'space-around'},styles.wishlistBtn, btnStyle]}>
        {isPriceAlert(item.id) == true ? (
            <TouchableOpacity
              onPress={() =>  onPress ? onPress() : unsubscribeToPriceReduce(item.id)}
              style={styles.wishlistBtn}
            >
              <FontAwesome  name="chevron-down"  size={30} color={color} />
              <Text mediumSize style={[styles.btnText, {color:color}]}>{`Price reduction \nupdates`}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>   onPress ? onPress() : subscribeToPriceReduce(item.id)}
              style={[styles.wishlistBtn, btnStyle]}
                >
              <FontAwesome name="angle-double-down" size={30} color={color}/>
              <Text mediumSize style={[styles.btnText, {color:color}]}>{`Price reduction \nupdates`}</Text>
            </TouchableOpacity>
        )}
      </View>
    );
};

export default withNotifications()(PriceReductionButton);