import React from 'react';
import {compose, withHandlers, defaultProps, hoistStatics} from 'recompose';
// import { inject } from 'mobx-react';
import SignUpFormView from './SignUpFormView';
import {AuthService, NavigationService} from '../../../../services';
import {Alert} from 'react-native';

export default hoistStatics(
  compose(
    // inject((stores) => ({
    //   auth: stores.auth,
    //   isSigningUp: stores.auth.registerUser.inProgress,
    // })),
    defaultProps({
      formRef: React.createRef(),
    }),

    withHandlers({
      signUp: props => async ({last_name, firstName, email, password}) => {
        try {
          const {succesfull, errorMessage} = await AuthService.signup({
            email,
            password,
            name: firstName,
            last_name: last_name,
          });
          if (succesfull) {
            NavigationService.navigateToHome();
          } else {
            if (errorMessage) {
              Alert.alert(errorMessage);
            }
          }
          // props.auth.registerUser.run({
          //   last_name,
          //   firstName,
          //   email,
          //   password,
          // });
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ),
)(SignUpFormView);
