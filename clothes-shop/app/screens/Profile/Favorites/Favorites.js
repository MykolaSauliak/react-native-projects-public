import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
// import ProductListItem from '../../../components/ProductListItem/ProductListItem';
import globalStyles from '../../../styles';
import colors from '../../../styles/colors';
import i18n from '../../../i18n';
import {NavigationService} from '../../../services';
import GridList from '../../../containers/GridList';
import Loading from '../../../components/Loading';
import { BackHeaderCenter } from '../../../components';

const S = StyleSheet.create({
  header: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width:'100%',
    marginVertical: 10,
  },
});

const Favorites = ({
  favorites,
  items,
  cartItems,
  showEdit,
  setShowEdit,
  markedItems,

  markedToWishlist,
  markedToCart,
  markedDelete,
  loading,
}) => {
  console.log('items', items);
  const _renderHeader = (cart = false) => (
    <BackHeaderCenter title="My Favorites" />
  );
  //console.log('wishlist',wishlist)
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar backgroundColor={colors.gray}/> */}
      {_renderHeader()}
      <GridList 
        loading={loading} 
        LoadingComponent={Loading} 
        items={items} 
        />
    </View>
  );
};

export default Favorites;
