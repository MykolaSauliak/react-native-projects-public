import React from 'react';
import {ScrollView, View, FlatList} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Text} from '../components'

const TabBarHorizontalScroll = ({
  scrollProps = {},
  scrollStyle = {},
  style = {},
  labelStyle = {},
  indicatorStyle = {},
  index = 0,
  navigationState,
  jumpTo,
  ...otherProps
}) => {
  // console.log('index',index)
  let flatListRef = React.useRef();
  // let [layouts, setLayouts] = React.useState([])

  React.useEffect(() => {
    // console.log('layouts[index]',layouts[index])
    if(flatListRef?.current ){
      // console.log('layouts[index]',layouts[index])
      // if(index > 0){
        flatListRef.current.scrollToIndex({index})

        // let leftOffest = layouts.slice(0, index).reduce((acc, layout) => acc + layout.width, 0) || 0
        // console.log('leftOffest',leftOffest)
        // flatListRef.current.scrollTo({x: leftOffest, y: 0, animated: false})
      // }
      // else{
        // flatListRef.current.scrollTo({x: -200, y: 0, animated: false})
      // }
    }
  }, [index])
  // console.log('otherProps',otherProps)
  // console.log('navigationState',navigationState)
  // console.log('jumpTo',jumpTo)
  return (
      <FlatList 
        data={navigationState.routes}
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        style={{maxHeight: 75}}
        contentContainerStyle={{paddingLeft: 15, alignItems: 'center'}}
        renderItem={({item, index}) => {
            return (<TouchableOpacity onPress={() => {
                jumpTo(item.key)
                if(flatListRef?.current){
                  flatListRef.current.scrollToIndex({index})
                }
              }}>
              <Text
              // ref={_ref => refs.push(_ref)}
              style={[{
                color: 'black',
                opacity: navigationState?.index == index ? 1 : 0.2,
                fontSize: 23,
                margin: 8,
              }, labelStyle]}>
              {item.title}
            </Text>
          </TouchableOpacity>
          )
        }}
        />
    // <ScrollView 
    //   ref={scrollRef} 
    //   {...scrollProps} 
    //   style={[{maxHeight: 65},scrollStyle]} 
    //   horizontal 
    //   showsHorizontalScrollIndicator={false}
    //   snapToAlignment={'center'}
    //   >
      // <TabBar
      //   {...otherProps}
      //   scrollEnable={true}
      //   // onContentSizeChange={(eve}
      //   contentContainerStyle={{flex:1, width:555}}
      //   indicatorStyle={[{backgroundColor: null,},indicatorStyle]}
      //   style={[{backgroundColor: null, color: 'black',width:'100%'}, style]}
      //   tabStyle={{width: 'auto'}}
      //   // labelStyle={[labelStyle]}
      //   renderLabel={({route, focused, color}) => {
      //     // console.log('otherProps',otherProps)
      //     return (<Text
      //       // ref={_ref => refs.push(_ref)}
      //       style={[{
      //         color: 'black',
      //         opacity: focused ? 1 : 0.2,
      //         fontSize: 22,
      //         margin: 8,
      //       }, labelStyle]}>
      //       {route.title}
      //     </Text>)
      //   }}
        // contentContainerStyle={{height: 65}}

      // />
    // </ScrollView>
  );
};

export default TabBarHorizontalScroll;
