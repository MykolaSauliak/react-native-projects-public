import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {WebView} from 'react-native-webview';

const PaypalModalView = ({href, accessToken, _onNavigationStateChange}) => {
  //console.log('href',href)
  return (
    <View style={{flex: 1}}>
      <WebView
        // style={{ flex:1 }}
        source={{uri: JSON.parse(href)}}
        onNavigationStateChange={_onNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        // style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default PaypalModalView;
