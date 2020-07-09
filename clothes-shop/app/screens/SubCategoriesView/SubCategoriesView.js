import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import S from './styles';
import globalStyles from '../../styles';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../styles/colors';
import {ListItem} from '../../components';
import {  Text} from '../../components';

const SubCategoriesView = ({
  subcategories,
  onPress,
  isModalVisible,
  setModalVisible,
  loading,
}) => {
  // //console.log('categories length',subcategories.length);
  // console.log('subcategories length',subcategories.length);

  return (
    <View style={{flex: 1, backgroundColor: colors.gray, padding: 10}}>
      {loading ? (
        <ActivityIndicator color={colors.MAIN_COLOR} />
      ) : (
        subcategories.map((sc, i) => (
          <ListItem
            key={i}
            onPress={() => onPress(sc)}
            leftAvatar={{source: {uri: sc.image.src || sc.image}}}
            title={sc.title || sc.name}
            rightIcon={
              <Entypo name="chevron-right" size={25} color={colors.gray} />
            }
            //   subtitle={l.subtitle}
            bottomDivider
          />
        ))
      )}
    </View>
  );
};

export default SubCategoriesView;
