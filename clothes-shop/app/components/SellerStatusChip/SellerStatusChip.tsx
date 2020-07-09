import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../styles';
import {Text} from '../../components'
import globalStyles from "../../styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SellerReputationChip = ({
    reputation = "",
    containerStyle = {}
}) => {
    return (
        <View style={[containerStyle, {borderRadius: 10}]}>
            {reputation === 'trusted_seller' && (
              <View style={S.trusted_seller}>
                <AntDesign name="check" size={15} color={colors.sepiaDark} />
                <Text style={[globalStyles.text, S.trusted_seller_text]}> Trusted Seller</Text>
              </View>
            )}
            {reputation === 'expert_seller' && (
              <View style={S.trusted_seller}>
                <FontAwesome5 name="award" size={15} color={colors.sepiaDark} />
                <Text style={S.trusted_seller_text}> Expert Seller</Text>
              </View>
            )}
        </View>
    );
};

export default SellerReputationChip;

const S = StyleSheet.create({
    trusted_seller: {
        // position: 'absolute',
        // left: 2,
        // top: 2,
        backgroundColor: colors.sepiaLight,
        borderRadius: 15,
        paddingVertical:2,
        paddingHorizontal:8,
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
})