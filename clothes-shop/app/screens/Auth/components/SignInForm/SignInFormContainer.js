import {
  compose,
  withProps,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import {Alert} from 'react-native';
// import { inject } from 'mobx-react';
import SignInFormView from './SignInFormView';
import {isValidEmail} from '../../../../utils/regExp';
import {withModal} from '../../../../utils/enhancers';
import ResetPasswordModal from '../ResetPasswordModal/ResetPasswordModalContainer';
import {AuthService, NavigationService} from '../../../../services';

export default compose(
  // inject((stores) => ({
  //   auth: stores.auth,
  //   isSigningIn: stores.auth.loginUser.inProgress,
  // })),

  withStateHandlers(
    {
      email: '',
      password: '',
      activeField: '',
      isValidFields: false,
      isVisibleResetPasswordModal: false,
    },
    {
      onChange: () => (field, value) => ({
        [field]: value,
      }),
    },
  ),

  withHandlers({
    signIn: ({email, password}) => async () => {
      const {errorMessage, succesfull} = await AuthService.loginByEmail({
        email,
        password,
      });
      console.log('succesfull', succesfull);
      if (succesfull) {
        NavigationService.navigateToHome();
      } else {
        if (errorMessage) {
          Alert.alert(errorMessage);
        }
      }
      // props.auth.loginUser.run({
      //   email: props.email,
      //   password: props.password,
      // });
    },

    onCloseModal: props => () =>
      props.onChange('isVisibleResetPasswordModal', false),
  }),

  withPropsOnChange(['email', 'password'], props => {
    props.onChange(
      'isValidFields',
      props.password.trim().length >= 8 && isValidEmail(props.email),
    );
  }),

  withModal(
    props => ({
      isVisible: props.isVisibleResetPasswordModal,
      onCloseModal: props.onCloseModal,
    }),
    ResetPasswordModal,
  ),
)(SignInFormView);
