import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import T from 'prop-types';
import {ListItem} from 'react-native-elements';

const ItemsList = ({items, onItemPress}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {items.map(item => (
        <ListItem
          titleStyle={{fontSize: 14}}
          bottomDivider
          title={item.title || item}
          onPress={() => onItemPress(item)}
        />
      ))}
    </ScrollView>
  );
};

ItemsList.propTypes = {
  items: T.array.isRequired,
  onItemPress: T.func.isRequired,
};

export default ItemsList;
