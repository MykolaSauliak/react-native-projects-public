import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import ProductCard from '../../containers/ProductCard';
import {NavigationService} from '../../services';

const styles = StyleSheet.create({
  title :{    
    marginTop: 10,
    fontSize: 32,
    // fontWeight: 'bold',
    fontFamily: 'OPTICenturyNova',
    paddingLeft: 15,
  }
})

const GridList = ({
  items, 
  onPress,
  isFavorite,
  toggleFavorite,
  horizontal,
  title = '',
  ItemCard,
  loading,
  LoadingComponent,
  ...props
}) => {

  if(!LoadingComponent){
    LoadingComponent = ActivityIndicator
  }
  // console.log('items',items)
  if(loading){
    return <LoadingComponent />
  }

  if(!ItemCard){
    ItemCard = ProductCard
  }
  
  return (
    <View style={{flex:1}}>
        {title.length > 0 && <Text style={styles.title}>{title}</Text>}
        <FlatGrid
          // style={horizontal ? {height : '100%'} : null}
          horizontal={horizontal}
          keyExtractor={(item, i) => item.title + i}
          items={items}
          ListEmptyComponent={<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text>no items found</Text>
            </View>
          }
          itemDimension={150}
          renderItem={({item}) => (
            <ItemCard
              {...item}
              item={item}
              onPress={onPress}
            />
          )}
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
