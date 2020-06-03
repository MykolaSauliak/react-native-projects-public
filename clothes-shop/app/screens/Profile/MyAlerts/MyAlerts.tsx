import React from 'react';
import {
  View, 
  Text, 
  ImageBackground, 
  StyleSheet, 
  FlatList, 
  Dimensions ,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../../constants/styles';
import colors from '../../../styles/colors';
// import i18n from '../../../18n';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import PriceReductionAlert from "./components/PriceReductionAlert/PriceReductionAlertContainer";
import FollowingAlert from "./components/FollowingAlert/FollowingAlertContainer";
import ItemLookingFor from "./components/ItemLookingFor/ItemLookingForContainer";
import { BackHeader, TabBarHorizontalScroll, BackHeaderCenter } from '../../../components';
import {  ScrollView } from 'react-native-gesture-handler'

const FirstRoute = () => (
  <PriceReductionAlert />
);

const SecondRoute = () => (
  <FollowingAlert />
);

const ThirdRoute = () => (
  <ItemLookingFor />
);

const initialLayout = { width: Dimensions.get('window').width };

interface Props {
  id : string,
  first_name : string,
  email : string,
  last_name : string,
  postal_code : string,
  orderStatus : string,
  payment_status : string,
  createdAt : string,
  create_time : number,
}


const MyAlerts = ({

}) => {
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Price reduction' },
    { key: 'second', title: 'Following' },
    { key: 'third', title: "Items I'm looking for" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <>
      <BackHeaderCenter title="Alerts" />
      {/* <View style={{flex:1}}> */}
      <TabView
      renderTabBar={(props) => (
        <TabBarHorizontalScroll index={index} {...props}/>
        // <ScrollView 
        //   // style={{height: 75, width: '100%'}} 
        //   horizontal 
        //   showsHorizontalScrollIndicator={false}>
        //   <View style={{height: 50}}>
            // <TabBar
            //   {...props}
            //   scrollEnable
            //   tabStyle={{height: 75}}
            //   renderLabel={({ route, focused, color, ...otherProps }) => {
            //     // console.log('otherProps',otherProps)
            //     // return <TouchableOpacity onPress={() => {}}>
            //       return <Text style={{textAlign:'center', color : 'black',opacity :focused ? 1 : 0.2,fontSize: 22, margin: 8 }}>
            //         {route.title}
            //       </Text>
            //     // </TouchableOpacity>
            //   }}
              
          //   indicatorStyle={{ backgroundColor: null }}
          //   style={{backgroundColor: null, color :'black'}}
          // />
        //   </View>
        //  </ScrollView>
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    /> 
    {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default MyAlerts;
