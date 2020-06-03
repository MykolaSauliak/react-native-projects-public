import {Alert, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
import messaging, {firebase, AuthorizationStatus} from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import {
  addNotification,
  setLastShowTs,
} from '../features/notifications/actions';
import {getShowHours, getLastShowTs, isNotificationExists} from '../features/notifications/selectors';
import moment from 'moment';
import shortid from 'shortid';


class NotifService {
  static _store = null;
  static unsubscribe = null;
  lastId = 0;

  
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async init(store) {
    if (!this._store) {
      this._store = store;
    }

    console.log('tr to init notifservice');
    try {
      // this.configure(
      //   Token => {
      //     console.log('TOKEN', Token);
      //   },
      //   notification => {
      //     console.log('new notification', notification);
      //     notification.created_time = Date.now();
      //     this._store.dispatch(addNotification(notification));
      //       PushNotification.localNotificationSchedule({
      //         //... You can use all the options from localNotifications
      //         id: notification.created_time,
      //         autoCancel: false,
      //         // bigText: notification.title,
      //         message: notification.title,
      //         smallIcon: notification?.rightImage || notification?.leftImage,
      //         vibrate: true, // (optional) default: true
      //         vibration: 300,
      //         date: new Date(Date.now() + 100), // in 60 secs
      //       });
      //       try{
      //         this._store.dispatch(setLastShowTs(type))
      //       }catch(err){
  
      //       }
      //     // }
      //   },
      // );

      const notificationHandler = async (remoteMessage) => {
          const notification = remoteMessage.data
          notification.created_time = notification.created_time || Date.now();
          const notificationExists = isNotificationExists(notification, this._store.getState())
          if(notificationExists){
            console.log('notification exist')
            return 
          }
          this._store.dispatch(addNotification(notification));
          //   PushNotification.localNotificationSchedule({
          //     //... You can use all the options from localNotifications
          //     id: 0,
          //     title: notification.title, // (optional)
          //     message: notification?.subtitle || "", // (required)
          //     largeIcon: notification?.leftImage || notification?.rightImage || "",
          //     smallIcon: require('../assets/images/logo.png'),
          //     vibrate: true, // (optional) default: true
          //     vibration: 300,
          //     date: new Date(Date.now() + 100), // 
          //     //for ios
          // });
          try{
            this._store.dispatch(setLastShowTs(type))
          }catch(err){

          }
      } 

      await messaging().registerForRemoteNotifications();
         // If your app is closed

      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        console.log('getInitialNotification:');
        notificationHandler(notificationOpen)
      }

      this.notificationListener = firebase.notifications().onNotification((notification) => {
        const localNotification = new firebase.notifications.Notification({
          show_in_foreground: true,
        })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
    });
      
      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      messaging().onNotificationOpenedApp(remoteMessage => {
        notificationHandler(remoteMessage)
        // console.log(
        //   'Notification caused app to open from background state:',
        //   remoteMessage.notification,
        // );
        // navigation.navigate(remoteMessage.data.type);
      });

      await this.requestUserPermission();
      messaging().getToken().then(fcmToken => {
        this.saveTokenToDatabase(fcmToken)
        console.log('fcmToken', fcmToken);
      })
      messaging().onTokenRefresh(token => {
        this.saveTokenToDatabase(token);
      });
      
      await messaging().setBackgroundMessageHandler(notificationHandler);
      this.unsubscribe = messaging().onMessage(notificationHandler);

    } catch (err) {
      console.log('ERROR DURING FETHC UID AND STORE TOKEN', err);
    }

    
  }

  saveTokenToDatabase = async (fcmToken) => {
      // Assume user is already signed in
    const userId = auth().currentUser?.uid;

    // Add the token to the users datastore
    await firestore()
      .collection('users')
      .doc(userId)
      .set(
        {
          fcmToken: fcmToken,
        },
        {
          merge: true,
        },
      );
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  configure = (onRegister, onNotification, gcm = '') => {
    
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: onRegister,
      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotification,
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: gcm,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  };

  localNotif() {
    this.lastId++;
    PushNotification.localNotification({
      /* Android Only Properties */
      id: '' + this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: null, // (optional) default: null
      userInfo: null, // (optional) default: null (object containing additional notification data)

      /* iOS and Android properties */
      title: 'Local Notification', // (optional)
      message: 'My Notification Message', // (required)
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    });
  }

  async subscribeToPriceReduction(id) {
    let user = auth().currentUser;
    if (!user || !user.uid) {
      return;
    }

    try {
      await firestore()
        .doc(`users/${user.uid}`)
        .update(`alerts.price_reduction.${id}`, true);
      console.log('update alerts');
      return true;
    } catch (err) {
      console.log('ERROR unsubscribeToPriceReduction', err);
      return false;
    }
  }

  async unsubscribeToPriceReduction(id) {
    let user = auth().currentUser;
    if (!user || !user.uid) {
      return;
    }
    try {
      await firestore()
        .doc(`users/${user.uid}`)
        .update(`alerts.price_reduction.${id}`, false);
      console.log('update alerts');
      return true;
    } catch (err) {
      console.log('ERROR unsubscribeToPriceReduction', err);
      return false;
    }
  }

  scheduleNotif() {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 30 * 1000), // in 30 secs

      /* Android Only Properties */
      id: '' + this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'blue', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: null, // (optional) default: null
      userInfo: null, // (optional) default: null (object containing additional notification data)

      /* iOS and Android properties */
      title: 'Scheduled Notification', // (optional)
      message: 'My Notification Message', // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  }

  async hasPermission() {
    let hasPermission = await messaging().hasPermission();
    return hasPermission;
  }

  async subscribeToTopic(topic) {
    await messaging().subscribeToTopic(topic);
    return true;
  }

  async unsubscribeToTopic(topic) {
    await messaging().unsubscribeFromTopic(topic);
    return true;
  }

  async requestPermission() {
    let granted = await messaging().requestPermission();
    return granted;
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  removeListeners() {
    if(this.unsubscribe){
      this.unsubscribe();
    }
    // this.notificationListener();
    // this.notificationListener2();
    // this.notificationOpenedListener();
  }
}

export default new NotifService();
