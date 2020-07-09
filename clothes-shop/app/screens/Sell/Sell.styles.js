import { widthPercentageToDP } from "react-native-responsive-screen";

export default {
    bottomButtonContainer: {
        width: '100%',
        position: 'absolute', 
        bottom: 15, 
        zIndex: 2, 
        height: 65,
        paddingHorizontal: 10
    },  
    bottomButton: {
        height: '100%', 
        fontSize: widthPercentageToDP(6)
    },  
    bottomButtonTitle: {
        fontSize: widthPercentageToDP(6)
    },  
    header: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // width:'100%',
        marginVertical: 10,
    },
}

