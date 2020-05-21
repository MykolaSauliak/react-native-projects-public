// @flow
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    connectCurrentRefinements,
} from 'react-instantsearch-native';

const S = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  btn: {
    flex: 0.5,
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  containerStyle: any,
  textStyle: any,
  btnStyle: any,
  filterCount: number,
  onPress: () => void,
};

const FilterSortButton = ({
  containerStyle,
  textStyle,
  btnStyle,
  onPress,
  items,
  createURL
}: Props) => {
  return (
    <View style={[S.container, containerStyle]}>
      <TouchableOpacity onPress={onPress} style={[S.btn, btnStyle]}>
        <Icon name="filter-variant" type="material-community" color="white" />
        <Text style={[S.text, textStyle]}>Filter & Sort</Text>
        {items.length > 0 && (
          <Text style={[S.text, textStyle]}> | ({items.length})</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};



export default connectCurrentRefinements(FilterSortButton);