import React from 'react';
import { View , Text, TouchableOpacity, StyleSheet } from "react-native";
import i18n from "../../i18n";
import {  NavigationService } from "../../services";
import colors from "../../styles/colors";

const NotAuthorizedUser = ({
    onPress
}) => {
    return (
        <View style={{flexDirection: 'row', marginTop: 15}}>
            <Text style={S.text}>{i18n.t('profile.unlocktext')}</Text>
            <TouchableOpacity onPress={onPress}>
            <Text style={[S.text, {color: colors.orange}]}>
                {i18n.t('profile.logintext')}
            </Text>
            </TouchableOpacity>
      </View>
    );
};

NotAuthorizedUser.defaultProps = {
    onPress : () => NavigationService.navigateToAuth()
}

export default NotAuthorizedUser;

const S = StyleSheet.create({

})