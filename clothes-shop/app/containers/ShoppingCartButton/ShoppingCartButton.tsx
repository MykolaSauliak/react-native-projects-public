import React from 'react';
import { withCart } from "../../utils/enhancers";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  import i18n from '../../i18n';
  import { Button } from 'react-native-elements';
import ButtonBlack from '../../components/Button/ButtonBlack';

const styles = StyleSheet.create({
    cartBtn: {
        flex: 0.6,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 8,
      },
      buyBtn: {
        color: 'white',
        fontSize: 13,
        // fontFamily: '1592 GLC Garamond',
      },
})

const ShoppingCartButton = ({
    id,
    fromCart,
    toCart,
    isInCart,
    containerStyle,
}) => {
    return (
        <View style={{flex:1}}>
            {isInCart({id}) == true ? (
                <ButtonBlack
                    onPress={() => fromCart(id)}
                    style={[{backgroundColor: 'gray'}]}
                    title={i18n.t('product.removefromcart')}
                    titleStyle={styles.buyBtn}
                    containerStyle={{paddingHorizontal: 3}}
                    />
                //     {/* <Text style={styles.buyBtn}>{i18n.t('product.removefromcart')}</Text> */}
                // {/* </Button> */}
            ) : (
                <ButtonBlack 
                    onPress={() => toCart(id)}
                    title={i18n.t('product.addtocart')}
                    titleStyle={styles.buyBtn}
                    containerStyle={{paddingHorizontal: 3}}
                    />
                // <TouchableOpacity onPress={() => toCart(id)} style={[styles.cartBtn]}>
                //     <Text style={styles.buyBtn}>{i18n.t('product.addtocart')}</Text>
                // </TouchableOpacity>
            )}
        </View>
    );
};

export default withCart()(ShoppingCartButton);