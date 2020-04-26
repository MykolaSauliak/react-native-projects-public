import React from 'react';
import {
  Platform,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../constants/colors';
import {NavigationService} from '../services';
import T from 'prop-types';

const HeaderWithCart = ({
  backPressed,
  cartPressed,
  title,
  cartCount,
  cartItems,
  containerStyle,
}) => {
  if (!cartCount) {
    cartCount = cartItems.length;
  }
  // console.log('title',title)
  // console.log('count',count)
  return (
    <Header
      // statusBarProps={{ barStyle: 'light-content' }}
      // barStyle="light-content" // or directly
      leftComponent={
        <TouchableOpacity onPress={backPressed}>
          <Entypo name="chevron-left" size={25} />
        </TouchableOpacity>
      }
      centerComponent={{
        text: title,
        style: {fontSize: 16, color: 'black', fontWeight: 'bold'},
      }}
      rightComponent={
        <TouchableOpacity onPress={cartPressed}>
          {cartCount > 0 && (
            <Badge
              containerStyle={{
                position: 'absolute',
                top: -8,
                right: -10,
                zIndex: 2,
              }}
              value={cartCount}
              status="error"
              badgeStyle={{width: 25, height: 15}}
              textStyle={{fontSize: 11}}
            />
          )}
          <FontAwesome name="shopping-bag" size={20} />
        </TouchableOpacity>
      }
      containerStyle={{
        // backgroundColor: colors.gray || 'gray',
        height: 50,
        borderWidth: 0,
        ...containerStyle,
        // justifyContent: 'space-around',
      }}
    />
  );
};

HeaderWithCart.propTypes = {
  cartCount: T.number,
  cartItems: T.array,
  containerStyle: T.object,
};
HeaderWithCart.defaultProps = {
  cartCount: 0,
  cartItems: [],
  containerStyle: {},
  backPressed: () => NavigationService.goBack(),
  cartPressed: () => NavigationService.navigateToCart(),
};

export default HeaderWithCart;
