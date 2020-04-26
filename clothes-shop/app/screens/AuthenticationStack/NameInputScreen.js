import React, {Component} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {textStyle, ValidationInput} from '../../components';
import {
  EmailValidator,
  PasswordValidator,
  StringValidator,
} from '../../validators';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@ui-kitten/components/theme';
import colors from '../../styles/colors';
// import {  } from '@ui-kitten/components/ui';
import screens from '../../constants/screens';
import i18n from '../../i18n';
// import Auth from '../../api/Auth';

class EmailScreen extends Component {
  state = {
    name: '',
  };

  onEmailInputTextChange = name => {
    this.setState({
      name,
    });
  };

  onPress = async () => {
    const {name} = this.state;
    const email = this.props.navigation.getParam('email', '');
    // const response = await Auth.checkEmail(email)
    // //console.log('check email response ',response)
    // if(!response){
    if (StringValidator(name)) {
      this.props.navigation.navigate(screens.SurnameInputScreen, {email, name});
    } else {
      Alert.alert(i18n.t('authentication.entercorrectname'));
    }
    // }else{
    //     this.props.navigation.navigate(screens.PasswordScreen,)
    // }
  };

  render() {
    const {style, themedStyle, theme, ...restProps} = this.props;
    const {name} = this.state;
    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <ValidationInput
          style={themedStyle.emailInput}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          label={i18n.t('authentication.whatisyourname')}
          placeholder={i18n.t('authentication.name')}
          validator={StringValidator}
          value={name}
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
