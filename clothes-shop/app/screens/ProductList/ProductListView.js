import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import ProductListItem from '../../components/ProductListItem';
import {isInWishlist} from '../../features/wishlist/selectors';
import {isInCart} from '../../features/cart/selectors';
import BottomSheet from 'reanimated-bottom-sheet';
import colors from '../../styles/colors';
import SortBottomSheet from '../../components/SortBottomSheet';
import HorizontalFilter from '../../components/HorizontalFilter';

const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    // marginBottom:10
  },
  sortBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 3,
    height: 35,
  },
});

const ProductListView = ({
  selectedCar,
  toWishlist,
  fromWishlist,
  toCart,
  fromCart,
  wishlist,
  cartItems,
  products,
  filteredProducts,
  setFilteredProducts,
  openProductInfo,
}) => {
  const bottomSheet = React.createRef();
  let sortBy = 'TOP';
  let suitsForProducts = filteredProducts.filter(
    p =>
      !selectedCar.car_id ||
      !p.car_ids ||
      p.car_ids.includes(selectedCar.car_id),
  );
  // console.log('filteredProducts',suitsForProducts.length)
  return (
    <View style={{zIndex: 1, flex: 1}}>
      <HorizontalFilter
        // onStateChange={(sta)}
        containerStyles={{backgroundColor: colors.gray}}
        items={suitsForProducts}
        filterField="company"
        imageField="company_logo"
        onStateChange={filters => console.log(filters)}
        onFilter={filteredItems => {
          // console.log('onFilter',filteredItems)
          setFilteredProducts(filteredItems);
        }}
      />
      {/* <SortBottomSheet/> */}
      {/* <BottomSheet
              ref={bottomSheet}
              snapPoints={[200, 300]}
              renderContent = {() => {
                  <View style={{backgroundColor: colors.gray, padding: 10}}>
                      <View style={{marginTop: 25}}>
                          <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'TOP'? 'green' : 'black'}]} onPress={sortByTop}>
                              <Text>Top</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'AZ'? 'green' : colors.gray}]} onPress={sortByString}>
                              <Text>A-Z</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              }}
              renderHeader = {() => {
                <View style={{backgroundColor: colors.gray, padding: 10}}>
                    <View style={{marginTop: 25}}>
                        <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'TOP'? 'green' : 'black'}]} onPress={sortByTop}>
                            <Text>Top</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'AZ'? 'green' : colors.gray}]} onPress={sortByString}>
                            <Text>A-Z</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              }}
              initialSnap={0}
              // overdragResistanceFactor={1}
              // enabledGestureInteraction={true}
              /> */}
      <FlatList
        keyExtractor={item => item.id}
        data={suitsForProducts}
        renderItem={({item}) => (
          <ProductListItem
            toWishlist={toWishlist}
            fromWishlist={fromWishlist}
            fromCart={fromCart}
            toCart={toCart}
            inWishlist={isInWishlist({wishlist, id: item.id})}
            inCart={isInCart({cartItems, id: item.id})}
            onPress={() => openProductInfo(item)}
            {...item}
            item={item}
          />
        )}
      />
    </View>
  );
};

export default ProductListView;
