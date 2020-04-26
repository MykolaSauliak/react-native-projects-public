import configureStore from '../store/configureStore';
import {getEmail, getPhone} from '../features/user/selectors';
import {setPhone} from '../features/user/actions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {setUser as saveUserToStore} from '../features/user/actions';

const usersRef = firestore().collection('users');
// const { store } = configureStore();

// function makeid(length) {
//   var result           = '';
//   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for ( var i = 0; i < length; i++ ) {
//      result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

class Auth {
  static store;

  constructor() {
    this.email = null;
    this.phone = null;
    this.phoneConfirmation = null;
    this.unsubscribe = null;
    // this.isLoggedIn();
  }

  removeListeners() {
    if (this.unsubscribe) {
      try {
        this.unsubscribe();
        this.unsubscribe = null;
      } catch (err) {
        // console.log('ERROR DURING REMOVE LISTENERS -', err);
      }
    }
  }

  setListener() {
    this.unsubscribe = auth().onAuthStateChanged(async user => {
      // console.log('user changed ', user);
      if (user) {
        let name;
        let last_name;
        let documentSnapshot;
        try {
          documentSnapshot = await usersRef.doc(user.uid).get();

          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            name = data.name;
            last_name = data.last_name;
          }
        } catch (err) {}
        this.store.dispatch(
          saveUserToStore({
            name,
            last_name,
            email: user.email,
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

  // is

  // async phoneExists(phone){
  //   const documentSnapshot = await firestore()
  //       .collection('phones')
  //       .doc(phone)
  //       .get()

  //   if(!documentSnapshot.exists){
  //       //console.log('phone not exists ...')
  //       return false
  //   }
  //   // //console.log('documentSnapshot',documentSnapshot)
  //   return true
  // }

  isLoggedIn = () => {
    const user = auth().currentUser;
    if (user) {
      return true;
    }
    this.store.dispatch(saveUserToStore(null));
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
    this.store.dispatch(saveUserToStore(null));
    try {
      await auth().currentUser.signOut();
    } catch (err) {}
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
    // console.log('login by email');
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      // console.log('auth().currentUser.uid - ', auth().currentUser.uid);
      const documentSnapshot = await usersRef.doc(auth().currentUser.uid).get();

      let name = '';
      let last_name = '';
      // //console.log('documentSnapshot',documentSnapshot)
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        name = data.name;
        last_name = data.last_name;
        // //console.log(data)
      }

      // if(!this.store){
      //   this.store = configureStore().store
      // }
      this.store.dispatch(
        saveUserToStore({
          email,
          name,
          last_name,
        }),
      );
      return true;
    } catch (err) {
      // console.log('error during login ', err);
      return false;
    }
  }

  async signup({email, password, name, last_name}) {
    // console.log('email',email)
    // const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    try {
      //console.log('response signup - ',response)
      // const documentSnapshot = await usersRef
      //                           .doc(auth().currentUser)
      //                         // .doc(email)
      //                         .get()
      // documentSnapshot.forEach( s => {
      //   console.log('s',s)
      // })
      // console.log('documentSnapshot',documentSnapshot)
      // console.log('documentSnapshot length',documentSnapshot.length)
      // if(documentSnapshot.length == 0){
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await usersRef.add({
        email,
        name,
        last_name,
        idcode: Date.now() + Math.random() + email[0],
        created_at: (Date.now() / 1000).toFixed(0),
        uid: auth().currentUser.uid,
      });
      return true;
      // }else{
      //   Alert.alert('User already exists')
      // }
    } catch (err) {
      // console.log('ERROR DURING SIGNUP -', err);
      return false;
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

export default new Auth();
