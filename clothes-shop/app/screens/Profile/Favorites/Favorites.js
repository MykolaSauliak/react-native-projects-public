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
import ProductListItem from '../../../components/ProductListItem';
import globalStyles from '../../../constants/styles';
import colors from '../../../styles/colors';
import i18n from '../../../i18n';
import {NavigationService} from '../../../services';
import GridList from '../../../containers/GridList';
import Loading from '../../../components/Loading';

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
    <Header
      containerStyle={{backgroundColor: 'white'}}
      leftComponent={
        showEdit ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {showEdit === true && (
              <>
                <TouchableOpacity
                  style={{paddingHorizontal: 5}}
                  onPress={markedDelete}>
                  <Icon name="delete" color="black" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{paddingHorizontal: 5}}
                  onPress={markedToCart}>
                  <Icon name="shopping-cart" color="black" size={30} />
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : (
          {
            icon: 'arrow-back',
            color: 'black',
            onPress: () => NavigationService.navigateToProfile(),
          }
        )
      }
      centerComponent={{
        text: 'My Favorites',
        style: {color: 'black', fontSize: 20},
      }}
      // rightComponent={{ text: showEdit?  'done' : 'edit', color: 'black', onPress: () => setShowEdit(!showEdit)}}
    />
  );
  //console.log('wishlist',wishlist)
  return (
    <View style={{flex: 1}}>
      {/* <StatusBar backgroundColor={colors.gray}/> */}
      {_renderHeader()}
      <GridList loading={loading} LoadingComponent={Loading} items={items} />
    </View>
  );
};

export default Favorites;
