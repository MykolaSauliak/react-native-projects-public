import constants from "../../constants";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default {
    topLists: {
        // aspectRatio: 3 / 1,
        paddingVertical: 10,
        paddingHorizontal: 0,
        // maxHeight: 150,

        backgroundColor: 'white',
    },
    topListItem: {
        width: constants.DEVICE_WIDTH * 0.18,
        height: '100%',
        // maxHeight: 125,
        // marginHorizontal : 10,
        // marginVertical : 15,
        margin: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      topListImage: {
        width: constants.DEVICE_WIDTH * 0.18 * 0.95,
        aspectRatio: 1,
        borderRadius: constants.DEVICE_WIDTH * 0.18 * 0.7,
        borderColor: 'red',
        borderWidth: 1,
        // marginVertical:5,
        // backgroundColor: colors.gray,
        // s: 15,
      },
      topListTitle: {
        textAlign: 'center',
        // fontSize: 11,
        color: 'black',
        marginTop: 6,
        lineHeight: 13,
        fontSize: 11
      },
}