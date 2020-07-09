import React from 'react';
import { View, StyleSheet, Keyboard } from "react-native";
import { Text, BackHeaderCenter, ListItem } from '../../../components';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { colors } from '../../../styles';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import constants from '../../../constants';
import { withAuth } from '../../../utils/enhancers';
import userFields from '../../../constants/userFields';
import { AuthService, NavigationService } from '../../../services';
import S from '../../../components/ProductListItem/style';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const NegotiationOptions = ({
    loggedInUser,
    lastUpdate,
    navigation
}) => {

    React.useEffect(() => {
        Keyboard.dismiss()
    }, [])
    const goBack = navigation.getParam('goBack', () => NavigationService.goBack())
    // let [checked, setChecked] = React.useState(loggedInUser[userFields.receive_negotiation.receive_negotiation])
    const radio_props = [
        {label: 'To receive price offers on all your items', value: userFields.receive_negotiation.all },
        {label: 'Not to receive price offers on your items', value: userFields.receive_negotiation.neither },
        {label: 'To choose items for which you would like to receive price offers', value: userFields.receive_negotiation.choose },
    ]
    return (
        <View style={{flex:1}}>
            <BackHeaderCenter title="Setup" goBack={goBack}/>
            <View style={{padding: 15}}>
                <Text xmediumSize style={S.title}>
                    We allow buyers to make price offers to enable you to sell your items more quickly.
                </Text>
                <Text bold xmediumSize  style={S.title}>
                    {`\nIf you do not wish to receive offers, you can adjust your preference settings.\nDo you prefer:`}
                </Text>
            </View>
            <View style={{padding: 10}}>
                    {radio_props.map(res => {
                        return (
                            <ListItem 
                                topDivider
                                // bottomDivider
                                containerStyle={{height: constants.rowHeight}}
                                leftElement={                                <TouchableOpacity
                                    style={[styles.radioCircle, loggedInUser[userFields.receive_negotiation.receive_negotiation] === res.value ? {borderColor: colors.orange} : {borderColor:'black'}]}
                                    onPress={() => {
                                        AuthService.updateUser({
                                            [userFields.receive_negotiation.receive_negotiation] :res.value
                                        })
                                    }}>
                                    {loggedInUser[userFields.receive_negotiation.receive_negotiation] === res.value && <View style={styles.selectedRb} />}
                                </TouchableOpacity>}
                                title={<Text xxmediumSize style={styles.radioText}>{res.label}</Text>}
                                onPress={() => AuthService.updateUser({
                                    [userFields.receive_negotiation.receive_negotiation] :res.value
                                })}
                                Component={TouchableWithoutFeedback}
                                />

                        );
                    })}
                    {/* <Text> Selected: {checked} </Text> */}
                </View>
        </View>
    );
};

export default withAuth()(NegotiationOptions);

const styles = StyleSheet.create({
	container: {
        marginBottom: 35,
        alignItems: 'center',
        flexDirection: 'row',
		justifyContent: 'flex-start',
	},
    radioText: {
        marginRight: 35,
        fontSize: widthPercentageToDP(4.5),
        color: '#000',
        // marginTop: -5,
    },
	radioCircle: {
		height: 20,
		width: 20,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: colors.orange,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 10,
		height: 10,
        borderRadius: 10,
        borderColor: colors.orange,
		backgroundColor: colors.orange,
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});