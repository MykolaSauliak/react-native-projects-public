import React from 'react';
import {ScrollView, Text} from 'react-native';
import {TabBar} from 'react-native-tab-view';

const TabBarHorizontalScroll = props => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TabBar
        {...props}
        scrollEnable
        renderLabel={({route, focused, color}) => (
          <Text
            style={{
              color: 'black',
              opacity: focused ? 1 : 0.2,
              fontSize: 22,
              margin: 8,
            }}>
            {route.title}
          </Text>
        )}
        indicatorStyle={{backgroundColor: null}}
        style={{backgroundColor: null, color: 'black'}}
      />
    </ScrollView>
  );
};

export default TabBarHorizontalScroll;
