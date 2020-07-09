import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import T from 'prop-types';
import {ListItem} from 'react-native-elements';
import {globalStyles} from '../styles'

const ItemsList = ({items, onItemPress}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {items.map(item => (
        <ListItem
          titleStyle={[globalStyles.text, globalStyles.leftListItem]}
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
