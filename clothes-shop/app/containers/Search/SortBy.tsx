import React from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {connectSortBy} from 'react-instantsearch-native';
import constants from '../../constants';
import { withSearch } from '../../utils/enhancers';

const S = StyleSheet.create({
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
  sortContainer: {
    marginLeft: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
});


const SortBy = ({items = [],refineLocal, updateSearchState, refine}) => {

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{paddingVertical: 15}}
      showsHorizontalScrollIndicator={false}>
      {items &&
        items.map(item => (
          <Button
            buttonStyle={{
              backgroundColor: item.isRefined ? 'black' : 'white',
            }}
            containerStyle={S.sortContainer}
            titleStyle={{
              color: item.isRefined ? 'white' : 'black',
            }}
            title={item.label}
            onPress={() => refine(item.value)}
          />
        ))}
    </ScrollView>
    // <FlatList
    //   data={hits}
    //   keyExtractor={item => item.objectID}
    //   ItemSeparatorComponent={() => <View style={styles.separator} />}
    //   onEndReached={() => hasMore && refine()}
    //   renderItem={({item}) => {
    //     console.log('InfiniteHits item ', item);
    //     return (
    //       <View style={styles.item}>
    //         {/* <Text>{item.id}</Text> */}
    //         <Highlight attribute="displayName" hit={item} />
    //       </View>
    //     );
    //   }}
    // />
  );
};

SortBy.propTypes = {
  refine: PropTypes.func.isRequired,
};

export default withSearch(constants.clothes)(connectSortBy(SortBy));
