import React, {Component} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {textStyle, ValidationInput} from '../../components';
import {EmailValidator, PasswordValidator} from '../../validators';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@ui-kitten/components/theme';
import colors from '../../styles/colors';
// import {  } from '@ui-kitten/components/ui';
import screens from '../../constants/screens';
import Auth from '../../api/Auth';
import i18n from '../../i18n';
// import configureStore from '../../store/configureStore'
// import { setUser } from '@sentry/react-native';

class PasswordScreen extends Component {
  state = {
    password: '',
  };

  onPasswordInputTextChange = password => {
    this.setState({
      password,
    });
  };

  onPress = async () => {
    const {password} = this.state;
    const exists = this.props.navigation.getParam('exists', false);
    // //console.log('check email response ',response)
    if (PasswordValidator(password)) {
      let ui;
      const email = this.props.navigation.getParam('email', '');
      const name = this.props.navigation.getParam('name', '');
      const last_name = this.props.navigation.getParam('last_name', '');
      //console.log('exists',exists)
      if (!exists) {
        const success = await Auth.signup({email, password, name, last_name});
        if (success) {
          // Auth.setUser({email, name, last_name, ui})
          this.props.navigation.navigate(screens.Profile);
        }
        // const response = await Auth.checkEmail(email)
        // this.props.navigation.navigate(screens.PhoneScreen, {email, password})
      } else {
        const success = await Auth.loginByEmail({email, password});
        if (success) {
          //console.log('go to profile')
          // Auth.setUser({email, name, last_name, ui})
          this.props.navigation.navigate(screens.Profile);
        }
      }
    } else {
      Alert.alert(i18n.t('authentication.passwordisnotcorrect'));
    }
  };

  render() {
    const {style, themedStyle, theme, ...restProps} = this.props;
    const {password} = this.state;
    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <ValidationInput
          style={themedStyle.emailInput}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label={i18n.t('authentication.enterpassword')}
          placeholder={i18n.t('authentication.passwdplaceholder')}
          secureTextEntry={true}
          value={password}
          validator={PasswordValidator}
          onChangeText={this.onPasswordInputTextChange}
        />
        <Button title={i18n.t('authentication.next')} onPress={this.onPress} />
        {/* <Text style={{color: 'white'}} >Next</Text>
                </Button> */}
      </View>
    );
  }
}

// PasswordScreen = connect(mapStateToProps)

export default withStyles(PasswordScreen, theme => ({
  container: {
    padding: 15,
    backgroundColor: colors.gray,
    flex: 1,
  },
  emailInput: {
    backgroundColor: colors.gray,
    //   backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  passwordInput: {
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
}));
