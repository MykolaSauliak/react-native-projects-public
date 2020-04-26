import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connectInfiniteHits} from 'react-instantsearch-native';
import Highlight from './Highlight';

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 10,
    flexDirection: 'column',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

const InfiniteHits = ({hits, hasMore, refine}) => {
  // console.log('hits',hits)
  return (
    <FlatList
      data={hits}
      keyExtractor={item => item.objectID}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => hasMore && refine()}
      renderItem={({item}) => {
        console.log('InfiniteHits item ', item);
        return (
          <View style={styles.item}>
            {/* <Text>{item.id}</Text> */}
            <Highlight attribute="displayName" hit={item} />
          </View>
        );
      }}
    />
  );
};

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteHits);
