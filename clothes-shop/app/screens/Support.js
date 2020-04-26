import React, {Component} from 'react';
import {
  View,
  Text,
  Linking,
  Button,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
// import {  } from 'react-native-elements';
import colors from '../styles/colors';
import support_image from '../assets/images/support.png';
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  IMessage,
} from 'react-native-gifted-chat';
import {getUniqueId} from 'react-native-device-info';
import messagesData from '../mockData/messages';
// import earlierMessages from '../mockData/earlierMessages'
// import ChatApi from '../api/Chat';
import firestore from '@react-native-firebase/firestore';
import i18n from '../i18n';

const uniqueId = getUniqueId();
// console.log('uniqueId - ',uniqueId)
const messagesRef = firestore()
  .collection('chats')
  .doc(uniqueId)
  .collection('messages');

const filterBotMessages = message =>
  !message.system && message.user && message.user._id && message.user._id === 2;

const findStep = step => message => message._id === step;

const user = {
  _id: uniqueId,
  name: '',
};

// const otherUser = {
//     _id: 2,
//     name: 'React Native',
//     avatar: 'https://facebook.github.io/react/img/logo_og.png',
// }

const styles = StyleSheet.create({
  container: {flex: 1},
});

const S = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    marginVertical: 5,
    backgroundColor: colors.orange,
    color: 'white',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    width: '90%',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default class Support extends Component {
  // static navigationOptions = {
  //     headerTitle : () => <Header   centerComponent={{ text: 'Support', style: { color: '#fff', backgroundColor : colors.dart } }} />
  // }
  state = {
    chatOpened: false,
    inverted: false,
    step: 0,
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    appIsReady: false,
  };

  _isMounted = false;
  unsubscribe = null;

  componentDidMount() {
    const uniqueId = getUniqueId();
    console.log('unique id', uniqueId);

    // messagesRef
    //     .orderBy('createdAt', 'desc')
    //     .onSnapshot(function(doc) {
    //         console.log('on snapshot',doc.docs);
    // });

    this.unsubscribe = messagesRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        console.log('Total messages', querySnapshot.size);
        console.log('Messages ', querySnapshot.docs);
        this.setState({
          messages: [
            ...querySnapshot.docs.map(d => {
              return d.data();
            }),
          ],
        });
      });

    this._isMounted = true;
    // init with only system messages
    this.setState({
      //   messages: messagesData, // messagesData.filter(message => message.system),
      appIsReady: true,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  openChat = () => {
    this.setState({
      chatOpened: true,
    });
  };

  onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              earlierMessages,
              Platform.OS !== 'web',
            ),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  };

  onSend = (messages = []) => {
    messagesRef.add(messages[0]);
    // console.log("send messages",messages)
    const step = this.state.step + 1;
    this.setState(previousState => {
      const sentMessages = [{...messages[0], sent: true, received: true}];
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        ),
        step,
      };
    });
    // for demo purpose
    // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))
  };

  onPressPhoneNumber = () => {};

  parsePatterns = _linkStyle => {
    return [
      // { type: 'phone', style: linkStyle, onPress: this.onPressPhoneNumber },
      {
        pattern: /#(\w+)/,
        style: {textDecorationLine: 'underline', color: 'darkorange'},
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ];
  };

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  onReceive = text => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(
          previousState.messages,
          [
            {
              _id: Math.round(Math.random() * 1000000),
              text,
              createdAt: new Date(),
              user: otherUser,
            },
          ],
          Platform.OS !== 'web',
        ),
      };
    });
  };

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  };

  onQuickReply = replies => {
    const createdAt = new Date();
    if (replies.length === 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ]);
    } else if (replies.length > 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map(reply => reply.title).join(', '),
          user,
        },
      ]);
    } else {
      console.warn('replies param is not set correctly');
    }
  };

  renderBubble = props => {
    return <Bubble {...props} />;
  };

  render() {
    const {chatOpened} = this.state;
    return chatOpened == false ? (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{alignItems: 'center', marginTop: 15}}>
          <Image
            source={support_image}
            style={{width: 150, height: 150}}
            resizeMode="contain"
          />
          <Text style={S.text}>{i18n.t('support.emailus')}</Text>
        </View>
        <TouchableOpacity
          style={S.btn}
          onPress={() =>
            Linking.openURL(
              'mailto:support@example.com?subject=SendMail&body=Description',
            )
          }>
          <Text style={S.btnText}>{i18n.t('support.sendemail')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={S.btn} onPress={() => this.openChat(true)}>
          <Text style={S.btnText}>{i18n.t('support.openchat')}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="main"
        testID="main">
        {/* <NavBar /> */}
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          // loadEarlier={this.state.loadEarlier}
          // onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          parsePatterns={this.parsePatterns}
          user={user}
          scrollToBottom
          // onLongPressAvatar={user => alert(JSON.stringify(user))}
          // onPressAvatar={() => alert('short press')}
          onQuickReply={this.onQuickReply}
          keyboardShouldPersistTaps="never"
          // renderAccessory={Platform.OS === 'web' ? null : this.renderAccessory}
          // renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          renderSystemMessage={this.renderSystemMessage}
          // renderCustomView={this.renderCustomView}
          quickReplyStyle={{borderRadius: 2}}
          // renderQuickReplySend={this.renderQuickReplySend}
          inverted={Platform.OS !== 'web'}
          timeTextStyle={{left: {color: 'red'}, right: {color: 'yellow'}}}
        />
      </View>
    );
  }
}
