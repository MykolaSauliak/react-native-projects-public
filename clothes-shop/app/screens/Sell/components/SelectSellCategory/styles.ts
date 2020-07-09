import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default StyleSheet.create({
    sellPlaceholder: {
        padding: 15,
        // fontSize: wp,
        marginVertical: 15,
        textAlign: 'center',
        fontSize: widthPercentageToDP(7)
    },
    listItem: {
        textTransform: "capitalize",
        textAlign: 'center',
        fontSize: widthPercentageToDP(6)
    }
})