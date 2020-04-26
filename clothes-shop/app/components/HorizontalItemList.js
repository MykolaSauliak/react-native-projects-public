import React from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import ProductCard from '../containers/ProductCard';
import globalStyles from '../constants/styles';

const S = StyleSheet.create({
  listBox: {
    // padding: 15,
    flex: 1,
    // marginHorizontal : 15,
    paddingVertical: 18,
  },
});

const HorizontalItemList = ({
  items,
  title = '',
  renderItem,
  containerStyle,
  onPress,
}) => {
  // console.log('items',items)
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <View style={[S.listBox, containerStyle]}>
      <Text style={globalStyles.listTitle}>{title}</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        containerStyle={{paddingLeft: 15, flex: 1}}>
        {items.map((item, i) => {
          return <ProductCard onPress={onPress} {...item} item={item} />;
        })}
      </ScrollView>
    </View>
  );
};

HorizontalItemList.defaultProps = {
  containerStyle: {},
  items: [],
  title: '',
  renderItem: item => <Text>{item.title}</Text>,
};

export default HorizontalItemList;
