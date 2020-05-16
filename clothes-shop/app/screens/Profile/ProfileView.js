import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { CheckBox, Header} from 'react-native-elements';
import colors from '../../styles/colors';
import i18n from '../../i18n';
import {NavigationService} from '../../services';
import ShippingCartIcon from '../../containers/ShippingCartIcon';
import AvatarUpload from '../../containers/AvatarUpload';
import UserInfo  from '../../components/UserInfo/UserInfo'
import { BackHeader, Text } from '../../components';
import ListItem from '../../components/ListItem/ListItem';
import NotAuthorizedUser from '../../components/NotAuthorizedUser/NotAuthorizedUser'

const S = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  idcode: {
    height: 45,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginTop: 5,
  },
  avatar: {
    // borderColor: colors.orange,
    // borderWidth: 1,
    borderRadius: 50,
    height: 95,
  },
  email: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  langBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const ProfileView = ({
  // isSignedIn = false,
  toPushNotificationsSettings,
  toSubscriptionsSettings,
  toWishlist,
  toFavorites,
  toStats,
  toProfileDetails,
  toDetails,
  toAddresses,
  toAlerts,
  toMyItems,
  toOrders,
  toMyNegotiations,
  toHolidayMode ,
  toAuth,
  toPrivatePolicy,

  email = '',
  isSignedIn,
  loggedInUser,

  showCheckBox,
  checked,
  setChecked,
  onLogout,
  goToOrders,
  changeLocale,
  locale,
}) => {
  let languageSheet = React.createRef();

  const renderSheetHeader = () => (
    <View
      style={{
        backgroundColor: colors.gray,
        borderTopColor: 'black',
        borderTopWidth: 1,
        height: 50,
      }}>
      <TouchableOpacity style={{padding: 5}} onPress={hideLanguageSheet}>
        <Text>{i18n.t('cancel')}</Text>
        <Text>{i18n.t('profile.longpress')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSheetContent = () => (
    <View
      style={{
        backgroundColor: colors.gray,
        height: 200,
        width: '100%',
        alignItems: 'center',
      }}>
      {/* <View> */}
      <TouchableOpacity
        style={{marginVertical: 5}}
        onPress={() => changeLocale('en')}>
        <Text style={S.langBtnText}>English</Text>
      </TouchableOpacity>
      {/* </View> */}

      <TouchableOpacity
        style={{marginVertical: 5}}
        onPress={() => changeLocale('ua')}>
        <Text style={S.langBtnText}>Українська</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 5}}
        onPress={() => changeLocale('sp')}>
        <Text style={S.langBtnText}>Espanol</Text>
      </TouchableOpacity>
    </View>
  );

  const openLanguageSheet = () => {
    if (languageSheet.current) {
      languageSheet.current.snapTo(1);
    }
  };
  const hideLanguageSheet = () => {
    if (languageSheet.current) {
      languageSheet.current.snapTo(0);
    }
  };

  const _renderHeader = () => (
    <BackHeader
      title="Profile"
      rightComponent={<ShippingCartIcon />}
    />
  );

  const activeColorStyle = {color: !isSignedIn ? colors.gray : 'black'};
  const activeColor = {color: colors.black};
  
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      {_renderHeader()}
      {/* <BottomSheet
        ref={languageSheet}
        snapPoints={[-50, 250]}
        renderContent={renderSheetContent}
        renderHeader={renderSheetHeader}
      /> */}
      <ScrollView>
        <View style={{paddingVertical: 15,  backgroundColor:'white'}}>
          {isSignedIn === true && (
            <View
              style={{aspectRatio: 5 / 1, width: '100%', flexDirection: 'row', alignItems : "center",}}>
              <View style={{flex: 0.2}}>
                <AvatarUpload avatarStyle={{height: 50}}/>
              </View>
              <View  style={{flex: 0.8, paddingHorizontal: 15}}>
                <UserInfo 
                  // email={loggedInUser.email} 
                  first_name={loggedInUser.name} 
                  last_name={loggedInUser.last_name} 
                  // onLogout={onLogout}
                  />
                <TouchableOpacity 
                  onPress={() => NavigationService.navigateToCustomUserProfile({
                    user_id : loggedInUser.uid
                  })}
                  >
                  <Text style={{color: colors.orange}}>VIEW MY PROFILE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {!isSignedIn && (<View style={{padding: 15}}>
            <NotAuthorizedUser /></View>)}
          <View
            style={{
              borderRadius: 18,
              marginVertical: 5,
            }}>
            <ListItem
              disabled={!isSignedIn}
              onPress={toStats}
              // titleStyle={activeColorStyle}
              title={i18n.t('profile.mystats')}
            />
            <ListItem
              gray
              bold
              // titleStyle={[activeColor, S.title]}
              paddingBottom={10}
              title={i18n.t('profile.myvestiaire')}
            />
            <ListItem
              disabled={!isSignedIn}
              onPress={toOrders}
              // titleStyle={activeColorStyle}
              title={i18n.t('profile.myorders')}
            />
            <ListItem
              disabled={!isSignedIn}
              onPress={toMyItems}
              // titleStyle={activeColorStyle}
              title={i18n.t('profile.myitems')}
            />
            <ListItem
              disabled={!isSignedIn}
              onPress={toMyNegotiations}
              // titleStyle={activeColorStyle}
              title={i18n.t('profile.priceoffersent')}
            />
            <ListItem
              disabled={!isSignedIn}
              onPress={toHolidayMode}
              // titleStyle={activeColorStyle}
              // title={i18n.t('profile.рщдшвфньщву')}
              title={"Holiday mode"}
            />
            <ListItem
              gray
              bold
              paddingBottom={10}
              title={i18n.t('profile.mysaveditems')}
            />
            <ListItem
              disabled={!isSignedIn}
              onPress={toWishlist}
              // titleStyle={activeColorStyle}
              title={i18n.t('profile.mywishlist')}
            />
            <ListItem
              disabled={!isSignedIn}
              onPress={toFavorites}
              // titleStyle={[activeColorStyle]}
              title={i18n.t('profile.myfavorites')}
            />
            <ListItem
              disabled={!isSignedIn}
              // leftIcon={{
              //   ...activeColorStyle,
              //   name: 'heart',
              //   type: 'material-community',
              // }}
              onPress={toAlerts}
              // titleStyle={activeColorStyle}
              title={i18n.t('profile.myalerts')}
              containerStyle={{paddingVertical: 25}}  
            />
            {/*  Account details */}
            <ListItem
              gray
              bold
              paddingBottom={10}
              title={i18n.t('profile.myaccount')}
              />
            <ListItem
              onPress={toDetails}
              disabled={!isSignedIn}
              title={i18n.t('profile.mydetails')}
              />
            <ListItem
              onPress={toAddresses}
              disabled={!isSignedIn}
              title={i18n.t('profile.addresses')}
              />
            {/* settings  */}
            {/* <ListItem
              containerStyle={{backgroundColor: colors.gray}}
              titleStyle={[activeColor,  S.title]}
              title={i18n.t('profile.settings')}
              bottomDivider
            />
            <ListItem
              disabled={true}
              onPress={toPushNotificationsSettings}
              titleStyle={activeColorStyle}
              containerStyle={{paddingVertical:25}}
              title={i18n.t('profile.pushnotifications')}
              bottomDivider
              chevron
            />
            <ListItem
              disabled={true}
              onPress={toSubscriptionsSettings}
              containerStyle={{paddingVertical:25}}
              title={i18n.t('profile.subscriptions')}
              titleStyle={activeColor}
              bottomDivider
              chevron
            />
            <ListItem
              disabled={true}
              onPress={toPrivatePolicy}
              containerStyle={{paddingVertical:25}}
              title={i18n.t('profile.privatepolicy')}
              titleStyle={activeColor}
              bottomDivider
              chevron
            />
            <ListItem
              disabled={true}
              onPress={openLanguageSheet}
              containerStyle={{paddingVertical:25}}
              title={i18n.t('profile.language')}
              titleStyle={activeColor}
              bottomDivider
            /> */}
            {/* <ListItem
                            leftIcon={{...activeColor,name : "person-add", type: "material"}}
                            onPress={() => {}}
                            title={i18n.t('profile.invitefriends')}
                            titleStyle={activeColor}
                            // bottomDivider
                            chevron
                            /> */}
            <ListItem
              gray
              bold
              paddingBottom={10}
              title={""}
              />
            {isSignedIn && (<ListItem
              onPress={onLogout}
              title={"Log out"}
              />)}
            <ListItem
              containerStyle={{backgroundColor: colors.gray}}
              title={
                'Vestiaire Collective has no association and/or affiliation with the brands whose product are offered for sale on its App.\nThe  authentication of said products is performed independently by Vestiaire Collective'
              }
              titleStyle={{opacity: 0.5, fontSize: 12}}
            />
          </View>
          {/* end white block */}

        </View>
      </ScrollView>
    </View>
  );
};

ProfileView.defaultProps = {
  toPushNotificationsSettings: () =>
    NavigationService.navigateToPushNotificationsSettings(),
  toSubscriptionsSettings: () =>
    NavigationService.navigateToSubscriptionsSettings(),
  toHolidayMode: () => NavigationService.navigateToHolidayMode(),
  toWishlist: () => NavigationService.navigateToWishlist(),
  toStats: () => NavigationService.navigateToStats(),
  toFavorites: () => NavigationService.navigateToFavorites(),
  toProfileDetails: () => NavigationService.navigateToProfileInfo(),
  toMyNegotiations: () => NavigationService.navigateToMyNegotiations(),
  toAddresses: () => NavigationService.navigateToAddresses(),
  toAlerts: () => NavigationService.navigateToAlerts(),
  toMyItems: () => NavigationService.navigateToMyItems(),
  toOrders: () => NavigationService.navigateToOrders(),
  toDetails: () => NavigationService.navigateToAccountDetails(),
  toPrivatePolicy: () => {},
};

export default ProfileView;
