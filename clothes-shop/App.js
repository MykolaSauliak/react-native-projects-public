/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from "./app/store/configureStore";
import { Provider, connect } from "react-redux";
import {
  getShowStatusBar
} from './app/features/settings/selectors'
import { ApplicationProvider, Layouts } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import screens from './app/constants/screens';
import { updateInfo } from './app/features/cart/operations'
import * as Sentry from '@sentry/react-native';
import switchStatusBar from './app/utils/switchStatusBar';
import DevMenu from '@terrysahaidak/react-native-devmenu';
import {NavigationService} from './app/services'
import {AuthService, NotifService} from './app/services'
import {
  compose,
  lifecycle
} from 'recompose';
import logo from './app/assets/images/logo.png'
import RNExitApp from 'react-native-exit-app';
import { Loading } from './app/components';
import { withReduxLoading } from './app/utils/enhancers';
import StorybookUIRoot from './storybook'
import config from './config';
import { getSearchState } from './app/features/search/selectors';
import { setSearchState } from './app/features/search/actions';
import SplashScreen from 'react-native-splash-screen';
import codePush from "react-native-code-push";

Sentry.init({ 
  dsn: 'https://073c5556bc9248f5a65f22a7ee8a0a4b@sentry.io/1887462', 
});

if (__DEV__) {
  // SplashScreen.hide();
  // eslint-disable-next-line global-require
  import('./app/ReactotronConfig').then(() => console.log('Reactotron Configured'))
  // Reactotron.trackMstNode(store);
  /*   SentryIoService.setOptions({
    environment: 'development',
  }); */
} else {
    global.console = {
        info: () => {},
        log: () => {},
        assert: () => {},
        warn: () => {},
        debug: () => {},
        error: () => {},
        time: () => {},
        timeEnd: () => {},
    };
  // SentryIoService.setOptions({
  //   environment: 'production',
  // });
  // SentryIoService.init();
}

// console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

const { store, persistor } =  configureStore()

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

function recieveLocale(){
  return 'US'
}

const ThemeContext = React.createContext({getLocale : recieveLocale});

const   root = {
  Root: View,
  props: {
    style: {
      flex: 1,
    },
  },
};

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };


const App: () => React$Node = ({

}) => {

  // let [searchState, setSearchState] = useState({})
  // console.log('store.getState().settings',store.getState().settings
  return (
        <DevMenu numberOfTouches={2}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                    {/* <StorybookUIRoot /> */}
                    <ApplicationProvider 
                        mapping={mapping}
                        theme={lightTheme}>
                        <ThemeContext.Provider value={{getLocale : recieveLocale}}>
                            <SafeAreaView style={{flex: 1,}}>

                                <AppNavigator 
                                    ref={(ref) => NavigationService.init(ref)}
                                    onNavigationStateChange={(prevState, currentState, action) => {
                                        const currentRouteName = getActiveRouteName(currentState);
                                        const previousRouteName = getActiveRouteName(prevState);
                                        switchStatusBar(currentRouteName);
                                        // if (previousRouteName !== currentRouteName) {
                                        //   // the line below uses the @react-native-firebase/analytics tracker
                                        //   // change the  tracker here to use other Mobile analytics SDK.
                                        //   analytics().setCurrentScreen(currentRouteName, currentRouteName);
                                        // }
                                      }}
                                  />
                            {/* } */}
                            </SafeAreaView>
                          </ThemeContext.Provider>
                    </ApplicationProvider>
              </PersistGate>
          </Provider>
        </DevMenu>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    // backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    // color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    // color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const enhance = compose(
  lifecycle({
      async componentDidMount(){
        AuthService.init(store)
        await NotifService.init(store)
        AuthService.setListener()
        SplashScreen.hide()
        codePush.sync({
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE
      });
      },
      componentWillUnmount(){
        NotifService.removeListeners()
        AuthService.removeListeners()
        store.dispatch(setSearchState({}))
        RNExitApp.exitApp()
      }
  }),
)

App = codePush(codePushOptions)(App)

export default enhance(App);
