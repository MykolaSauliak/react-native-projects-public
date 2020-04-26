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

class EmailScreen extends Component {
  state = {
    email: '',
  };

  onEmailInputTextChange = email => {
    this.setState({
      email,
    });
  };

  onPress = async () => {
    const {email} = this.state;
    // //console.log('check email response ',response)
    // if(!response){
    if (EmailValidator(email)) {
      const exists = await Auth.emailExists(email);
      if (!exists) {
        this.props.navigation.navigate(screens.NameInputScreen, {email});
      } else {
        this.props.navigation.navigate(screens.PasswordScreen, {
          email,
          exists: true,
        });
      }
    } else {
      Alert.alert(i18n.t('authentication.entercorrectemail'));
    }
    // }else{
    //     this.props.navigation.navigate(screens.PasswordScreen,)
    // }
  };

  render() {
    const {style, themedStyle, theme, ...restProps} = this.props;
    const {email} = this.state;
    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <ValidationInput
          style={themedStyle.emailInput}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label={i18n.t('authentication.enteremail')}
          placeholder={i18n.t('authentication.email')}
          validator={EmailValidator}
          value={email}
          onChangeText={this.onEmailInputTextChange}
        />
        <Button title={i18n.t('authentication.next')} onPress={this.onPress} />
        {/* <Text style={{color: 'white'}} >Next</Text>
                </Button> */}
      </View>
    );
  }
}

export default withStyles(EmailScreen, theme => ({
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
