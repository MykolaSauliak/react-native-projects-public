import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import S from './styles';
import globalStyles from '../../constants/styles';
import colors from '../../styles/colors';
import i18n from '../../i18n';

const CategoriesView = ({categories, onClick, loading}) => {
  // //console.log('categories length',categories.length);
  // //console.log('categories length',categories);

  const _renderCategory = item => {
    // console.log('item',item)
    return (
      <TouchableOpacity onPress={() => onClick(item)} style={S.categoryBox}>
        <View style={{flex: 0.5}}>
          <Image
            resizeMode="contain"
            style={{width: 150, height: 90}}
            source={{uri: item.image.src || item.image}}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Text style={S.categoryTitle}>{item.title || item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.gray, padding: 10}}>
      <StatusBar backgroundColor={colors.orange} barStyle={colors.orange} />
      <Text style={[globalStyles.text, {fontSize: 19, fontWeight: 'bold'}]}>
        {i18n.t('categories.categoriestitle')}
      </Text>
      {loading ? (
        <ActivityIndicator color={colors.MAIN_COLOR} />
      ) : (
        <FlatList
          data={categories}
          renderItem={({item}) => _renderCategory(item)}
          keyExtractor={item => item.title || item.name}
        />
      )}
    </View>
  );
};

export default CategoriesView;
