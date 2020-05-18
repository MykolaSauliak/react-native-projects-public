import React from 'react';
import { View, StyleSheet } from "react-native";
import { Text, BackHeaderCenter } from '../../../components';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { colors } from '../../../styles';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import constants from '../../../constants';
import { withAuth } from '../../../utils/enhancers';
import userFields from '../../../constants/userFields';
import { AuthService, NavigationService } from '../../../services';

const NegotiationOptions = ({
    loggedInUser,
    lastUpdate
}) => {
    // let [checked, setChecked] = React.useState(loggedInUser[userFields.receive_negotiation.receive_negotiation])
    let radio_props = [
        {label: 'To receive price offers on all your items', value: userFields.receive_negotiation.all },
        {label: 'Not to receive price offers on your items', value: userFields.receive_negotiation.neither },
        {label: 'To choose items for which you would like to receive price offers', value: userFields.receive_negotiation.choose },
    ]
    return (
        <View style={{flex:1}}>
            <BackHeaderCenter title="Setup" goBack={() => NavigationService.navigateToMyNegotiations()}/>
            <View style={{padding: 15}}>
                <Text xmediumSize>
                    We allow buyers to make price offers to enable you to sell your items more quickly.
                </Text>
                <Text bold xmediumSize>
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
                                    style={styles.radioCircle}
                                    onPress={() => {
                                        AuthService.updateUser({
                                            [userFields.receive_negotiation.receive_negotiation] :res.value
                                        })
                                    }}>
                                    {loggedInUser[userFields.receive_negotiation.receive_negotiation] === res.value && <View style={styles.selectedRb} />}
                                </TouchableOpacity>}
                                title={<Text style={styles.radioText}>{res.label}</Text>}
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
        fontSize: 16,
        color: '#000',
        marginTop: -5,
    },
	radioCircle: {
		height: 20,
		width: 20,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: colors.black,
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