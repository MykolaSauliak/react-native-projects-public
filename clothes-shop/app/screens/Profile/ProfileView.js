import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {ListItem, CheckBox, Header} from 'react-native-elements';
import colors from '../../styles/colors';
import i18n from '../../i18n';
import {NavigationService} from '../../services';
import ShippingCartIcon from '../../containers/ShippingCartIcon';
import AvatarUpload from '../../containers/AvatarUpload';
import UserInfo  from '../../components/UserInfo/UserInfo'
import { BackHeader } from '../../components';

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
  toProfileDetails,
  toDetails,
  toAddresses,
  toAlerts,
  toMyItems,
  toOrders,
  toMyNegotiations,
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
        <View style={{padding: 15, paddingVertical: 25}}>
          {isSignedIn === true && (
            <View
              style={{aspectRatio: 3 / 1, width: '100%', flexDirection: 'row', alignItems : "center"}}>
              <View style={{flex: 0.3}}>
                <AvatarUpload />
              </View>
              <View  style={{flex: 0.7}}>
                <UserInfo 
                  email={loggedInUser.email} 
                  first_name={loggedInUser.name} 
                  last_name={loggedInUser.last_name} 
                  onLogout={onLogout}
                  />
              </View>
            </View>
          )}
          {!isSignedIn && (<NotAuthorizedUser />)}
          <View
            style={{
              borderRadius: 18,
              marginVertical: 25,
            }}>
            <ListItem
              containerStyle={{backgroundColor: colors.gray}}
              // leftIcon={{...activeColorStyle, name : "truck-delivery", type: "material-community"}}
              titleStyle={[activeColor, S.title]}
              title={i18n.t('profile.myvestiaire')}
              bottomDivider
            />
            <ListItem
              disabled={!isSignedIn}
              // leftIcon={{
              //   ...activeColorStyle,
              //   name: 'truck-delivery',
              //   type: 'material-community',
              // }}
              onPress={toOrders}
              titleStyle={activeColorStyle}
              title={i18n.t('profile.myorders')}
              containerStyle={{paddingVertical: 25}}
              bottomDivider
              chevron
            />
            <ListItem
              disabled={!isSignedIn}
              // leftIcon={{
              //   ...activeColorStyle,
              //   name: 'truck-delivery',
              //   type: 'material-community',
              // }}
              onPress={toMyItems}
              titleStyle={activeColorStyle}
              title={i18n.t('profile.myitems')}
              containerStyle={{paddingVertical: 25}}
              bottomDivider
              chevron
            />
            <ListItem
              disabled={!isSignedIn}
              // leftIcon={{
              //   ...activeColorStyle,
              //   name: 'truck-delivery',
              //   type: 'material-community',
              // }}
              onPress={toMyNegotiations}
              titleStyle={activeColorStyle}
              title={i18n.t('profile.priceoffersent')}
              containerStyle={{paddingVertical: 25}}
              bottomDivider
              chevron
            />
            <ListItem
              containerStyle={{backgroundColor: colors.gray}}
              // leftIcon={{...activeColorStyle, name : "truck-delivery", type: "material-community"}}
              titleStyle={[activeColor, S.title]}
              title={i18n.t('profile.mysaveditems')}
              bottomDivider
            />
            <ListItem
              disabled={!isSignedIn}
              // leftIcon={{
              //   ...activeColorStyle,
              //   name: 'bookmark',
              //   type: 'material-community',
              // }}
              onPress={toWishlist}
              titleStyle={activeColorStyle}
              title={i18n.t('profile.mywishlist')}
              containerStyle={{paddingVertical: 25}}
              bottomDivider
              chevron
            />
            <ListItem
              disabled={!isSignedIn}
              // leftIcon={{
              //   ...activeColorStyle,
              //   name: 'heart',
              //   type: 'material-community',
              // }}
              onPress={toFavorites}
              titleStyle={[activeColorStyle]}
              title={i18n.t('profile.myfavorites')}
              bottomDivider
              containerStyle={{paddingVertical: 25}}
              chevron
            />
            <ListItem
              disabled={!isSignedIn}
              // leftIcon={{
              //   ...activeColorStyle,
              //   name: 'heart',
              //   type: 'material-community',
              // }}
              onPress={toAlerts}
              titleStyle={activeColorStyle}
              title={i18n.t('profile.myalerts')}
              containerStyle={{paddingVertical: 25}}
              bottomDivider
              chevron
            />
            {/*  Account details */}
            <ListItem
              containerStyle={{backgroundColor: colors.gray}}
              // leftIcon={{...activeColorStyle, name : "truck-delivery", type: "material-community"}}
              titleStyle={[activeColor, S.title]}
              title={i18n.t('profile.myaccount')}
              bottomDivider
              />
            <ListItem
              // disabled={!isSignedIn}
              // disabled={true}
              // leftIcon={{...activeColorStyle, name: 'place', type: 'material'}}
              onPress={toDetails}
              titleStyle={activeColorStyle}
              title={i18n.t('profile.mydetails')}
              containerStyle={{paddingVertical: 25}}
              bottomDivider
              chevron
              />
            <ListItem
              // disabled={!isSignedIn}
              // disabled={true}
              // leftIcon={{...activeColorStyle, name: 'place', type: 'material'}}
              onPress={toAddresses}
              titleStyle={activeColorStyle}
              title={i18n.t('profile.addresses')}
              containerStyle={{paddingVertical: 25}}
              bottomDivider
              chevron
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
              containerStyle={{backgroundColor: null}}
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
  toWishlist: () => NavigationService.navigateToWishlist(),
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
