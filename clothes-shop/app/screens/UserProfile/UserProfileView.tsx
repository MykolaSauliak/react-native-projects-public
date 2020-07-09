import React from 'react';
import {
  View,

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
import FollowButton from '../../containers/FollowButton/FollowButton';
import { User } from '../../types/User.type'
import Entypo from 'react-native-vector-icons/Entypo'
import constants from '../../constants';
import {  Text} from '../../components';
import globalStyle from '../../styles'
import SellerReputationChip from '../../components/SellerStatusChip/SellerStatusChip';

const ScrollableTabView = require('react-native-scrollable-tab-view');
const initialLayout = { width: Dimensions.get('window').width };

type Props = {
  user: User
}

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

  // email,
  // name,
  // last_name,
  idcode,
  user : {
    avatar,
    uid,
    name = "",
    last_name = "",
    quick_shipping,
    last_active,
    soldCount,
    location = "",
    reputation
  },

  followers,
  following,
  addToFollowing,
  removeFromFollowing,
  isUserFollowed,

  userWishlist,
  userItemsForSale,
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
} : Props) => {
  // console.log('userFollowing',userFollowing)
  console.log('userItemsForSale',userItemsForSale.length)
  console.log('userFollowers',userFollowers)
  const FirstRoute = () => (
    // <View style={[{backgroundColor: '#673ab7'}]} />
    <GridList items={userItemsForSale} loading={loading} />
  );
  
  const SecondRoute = () => <GridList items={userWishlist} loading={loading} />;
  
  const ThirdRoute = () => <GridList items={userFavorites} loading={loading}/>;
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
    return soldCount || 0
  };

  const getAvatarSource = () => {
    return  typeof avatar == 'string' ?  {uri: avatar} : avatar?.src ? {uri: avatar?.src} : constants.defaultAvatar
  }

  const _renderForeground = () => {
    return (
      // <View style={{backgroundColor: colors.gray}}>
      <View style={{padding: 15, paddingVertical: 5}}>
        <ListItem
          leftElement={<View style={{flex:0.3}}>
              <Image
                source={getAvatarSource()} 
                style={globalStyle.avatar}
                defaultSource={constants.defaultAvatar}
                />
          </View>}
          // leftAvatar={{source: {uri: avatar ? avatar.src ? avatar.src : avatar : ''}, size:'large'}}
          title={<View>
            <Text xxmediumSize style={globalStyle.title}>{`${name} ${last_name}`}</Text>
            <SellerReputationChip containerStyle={{marginTop: 4, 
              alignItems:'flex-start'}} reputation={reputation}/>
            </View>}
          subtitle={location.length > 0 && (
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                <Entypo name="location"/>
                <Text>{location}</Text>
              </View>
            )} 
          titleStyle={{color: 'black',...globalStyle.text}}
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
          <View style={{flex: 0.3, paddingHorizontal:6}}>
            <Text mediumSize>{Object.keys(userFollowers).length}</Text>
            <Text mediumSize>Followed by</Text>
          </View>
          <View style={{flex: 0.3}}>
            <Text mediumSize>{following.length}</Text>
            <Text mediumSize>Following</Text>
          </View>
          <View style={{flex: 0.3}}>
            <FollowButton uid={uid} />
            {/* {
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
            } */}

          </View>
        </View>
        <View style={{marginVertical: 10, }}>
          {last_active && <Text xmediumSize style={{lineHeight: 25}}>Last active: {getLastActive(last_active)}</Text>}
          <Text xmediumSize style={{lineHeight: 25}}>
            {getActiveItemsForSale()} items for sale, {getItemsSold()} items sold
          </Text >
          {quick_shipping && <Text xmediumSize style={{lineHeight: 25}}>Usually ships in 1-2 days</Text>}
        </View>
      </View>
    );
  };

  // const isSignedIn = email && email.length > 0;

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
 