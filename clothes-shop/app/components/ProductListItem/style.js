import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { colors } from "../../styles";

const S = StyleSheet.create({
    price: {
      fontSize: widthPercentageToDP(4.5),
    },
    priceContainer:{
      flexDirection:'row', 
      alignItems:'center',
      justifyContent:'center'
    },
    cartBtn: {
      padding: 12,
      // position: "absolute",
      bottom: 0,
      backgroundColor: colors.black,
      borderRadius: 5,
      marginTop: 20,
    },
    id: {
      // color: colors.gray,
      color: 'gray',
      fontSize: 13,
    },
    title: {
      color: 'black',
      fontSize: widthPercentageToDP(5),
      lineHeight: 24
    },
    newPrice: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    discountPrice: {
      color: 'gray',
      marginHorizontal: 3,
  
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    },
    desc: {
        fontSize: widthPercentageToDP(5),
        color: 'gray',
    },
    discount: {
      fontWeight: 'bold',
      backgroundColor: 'red',
      borderRadius: 5,
      color: 'white',
      padding: 3,
      // padding: 5
    },
    countBox: {
      backgroundColor: colors.gray,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

  export default S