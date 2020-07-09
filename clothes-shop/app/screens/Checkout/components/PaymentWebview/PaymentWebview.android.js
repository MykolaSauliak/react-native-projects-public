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
      }, 300);
    } catch (err) {
      console.log('err', err);
    }
  }

  handleEvent = event => {
    try {
      const data = JSON.parse(event.nativeEvent.data || '{}');
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
    const {
      total
    } = this.props;
    const runFirst = `
            window.ReactNativeWebView.postMessage('hi');
        `;

    return (
      <WebView
        // source={myHtmlFile}
        ref={webView => this.webView = webView}
        source={{uri: 'file:///android_asset/stripe.html'}}
        style={{flex: 1}}
        onMessage={this.handleEvent}
        onError={error => console.log(error)}
        startInLoadingState={true}
        injectedJavaScriptBeforeContentLoaded={"window.amount = " + total/100}
        // cacheEnabled={false}
        // injectedJavaScript={runFirst}
        // javaScriptEnabled={true}
        // allowsLinkPreview={false}
        originWhitelist={['*']}
      />
    );
  }
}


// import React, {Component} from 'react';
// import {WebView} from 'react-native-webview';


// type Props = {
//   total : number
// }

// export default class PaymentModal extends Component<Props> {
//   state = {};

//   // sendPostMessage() {
//   //     console.log( "Sending post message" );
//   //     this.webView.postMessage( "Post message from react native" );
//   // }

//   componentDidMount() {
//     const {
//         total
//     } = this.props
//     try {
//       setTimeout(() => {
//         if (this.webView) {
//           this.webView.postMessage(
//             JSON.stringify({amount: total, currency: 'USD'}),
//           );
//         }
//       }, 250);
//     } catch (err) {
//       console.log('err', err);
//     }
//   }

//   handleEvent = event => {
//     try {
//       const data = JSON.parse(event.nativeEvent.data || '{}');
//       console.log('data',data)
//       if (data.token) {
//         if (this.props.onTokenRecieved) {
//           this.props.onTokenRecieved(data.token);
//         }
//       }
//     } catch (err) {
//       console.log('errro during handle event', err);
//     }

//     // console.log('event',event.nativeEvent.data)
//   };

//   componentDidUpdate(prevProps, prevState) {}

//   render() {
//     // const INJECTED_JAVASCRIPT = `(function() {
//     //     window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
//     // })();`;
//     const runFirst = `
//             window.ReactNativeWebView.postMessage('hi');
//         `;

//     return (
//       <WebView
//         // source={myHtmlFile}
//         ref={webView => this.webView = webView}
//         source={{uri: 'file:///android_asset/stripe.html'}}
//         style={{flex: 1}}
//         onMessage={this.handleEvent}
//         onError={error => console.log(error)}
//         startInLoadingState={true}
//         // cacheEnabled={false}
//         // injectedJavaScript={runFirst}
//         // javaScriptEnabled={true}
//         // allowsLinkPreview={false}
//         originWhitelist={['*']}
//       />
//     );
//   }
// }
