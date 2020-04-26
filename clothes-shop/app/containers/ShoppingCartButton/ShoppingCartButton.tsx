import React from 'react';
import { withCart } from "../../utils/enhancers";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
  import i18n from '../../i18n';

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
    isInCart
}) => {
    return (
        <View>
            {isInCart({id}) == true ? (
                <TouchableOpacity
                onPress={() => fromCart(id)}
                style={[styles.cartBtn, {backgroundColor: 'gray'}]}>
                    <Text style={styles.buyBtn}>{i18n.t('product.removefromcart')}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => toCart(id)} style={[styles.cartBtn]}>
                    <Text style={styles.buyBtn}>{i18n.t('product.addtocart')}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default withCart()(ShoppingCartButton);