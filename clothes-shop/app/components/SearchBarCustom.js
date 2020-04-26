import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import {SearchBar} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import T from 'prop-types';

const SearchBarCustom = ({
  updateSearch,
  searchText,
  inputContainerStyle,
  inputStyle,
}) => {
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
      }}>
      <SearchBar
        containerStyle={{
          flex: 0.8,
          maxHeight: 50,
          backgroundColor: null,
          borderBottomWidth: null,
          borderTopWidth: null,
        }}
        inputContainerStyle={[{backgroundColor: 'white'}, inputContainerStyle]}
        inputStyle={[{color: colors.SECONDARY_COLOR, fontSize: 14}, inputStyle]}
        //  style={{borderColor:'white', borderWidth:0}}
        placeholder="Поиск ..."
        lightTheme
        round
        showLoading={false}
        // underlineColorAndroid={false}
        onChangeText={text => updateSearch({text})}
        value={searchText}
      />
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome name="filter" size={30} />
      </TouchableOpacity>
    </View>
  );
};

SearchBarCustom.propTypes = {};

export default SearchBarCustom;
