import React from 'react';
import {View, KeyboardAvoidingView, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-navigation';
// import { Tab, TabView } from 'react-native-easy-tabs';
import T from 'prop-types';
import s from './styles';
import {Text, TextTouchable, Logo} from '../../components';
// import TextTouchable from '../../components/TextTouchable';
// import Logo from '../../components/Logo/Logo';
// import { TextTouchable, Logo, Text } from '../../components';
import {SignInForm, SignUpForm} from './components';
import {isSmallDevice, isLargeDevice, isAndroid} from '../../utils';
// import i18n from '../../i18n';
// import { dimensions } from '../../styles';
import constants from '../../constants';
import {TabView, SceneMap} from 'react-native-tab-view';

const smallDevice = isSmallDevice();
const largeDevice = isLargeDevice();
const isAndroidDevice = isAndroid();

const AuthScreen = ({onChangeTabIndex, selectedTabIndex, onSkip}) => {
  const renderScene = SceneMap({
    first: () => (
      <View style={s.tabContainer}>
        <SignInForm onChangeTabIndex={onChangeTabIndex} />
      </View>
    ),
    second: () => (
      <View style={s.tabContainer}>
        <SignUpForm onChangeTabIndex={onChangeTabIndex} />
      </View>
    ),
  });

  const initialLayout = {
    flex: 1,
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width,
    height: '100%',
    alignItems: 'center',
  };
  // const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'SignIn'},
    {key: 'second', title: 'SignUp'},
  ]);

  return (
    // <KeyboardAvoidingView
    //   behavior="position"
    //   style={s.keyboardAvoidingView}
    //   contentContainerStyle={s.keyboardAvoidingViewContentContainer}
    //   // keyboardVerticalOffset={isAndroidDevice ? -10 : -20}
    // >
    // <>
    <SafeAreaView style={s.containerSafeAreaView}>
      {/* <View style={s.circle} /> */}
      {/* <View>
        <Text
          style={[
            s.heading,
            smallDevice && s.headingSmall,
            largeDevice && s.headingLarge,
          ]}
          xlargeSize={!smallDevice}
          mediumSize={smallDevice}
          white
        >
          Hello
        </Text>
      </View> */}
      {// On Android when the keyboard is showing, this component rise up.
      // To fix it we put on Android this component here and give for it position: "absolute".
      // And instead of this component, we put empty component at the bottom.
      // We put empty component at the bottom of the screen to make space for this component.

      // "Skip" button
      isAndroidDevice && (
        <View style={s.bottomButtonAndroid}>
          <TextTouchable
            alignCenter
            textStyle={[s.toUpperCase, {color: 'black'}]}
            onPress={onSkip}>
            Skip
          </TextTouchable>
        </View>
      )}
      <TabView
        renderTabBar={() => null}
        navigationState={{index: selectedTabIndex, routes}}
        // style={{justifyContent: 'center',backgroundColor :'gray'}}
        renderScene={renderScene}
        onIndexChange={onChangeTabIndex}
        initialLayout={initialLayout}
        // initialLayout={initialLayout}
        // sceneContainerStyle={s.tabContainer}
      />
      {isAndroidDevice ? (
        // Empty component for "Skip" button.
        <View style={s.bottom} />
      ) : (
        // On IOS everything stay without changes.
        <View style={s.bottom}>
          <TextTouchable alignCenter textStyle={s.toUpperCase} onPress={onSkip}>
            Skip
          </TextTouchable>
        </View>
      )}
    </SafeAreaView>
    // </>
    // </KeyboardAvoidingView>
  );
};

AuthScreen.propTypes = {
  onChangeTabIndex: T.func.isRequired,
  selectedTabIndex: T.number,
  onSkip: T.func,
};

AuthScreen.navigationOptions = () => ({
  header: null,
});

export default AuthScreen;
