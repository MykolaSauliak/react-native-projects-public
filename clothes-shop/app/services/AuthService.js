import configureStore from '../store/configureStore';
import {getEmail, getPhone} from '../features/user/selectors';
import {setPhone} from '../features/user/actions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {setUser as saveUserToStore, updateUser} from '../features/user/actions';
import constants from '../constants';

const usersRef = firestore().collection('users');

class AuthService {
  store;

  constructor() {
    this.email = null;
    this.phone = null;
    this.phoneConfirmation = null;
    this.unsubscribe = null;
    // this.isLoggedIn();
  }

  init(store) {
    if (!this.store) {
      this.store = store;
    }
  }

  removeListeners() {
    if (this.unsubscribe) {
      try {
        this.unsubscribe();
        this.unsubscribe = null;
      } catch (err) {
        console.log('ERROR DURING REMOVE LISTENERS -', err);
      }
    }
  }

  setListener() {
    this.unsubscribe = auth().onAuthStateChanged(async user => {
      console.log('user changed ', user);
      if (user) {
        let name;
        let last_name;
        let bio;
        let avatar = constants.DEFAULT_AVATAR;
        let documentSnapshot;
        try {
          documentSnapshot = await usersRef.doc(user.uid).get();
          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            name = data.name;
            last_name = data.last_name;
            bio = data.bio;
            avatar = data.avatar;
            receive_negotiation = data.receive_negotiation;

            await documentSnapshot.ref.update({
              last_active: Date.now(),
            });
          }
        } catch (err) {}
        this.store.dispatch(
          saveUserToStore({
            name,
            last_name,
            avatar,
            bio,
            uid: user.uid,
            email: user.email,
            receive_negotiation
          }),
        );
      } else {
        this.store.dispatch(saveUserToStore(null));
      }
    });
  }

  async emailExists(email) {
    try {
      const response = await auth().fetchSignInMethodsForEmail(email);
      if (!response || response.length == 0) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  isLoggedIn = () => {
    const user = auth().currentUser;
    if (user) {
      return true;
    }
    // this.store.dispatch(saveUserToStore(null))
    return false;
    // return !!this.phone;
  };

  getEmail() {
    const user = auth().currentUser;
    if (user) {
      return user.email;
    }
    return user;
  }

  async check() {
    const phone = getPhone(this.store.getState());
    // let auth = (await AuthStorage.get()) || {};

    // this.token = auth.token;
    // return auth.token;
    this.phone = phone;
    return phone;
  }

  async logout() {
    // this.phone = null;
    try {
      await auth().signOut();
    } catch (err) {
      console.log('ERROR DURING LOGOUT', err);
    }
    // await AuthStorage.clear();
  }

  confirmPhone(code) {
    try {
      // //console.log('try to confirm phone')
      const user = this.phoneConfirmation.confirm(code);
      // //console.log('user after confirm',user)
      this.store.dispatch(setUser(user));
    } catch (err) {
      // //console.log('ERROR DURING PHONE CONFIRMATION',err)
    }
  }

  async loginByPhone(phone) {
    // //console.log('try to sign up with phone')
    // auth().onAuthStateChanged(user => {
    //     if (user) {
    //         //console.log('user',user);
    //       // Stop the login flow / Navigate to next page
    //     }
    //   });
    this.phone = phone;
    // //console.log('try to signInWithPhoneNumber',phone)
    try {
      this.phoneConfirmation = await auth().signInWithPhoneNumber(phone);
      // //console.log('confirmation',confirmation)
      this.store.dispatch(setPhone(phone));
      return true;
      // store.dispatch(show(phone))
      // await AuthStorage.merge({ token });
    } catch (err) {
      return false;
    }
  }

  async loginByEmail({email, password}) {
    console.log('login by email');
    let successful = false;
    let errorMessage = '';
    try {
      await auth().signInWithEmailAndPassword(email, password);
      successful = true;
    } catch (err) {
      errorMessage = err.message;
      successful = false;
    } finally {
      return {
        errorMessage,
        successful,
      };
    }
  }

  async signup({email, password, name, last_name}) {
    let successful = false;
    let errorMessage = '';
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      let user = auth().currentUser
      console.log('response', response);
      await usersRef.doc(user.uid).set(
        {
          email,
          name,
          last_name,
          idcode: Date.now() + Math.random() + email[0],
          created_at: (Date.now() / 1000).toFixed(0),
          uid: user.uid,
        },
        {
          merge: true,
        },
      );
      this.store.dispatch(
        saveUserToStore({
          name,
          last_name,
          uid: user.uid,
          email: user.email,
        }),
      );
      successful = true;
    } catch (err) {
      errorMessage = err.message;
      // console.log(typeof err.message)
      console.log(err.message);
      console.log(err.name);
      // console.log(Object.keys(err))
      console.log('ERROR DURING SIGNUP -', err);
    } finally {
      return {successful, errorMessage};
    }
  }

  async verifyPhone({phone}) {
    auth()
      .verifyPhoneNumber(phone)
      .on('state_changed', phoneAuthSnapshot => {
        //console.log('Snapshot state: ', phoneAuthSnapshot.state);
        switch (phoneAuthSnapshot.state) {
          case auth.PhoneAuthState.CODE_SENT:
          //console.log('code sent',phoneAuthSnapshot);
        }
      });
  }

  async changeAvatar(filepath) {
    const user = auth().currentUser;
    if (!user.uid) {
      return;
    }
    let newUrl = '';
    console.log('changeAvatar', user, filepath);
    try {
      const storageForDefaultApp = firebase.storage();
      let file = await storageForDefaultApp
        .ref('avatar/' + user.uid)
        .putFile(filepath);
      let fullPath = file.metadata.fullPath;
      let downloadedURL = await storageForDefaultApp
        .ref(fullPath)
        .getDownloadURL();
      newUrl = downloadedURL;
      await usersRef.doc(user.uid).update({
        avatar: downloadedURL,
      });
    } catch (err) {
      console.log('ERROR DURING CHANGE AVATAR', err);
    } finally {
      console.log('new url', newUrl);
      return newUrl;
    }
  }

  async updateUser(update) {
    const user = auth().currentUser;
    if (!user.uid) {
      return;
    }
    let successfull = false
    try {
      this.store.dispatch(updateUser(update))
      await usersRef.doc(user.uid).update(update);
      successfull = true
    } catch (err) {
      console.log('ERROR DURING updateUser', err);
    } finally {
      return {
        successfull
      };
    }
  }

  static setUser({email, name, last_name}) {
    //console.log(email, name);
    try {
      this.store.dispatch(
        saveUserToStore({
          email,
          name,
          last_name,
        }),
      );
      //console.log('user is saved..')
    } catch (err) {
      //console.log('error during store user local -',err);
    }
  }
}

export default new AuthService();
