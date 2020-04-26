import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ListItem, CheckBox} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import constants from '../constants';
import T from 'prop-types';

const S = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    paddingRight: 0,
    // borderTopWidth: 1,
    borderColor: 'gray',
    borderTopWidth: 0.5,
    borderColor: 'gray',
  },
  title: {
    fontSize: 15,
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 5,
  },
  contentContainer: {
    width: '100%',
    margin: 0,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  listItemContainer: {
    width: '100%',
    margin: 0,
    padding: 0,
    paddingLeft: 10,
  },
  collapseBox: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  collapseSubtitle: {
    color: 'gray',
    fontSize: 12,
    paddingLeft: 5,
  },
  collapseTitle: {
    color: 'gray',
    fontSize: 13,
  },
});

const ListItemWithDropDown = ({
  listItemProps,
  title,
  subtitle,
  onPress = () => {},
  collapseSubtitle,
  collapseTitle,
}) => {
  const toggleCollapse = () => {
    setShow(!showCollapseSubtitle);
  };

  let [showCollapseSubtitle, setShow] = useState(false);

  return (
    <View style={[S.container]}>
      <ListItem
        title={title}
        onPress={onPress}
        subtitle={subtitle}
        titleStyle={[S.title]}
        subtitleStyle={[S.subtitle]}
        contentContainerStyle={[S.contentContainer]}
        containerStyle={[S.listItemContainer]}
        {...listItemProps}
      />
      <TouchableOpacity style={[S.collapseBox]} onPress={toggleCollapse}>
        <View style={{flex: 0.9}}>
          <Text style={[S.collapseTitle]}>{collapseTitle}</Text>
          {showCollapseSubtitle && (
            <Text style={[S.collapseSubtitle]}>{collapseSubtitle}</Text>
          )}
        </View>
        <AntDesign
          style={{position: 'absolute', top: 5, right: 15}}
          name={showCollapseSubtitle ? 'caretup' : 'caretdown'}
          size={15}
        />
      </TouchableOpacity>
    </View>
  );
};

ListItemWithDropDown.propTypes = {
  title: T.string,
  subtitle: T.string,
  onPress: T.func,
  listItemProps: T.object,
  collapseSubtitle: T.string,
  collapseTitle: T.string,
};

export default ListItemWithDropDown;
