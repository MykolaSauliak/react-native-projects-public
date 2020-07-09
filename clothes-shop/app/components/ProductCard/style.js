import {StyleSheet} from 'react-native'
import constants from '../../constants'
import { colors } from '../../styles'

export default StyleSheet.create({
    container: {
        maxWidth: constants.DEVICE_WIDTH * 0.5,
        borderColor: 'white',
        // minHeight: 250,
        elevation: 0,
        // margin: 2,
        // padding: 0,
    },
    headerContainer: {
        width: '100%',
        // margin: 5,
        marginTop: -5,
        minHeight: 45,
        backgroundColor: null
        // top: 0,
        // backgroundColor: null,
        // position: 'absolute',
        // zIndex: 2,
    },
    headerLeft:{
        // position: 'absolute', 
        // left: 0, 
        // top: 0
    },           
    headerRight:{
      backgroundColor: null,
      flexDirection:'row', 
      alignItems:'center',
      justifyContent:'flex-end'
        // position: 'absolute',
        // right: 10,
        // top: 0,
        // alignItems: 'center',
    },           
    cartBtn: {
        padding: 12,
        // position: "absolute",
        bottom: 0,
        backgroundColor: colors.orange,
        borderRadius: 5,
        marginTop: 20,
      },
      id: {
        // color: colors.gray,
        color: 'gray',
        fontSize: 13,
      },
      text: {
        fontSize: 17,
        lineHeight: 24,
      },
      bottomText: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: '900',
        textTransform: 'capitalize'
      },
      title: {
        color: 'black',
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '900'
      },
      price: {
        fontSize: 15,
        fontWeight: '600',
      },
      priceOld: {
        textDecorationStyle: 'solid', 
        textDecorationLine: 'line-through',
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
        fontSize: 15,
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
      favoriteCount: {
        borderRadius: 5,
        fontSize: 10,
        margin: 2,
        backgroundColor: colors.gray,
        textAlign: 'center',
        padding: 2,
      },
      trusted_seller: {
        // position: 'absolute',
        // left: 2,
        // top: 2,
        backgroundColor: colors.sepiaLight,
        borderRadius: 3,
        padding: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      trusted_seller_text: {
        fontSize: 9,
        textAlign: 'center',
        color: colors.sepiaDark,
        // marginRight:2
      },
      favoriteBox: {
        // position: 'absolute',
        // right: 2,
        // top: 2,
      },
      locationBox: {
        width: '100%',
        // justifyItems:
        // height: 10,
        flexDirection: 'row',
        // padding: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
})