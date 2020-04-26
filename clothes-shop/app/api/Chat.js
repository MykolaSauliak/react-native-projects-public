import firestore from '@react-native-firebase/firestore';

const chatRef = firestore().collection('chats');

class Chat {
  constructor() {
    this.email = null;
    this.phone = null;
    this.phoneConfirmation = null;
    this.unsubscribe = null;
    // this.isLoggedIn();
  }
}

export default new Chat();
