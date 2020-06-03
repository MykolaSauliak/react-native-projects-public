import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {TabBar} from 'react-native-tab-view';

const TabBarHorizontalScroll = ({
  scrollProps = {},
  scrollStyle = {},
  style = {},
  labelStyle = {},
  indicatorStyle = {},
  index,
  ...otherProps
}) => {
  // console.log('index',index)
  let scrollRef = React.useRef();
  let [layouts, setLayouts] = React.useState([])
  // React.useEffect(() => {
  //   console.log('layouts[index]',layouts[index])
  //   if(scrollRef?.current && index && layouts[index]){
  //     console.log('layouts[index]',layouts[index])
  //     if(index > 0){
  //       let leftOffest = layouts.slice(0, index).reduce((acc, layout) => acc + layout.width, 0) || 0
  //       console.log('leftOffest',leftOffest)
  //       scrollRef.current.scrollTo({x: leftOffest, y: 0, animated: false})
  //     }
  //     else{
  //       scrollRef.current.scrollTo({x: -200, y: 0, animated: false})
  //     }
  //   }
  // }, [index])
  // console.log('otherProps',otherProps)
  return (
    // <ScrollView 
    //   ref={scrollRef} 
    //   {...scrollProps} 
    //   style={[{maxHeight: 65},scrollStyle]} 
    //   horizontal 
    //   showsHorizontalScrollIndicator={false}
    //   snapToAlignment={'center'}
    //   >
      <TabBar
        {...otherProps}
        scrollEnable={true}
        // onContentSizeChange={(eve}
        contentContainerStyle={{flex:1, width:555}}
        indicatorStyle={[{backgroundColor: null,},indicatorStyle]}
        style={[{backgroundColor: null, color: 'black',width:'100%'}, style]}
        tabStyle={{width: 'auto'}}
        // labelStyle={[labelStyle]}
        renderLabel={({route, focused, color}) => {
          // console.log('otherProps',otherProps)
          return (<Text
            // ref={_ref => refs.push(_ref)}
            style={[{
              color: 'black',
              opacity: focused ? 1 : 0.2,
              fontSize: 22,
              margin: 8,
            }, labelStyle]}>
            {route.title}
          </Text>)
        }}
        // contentContainerStyle={{height: 65}}

      />
    // </ScrollView>
  );
};

export default TabBarHorizontalScroll;
