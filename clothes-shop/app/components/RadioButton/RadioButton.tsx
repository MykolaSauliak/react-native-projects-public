import React from 'react';
import {
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import globalStyles from "../../styles";
import constants from '../../constants';
import { colors } from '../../styles';

const RadioButton = ({
    onPress = () => {},
    active = false,
}) => {
    return (
    <TouchableOpacity
        style={[globalStyles.radioCircle, active ? {borderColor: colors.orange} : {borderColor:'black'}]}
        onPress={onPress}
        >
        {active && <View style={globalStyles.selectedRb} />}
    </TouchableOpacity>
    );
};

export default RadioButton;