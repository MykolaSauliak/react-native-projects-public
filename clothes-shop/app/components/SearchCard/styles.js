import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default StyleSheet.create({
    title: {
    marginVertical: 10, 
    textTransform: 'uppercase',
    fontSize: widthPercentageToDP(5)
    },
    listCard: {
        marginHorizontal: 5,
        // width: constants.DEVICE_WIDTH * 0.4, 
        // height: null, 
        // aspectRatio: 1/1.3, 
        alignItems:'center'
      },
})