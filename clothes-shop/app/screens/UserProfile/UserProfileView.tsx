import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {
  ListItem, 
  CheckBox, 
  Header,
  Button,
} from 'react-native-elements';
import colors from '../../styles/colors';
// import i18n from '../../i18n';
import {NavigationService} from '../../services';
// import BottomSheet from 'reanimated-bottom-sheet'
import {
  TabView, 
  SceneMap,
} from 'react-native-tab-view';
import S from './styles';
import {BackHeader, TabBarHorizontalScroll} from '../../components'
import GridList from '../../containers/GridList'
import getLastActive from '../../utils/getLastActive';

const ScrollableTabView = require('react-native-scrollable-tab-view');
const initialLayout = { width: Dimensions.get('window').width };

const UserProfileView = ({
  // isSignedIn = false,
  loading,
  toPushNotificationsSettings,
  toSubscriptionsSettings,
  toWishlist,
  toFavorites,
  toProfileDetails,
  toAddresses,
  toOrders,
  toPrivatePolicy,

  email,
  name,
  last_name,
  idcode,
  user : {
    avatar,
    uid,
    quick_shipping,
    last_active,
    sold_count,
  },

  followers,
  following,
  addToFollowing,
  removeFromFollowing,
  isUserFollowed,

  userWishlist,
  userItemsForSale,
  soldCount,
  userFavorites,
  userFollowing,
  userFollowers,

  goToSignInForn,
  showCheckBox,
  checked,
  setChecked,
  onLogout,
  goToOrders,
  changeLocale,
  locale,
}) => {
  // console.log('userFollowing',userFollowing)
  console.log('userItemsForSale',userItemsForSale.length)
  console.log('userFollowers',userFollowers)
  const FirstRoute = () => (
    // <View style={[{backgroundColor: '#673ab7'}]} />
    <GridList items={userItemsForSale} />
  );
  
  const SecondRoute = () => <GridList items={userWishlist}/>;
  
  const ThirdRoute = () => <GridList items={userFavorites} />;
  // const FourthRoute = () => <UsersList items={userFollowing || []} />;
  // const FifthRoute = () => <UsersList items={userFavorites || []} />;
  
  let languageSheet = React.createRef();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Items for sale' },
    { key: 'second', title: 'Wishlist' },
    { key: 'third', title: 'Favorites' },
    // { key: 'fourth', title: 'Following' },
    // { key: 'fifth', title: 'Followers' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    // fourth: FourthRoute,
    // fifth: FifthRoute,
    // third: ThirdRoute,
    // fourth: FourthRoute,
  });

  const handleFollowPress = () => {
  };


  const getActiveItemsForSale = () => {
    return userItemsForSale.length
  };

  const getItemsSold = () => {
    return soldCount
  };

  const _renderForeground = () => {
    return (
      // <View style={{backgroundColor: colors.gray}}>
      <View style={{padding: 15, paddingVertical: 5}}>
        <ListItem
          leftAvatar={{source: {uri: avatar ? avatar.src ? avatar.src : avatar : ''}, size:'large'}}
          title={name}
          titleStyle={{color: 'black'}}
          containerStyle={{backgroundColor: null}}
        />
        <View
          style={{
            borderRadius: 8,
            borderColor: 'black',
            borderWidth: 0.3,
            flexDirection: 'row',
            padding: 15,
          }}>
          <View style={{flex: 0.3}}>
            <Text>{Object.keys(userFollowers).length}</Text>
            <Text>Followed by</Text>
          </View>
          <View style={{flex: 0.3}}>
            <Text>{following.length}</Text>
            <Text >Following</Text>
          </View>
          <View style={{flex: 0.3}}>
            {
              isUserFollowed({user_id: uid})
              ?  <Button
                  color={'gray'}
                  titleStyle={{fontSize:11}}
                  buttonStyle={{
                    backgroundColor: 'gray', 
                    color:'white'
                  }}
                  onPress={() => removeFromFollowing(uid)}
                  title={'FOLLOWING'}
                />
              : <Button
                  color={'gray'}
                  titleStyle={{fontSize:11, color: 'black'}}
                  buttonStyle={{backgroundColor: 'white'}}
                  onPress={() => addToFollowing(uid)}
                  title={'FOLLOW'}
                />
            }

          </View>
        </View>
        <View style={{marginVertical: 10, }}>
          {last_active && <Text style={{lineHeight: 25}}>Last active: {getLastActive(last_active)}</Text>}
          <Text style={{lineHeight: 25}}>
            {getActiveItemsForSale()} items for sale, {getItemsSold()} items sold
          </Text >
          {quick_shipping && <Text style={{lineHeight: 25}}>Usually ships in 1-2 days</Text>}
        </View>
      </View>
    );
  };

  const isSignedIn = email && email.length > 0;

  return (
    <ScrollView >
      <BackHeader goBack={() => NavigationService.goBack()} 
        title="User Profile"/>
        <View style={{flex:1, backgroundColor: 'white'}}>
          {_renderForeground()}
          {/* <ScrollableTabView
                style={{flex:1, marginTop: 20, borderBottomWidth:0}}
                tabBarTextStyle={{ fontSize: 16}}
                tabBarActiveTextColor={colors.orange}
                tabBarUnderlineStyle={{backgroundColor: null}}
                initialPage={0}
                >
                <View style={{flex:1}} tabLabel="Items for sale" >
                  <GridList loading={loading} items={userItemsForSale} />
                </View>
              <GridList tabLabel="Wishlist" loading={loading}  items={userWishlist} />
              <GridList tabLabel="Favorites" loading={loading} items={userFavorites} />
              {/* <FirstRoute tabLabel="Items for sale" />
              <SecondRoute tabLabel="Wishlist" />
              <ThirdRoute tabLabel="Favorites" /> */}
          {/* </ScrollableTabView> */}
          <TabView
            renderTabBar={(props) => (
              <TabBarHorizontalScroll {...props}/>
            )}
            navigationState={{index,   routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            />
      </View>
    </ScrollView>
  );
};

UserProfileView.defaultProps = {
  name: 'Nick',
  last_name: 'Sau',
  followers: [],
  following: [],

  userWishlist: [],
  userItemsForSale: [],
  userFavorites: [],
  userFollowing: [],
  userFollowers: [],

  isFollowed: false,
  email: 'test@test.com',
  avatar: {
    src:
      'https://gravatar.com/avatar/0a1256786a9b48d91da99654586f01c9?s=200&d=mp&r=x',
  },
  toPushNotificationsSettings: () => NavigationService.navigateToPushNotificationsSettings(),
  toSubscriptionsSettings: () => NavigationService.navigateToSubscriptionsSettings(),
  toWishlist: () => NavigationService.navigateToWishlist(),
  toFavorites: () => NavigationService.navigateToFavorites(),
  toProfileDetails: () => NavigationService.navigateToProfileInfo(),
  toAddresses: () => NavigationService.navigateToAddresses(),
  toOrders: () => NavigationService.navigateToOrders(),
  toPrivatePolicy: () => {},
};

export default UserProfileView;

const styles = StyleSheet.create({
  content: {
    height: 1000,
    marginTop: 50
  },
  foreground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  message: {
    color: 'white',
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7
  },
  headerWrapper: {
    backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12
  },
  tabsWrapper: {
    paddingVertical: 12
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18
  },
  tabTextContainerActiveStyle: {
    backgroundColor: 'lightgreen'
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white'
  }
})
 