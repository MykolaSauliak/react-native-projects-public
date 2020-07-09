import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import Text from '../Text/Text'
import ProductCard from '../../containers/ProductCard';
import {NavigationService} from '../../services';
import Loading from '../Loading';
import { globalStyles } from '../../styles';

const styles = StyleSheet.create({
  title :{    
    marginTop: 10,
    // fontSize: 32,
    // fontWeight: 'bold',
    // fontFamily: 'SilkSerif-Regular',
    paddingLeft: 15,
  },
  emptyList: {
    ...globalStyles.text,
    padding: 15
  }
})

const GridList = ({
  items = [], 
  onPress,
  isFavorite,
  toggleFavorite,
  horizontal,
  title = '',
  titleStyle = {},
  titleProps = {},
  ItemCard,
  loading,
  listName,
  LoadingComponent,
  fetchMore,
  onEndReached,
  ...props
}) => {

  if(!LoadingComponent){
    LoadingComponent = Loading
  }
  // console.log('items',items)
  // if(loading){
  //   return <LoadingComponent />
  // }

  const renderFooter = (loading = false) => {
    if(loading){
      return <LoadingComponent />
    }
    return null
  }

  if(!ItemCard){
    ItemCard = ProductCard
  }
  // console.log('items',items.length)
  return (
    <View style={{flex:1}}>
        {title.length > 0 && <Text xxmediumSize {...titleProps} style={[styles.title, titleStyle]}>{title}</Text>}
        <FlatGrid
          spacing={5}
          // style={horizontal ? {height : '100%'} : null}
          horizontal={horizontal}
          keyExtractor={(item, i) => item.title + i}
          items={items}
          ListEmptyComponent={<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text style={styles.emptyList} xmediumSize>no items found</Text>
            </View>
          }
          itemDimension={150}
          renderItem={({item, index}) => (
            <ItemCard
              key={item?.id || index}
              {...item}
              item={item}
              onPress={onPress}
            />
          )}
          onEndReached={onEndReached}
          onEndReachedThreshold={0}
          ListFooterComponent={renderFooter(loading)}
          {...props}
        />
    </View>
    // <FlatGrid
    //   keyExtractor={(item, i) => i.toString()}
    //   itemDimension={120}
    //   items={items}
    //   renderItem={({item}) => (
    //     <ProductCard
    //       onPress={() => onPress(item)}
    //       // onFavoriteToggle={(item) => toggleFavorite()}
    //       {...item}
    //       item={item}
    //     />
    //   )}
    // />
  );
};

GridList.defaultProps = {
  items: [],
  title : '',
  horizontal: false,
  onPress : (item) => NavigationService.navigateToProduct({...item}),
  isFavorite : ({item}) => false,
  onFavoriteToggle : () => {},
};

export default GridList;
