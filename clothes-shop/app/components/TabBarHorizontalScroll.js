import React from 'react';
import {ScrollView, Text} from 'react-native';
import {TabBar} from 'react-native-tab-view';

const TabBarHorizontalScroll = ({
  scrollProps,
  style = {},
  labelStyle = {},
  indicatorStyle = {},
  ...otherProps
}) => {
  return (
    <ScrollView {...scrollProps} horizontal showsHorizontalScrollIndicator={false}>
      <TabBar
        {...otherProps}
        scrollEnable
        // labelStyle={[labelStyle]}
        renderLabel={({route, focused, color}) => (
          <Text
            style={[{
              color: 'black',
              opacity: focused ? 1 : 0.2,
              fontSize: 22,
              margin: 8,
            }, labelStyle]}>
            {route.title}
          </Text>
        )}
        indicatorStyle={[{backgroundColor: null,},indicatorStyle]}
        style={[{backgroundColor: null, color: 'black'}, style]}
      />
    </ScrollView>
  );
};

export default TabBarHorizontalScroll;
