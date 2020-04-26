import React, {useRef, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Loading} from '../../components';
import {GridList} from '../../containers';
import {NavigationService} from '../../services';
import BackHeader from '../../components/BackHeader';
import ClothesSearchHeader from '../../containers/ClothesSearchHeader';
import FilterSortButton from '../../containers/FilterSortButton';
import S from './styles';

const SearchResult = ({
  items,
  title,
  loading,

  toggleFavorite,
  isFavorite,
}) => {
  const getTotalCount = () => {
    if (items.length > 100) {
      return '100+ items';
    } else {
      return `${items.length} items`;
    }
  };

  return (
    <View style={[{flex: 1}]}>
      <ClothesSearchHeader placeholder={title} showBack />
      {/* <BackHeader title={title}/> */}
      {loading ? (
        <Loading />
      ) : (
        <View style={{flex: 1}}>
          {/* <Text style={S.listTitle}>{getTotalCount()}</Text> */}
          <GridList title={getTotalCount()} items={items} />
          <FilterSortButton
            onPress={() => NavigationService.navigateToFilterSortScreen()}
          />
          {/* <FlatGrid
            keyExtractor={(item, i) => item.title + i}
            itemDimension={130}
            items={items}
            renderItem={({item}) => (
              <ProductCard
                onPress={() => NavigationService.navigateToProduct({...item})}
                {...item}
                favorite={isFavorite({id: item.id})}
                onFavoriteToggle={() => toggleFavorite({id: item.id})}
              />
            )}
          /> */}
        </View>
      )}
    </View>
  );
};

SearchResult.navigationOptions = {
  header: null,
};

SearchResult.defaultProps = {
  title: 'Search results',
  items: [],
};

export default SearchResult;
