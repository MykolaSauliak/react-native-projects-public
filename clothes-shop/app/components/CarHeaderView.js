import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
} from 'react-native';
import colors from '../styles/colors';
import {SearchBar, ListItem} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import T from 'prop-types';
import Collapsible from 'react-native-collapsible';
import {max} from 'ramda';
import i18n from '../i18n';

const S = StyleSheet.create({
  container: {
    // flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.orange,
    borderWidth: 0,
    paddingBottom: 10,
    // justifyContent:'space-around',
    // marginBottom:10
  },
  btn: {
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    borderRadius: 18,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.orange,
  },
});

const CarHeader = ({
  updateSearch,
  searchText,
  inputContainerStyle,
  inputStyle,
  cars = [],
  selectedCar,
  onPress,
  extended = false,
  setExtended,

  selectCar,
  setMaxHeight,
  maxHeight,
  setMinHeight,
  minHeight,
  isCollapsed,
  setIsCollapsed,
}) => {
  //console.log('selectedCar',selectedCar);

  const isCarActive = car => {
    if (
      selectedCar != null &&
      selectedCar.carmake &&
      car.carmake &&
      car.carmake.title == selectedCar.carmake.title &&
      car.model.title == selectedCar.model.title &&
      car.type.title == selectedCar.type.title
    ) {
      return true;
    }
    return false;
  };

  const elementClick = () => {
    if (!isCollapsed) {
      setIsCollapsed(true);
    }
  };

  return (
    <TouchableHighlight onPress={() => setIsCollapsed(!isCollapsed)}>
      <Collapsible
        duration={100}
        style={S.container}
        collapsedHeight={70}
        easing="linear"
        collapsed={isCollapsed}>
        <View
          style={{width: '100%', paddingHorizontal: 10}}
          onLayout={event => setMaxHeight(event.nativeEvent.layout.height)}>
          {selectedCar != null && selectedCar.carmake && (
            <ListItem
              // onLayout={(event) => setMinHeight(event.nativeEvent.layout.height)}
              containerStyle={[
                S.btn,
                {
                  width: '95%',
                  backgroundColor: colors.orange,
                  borderBottomColor: colors.gray,
                  borderBottomWidth: 1,
                },
              ]}
              leftAvatar={{
                rounded: true,
                source: {uri: selectedCar.carmake.image},
              }}
              title={selectedCar.model.title}
              titleProps={{numberOfLines: 1}}
              subtitleProps={{numberOfLines: 1}}
              titleStyle={{color: 'white', fontWeight: 'bold'}}
              subtitleStyle={{color: 'white'}}
              subtitle={selectedCar.type.title}
            />
          )}
          {cars
            .filter(c => !isCarActive(c))
            .map((c, i) => {
              //console.log('car -',c)
              return (
                <ListItem
                  key={i}
                  // onLayout={(event) => setMinHeight(event.nativeEvent.layout.height)}
                  onPress={() => selectCar(c)}
                  containerStyle={[S.btn, {backgroundColor: colors.orange}]}
                  leftAvatar={{rounded: true, source: {uri: c.carmake.image}}}
                  title={c.model.title}
                  titleProps={{numberOfLines: 1}}
                  subtitleProps={{numberOfLines: 1}}
                  titleStyle={{color: 'white', fontWeight: 'bold'}}
                  subtitleStyle={{color: 'white'}}
                  subtitle={c.type.title}
                />
              );
            })}
        </View>

        <TouchableOpacity onPress={onPress} style={S.btn}>
          <Text style={S.text}>{i18n.t('addcar.addcar')}</Text>
        </TouchableOpacity>
      </Collapsible>
    </TouchableHighlight>
  );
};

CarHeader.propTypes = {};

export default CarHeader;
