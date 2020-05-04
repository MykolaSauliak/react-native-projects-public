import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

type Props = {
    total : number
}

export default class PaymentModal extends Component<Props> {

  state = {};
  // sendPostMessage() {
  //     console.log( "Sending post message" );
  //     this.webView.postMessage( "Post message from react native" );
  // }

  componentDidMount() {
    const {
        total
    } = this.props
    try {
      setTimeout(() => {
        if (this.webView) {
          this.webView.postMessage(
            JSON.stringify({amount: total, currency: 'USD'}),
          );
        }
      }, 1500);
    } catch (err) {
      console.log('err', err);
    }
  }

  handleEvent = event => {
    try {
      let data = JSON.parse(event.nativeEvent.data || '{}');
      // console.log('data',data)
      if (data.token) {
        if (this.props.onTokenRecieved) {
          this.props.onTokenRecieved(data.token);
        }
      }
    } catch (err) {
      console.log('errro during handle event', err);
    }
    // console.log('event',event.nativeEvent.data)
  };


  render() {
    // const INJECTED_JAVASCRIPT = `(function() {
    //     window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
    // })();`;
    const runFirst = `
            window.ReactNativeWebView.postMessage('hi');
        `;

    return (
      <WebView
        // source={myHtmlFile}
        ref={webView => (this.webView = webView)}
        source={require('./stripe.html')}
        style={{flex: 1}}
        onMessage={this.handleEvent}
        onError={error => console.log(error)}
        startInLoadingState={true}
        // cacheEnabled={false}
        // injectedJavaScript={runFirst}
        // javaScriptEnabled={true}
        // allowsLinkPreview={false}
        originWhitelist={['*']}
      />
    );
  }
}
