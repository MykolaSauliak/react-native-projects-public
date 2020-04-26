import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
} from 'react-native';
import {textStyle, ValidationInput} from '../../components';
import {
  EmailValidator,
  PasswordValidator,
  PhoneNumberValidator,
} from '../../validators';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@ui-kitten/components/theme';
import colors from '../../styles/colors';
// import {  } from '@ui-kitten/components/ui';
import screens from '../../constants/screens';
import Auth from '../../api/Auth';
import CodeInput from 'react-native-confirmation-code-input';
import i18n from '../../i18n';

const S = StyleSheet.create({
  codeConfirmBox: {
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    // borderColor: 'green',
    // borderWidth: 1,
    marginVertical: 10,
  },
});

class PhoneScreen extends Component {
  state = {
    phone: '',
    showConfirmationScreen: true,
  };

  onPhoneInputTextChange = phone => {
    this.setState({
      phone,
    });
  };

  _onFulfill = async code => {
    const isConfirmed = Auth.confirmPhone(code);
    if (isConfirmed) {
      const email = this.navigation.getParam('email', '');
      const password = this.navigation.getParam('password', '');
      const successSignUp = await Auth.signup({email, password, phone});
    }
  };

  onPress = async () => {
    const {phone} = this.state;
    if (PhoneNumberValidator(phone)) {
      const response = await Auth.phoneExists(phone);
      //console.log('check phone response ',response)
      if (!response) {
        const success = await Auth.verifyPhone({phone});
        if (success) {
          this.setState({
            showConfirmationScreen: true,
          });
        } else {
        }
      }
    } else {
      Alert.alert('Enter correct phone number');
    }

    }

  render() {
    const {style, themedStyle, theme, ...restProps} = this.props;
    const {phone, showConfirmationScreen} = this.state;
    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <ValidationInput
          style={themedStyle.emailInput}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label="Enter phone"
          placeholder="Phone number"
          validator={PhoneNumberValidator}
          value={phone}
          onChangeText={this.onPhoneInputTextChange}
        />
        {showConfirmationScreen && (
          <View style={S.codeConfirmBox}>
            <Text style={{fontSize: 16, fontStyle: 'italic'}}>
              Enter confirmation code bellow{' '}
            </Text>
            <CodeInput
              ref="codeInputRef1"
              secureTextEntry
              activeColor="green"
              inactiveColor="gray"
              className={'border-b'}
              codeLength={6}
              space={5}
              // containerStyle={{}}
              size={40}
              inputPosition="left"
              onFulfill={code => this._onFulfill(code)}
            />
          </View>

                }
        <Button title="next" onPress={this.onPress} />
        {/* <Text style={{color: 'white'}} >Next</Text>
                </Button> */}
      </View>
    );
  }
}

export default withStyles(PhoneScreen, theme => ({
  container: {
    padding: 15,
    backgroundColor: colors.gray,
    flex: 1,
  },
  emailInput: {
    backgroundColor: colors.gray,
    marginTop: 15,
    //   backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  passwordInput: {
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
}));
