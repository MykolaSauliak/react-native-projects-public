import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import {
  connectInfiniteHits,
  connectStateResults,
} from 'react-instantsearch-native';
import {FlatGrid} from 'react-native-super-grid';
import ProductCard from '../ProductCard';
import NoResult from '../../components/NoResult';
import {NavigationService} from '../../services';
import {Loading} from '../../components/Loading';
import GridList from '../GridList';
import LoadingListener from './LoadingListener';

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

const InfiniteGridHits = ({hits, hasMore, refine, ...props}) => {
  let [loading, setLoading] = React.useState(false);
  console.log('hits', hits);

  if (!hits || hits.length < 1){
    return (
      <View
        style={{
          marginTop: 25,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NoResult />
      </View>
    )
  }
  
  return (
    <>
      <LoadingListener
        onLoadingChange={(loading) => setLoading(loading)}
        />
      <GridList
        loading={loading}
        keyExtractor={item => item.objectID}
        onEndReached={() => hasMore && refine()}
        items={hits}
        {...props}
      />
    </>
  );
};

InfiniteGridHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteGridHits);
