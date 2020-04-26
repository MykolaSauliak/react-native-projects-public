import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import HorrorBackHeader from '../../../../components/HorrorBackHeader';
import FilmNotificationsSettings from '../FilmNotificationsSettings/FilmNotificationsSettingsContainer';
import ScienceNotificationsSettings from '../ScienceNotificationsSettings/ScienceNotificationsSettingsContiner';
// import GameNotificationsSettings from '../GameNotificationsSettings/GameNotificationsSettingsContainer';
import HorrorImageBackground from '../../../../components/HorrorImageBackground';
import {globalStyles} from '../../../../constants';

const FirstRoute = () => <FilmNotificationsSettings />;

const SecondRoute = () => <ScienceNotificationsSettings />;
// const ThirdRoute = () => (
//   <GameNotificationsSettings />
// );

const initialLayout = {width: Dimensions.get('window').width};

const NotificationSettings = ({}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Фильмы'},
    {key: 'second', title: 'Наука'},
    // { key: 'third', title: 'Игры' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    // third: ThirdRoute,
  });

  return (
    <HorrorImageBackground>
      <View style={{flex: 1}}>
        <HorrorBackHeader title="Настройка уведомлений" />
        <TabView
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: 'red'}}
              // contentContainerStyle={{margin:0,padding:0}}
              style={{padding: 0, margin: 0, backgroundColor: null}}
              tabStyle={{backgroundColor: null, minHeight: 20}} // here
              renderLabel={({route, color}) => (
                <Text style={{...globalStyles.text, color: 'black', margin: 8}}>
                  {route.title}
                </Text>
              )}
            />
          )}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    </HorrorImageBackground>
  );
};

export default NotificationSettings;
