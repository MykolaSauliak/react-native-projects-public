import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../../constants/colors';
import screens from '../../constants/screens';
import {ListItem} from 'react-native-elements';
import i18n from '../../i18n';

const S = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    padding: 15,
    flex: 1,
  },
  number: {
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.orange,
    borderRadius: 5,
    color: 'white',
  },
  innerBox: {
    marginTop: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 15,
    height: 45,
  },
});

const AddCarView = ({
  selectedCarMake,
  selectedModel,
  selectedType,
  selectedCarId,
  navigation,
  addCar,
  cars,
  loading,
}) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  // console.log('cars',cars.length)
  const goToCarMakeChooseScreen = () => {
    // const carmakes = cars.map(c => c.carmake).filter(onlyUnique)
    navigation.navigate(screens.SelectCarMake, {cars: JSON.stringify(cars)});
  };
  const goToModelChooseScreen = () => {
    navigation.navigate(screens.SelectModel, {cars: JSON.stringify(cars)});
  };
  const goToTypeChooseScreen = () => {
    navigation.navigate(screens.SelectType, {cars: JSON.stringify(cars)});
  };

  const active = type => {
    if (type != null) {
      return true;
    }
  };

  return (
    <View style={S.container}>
      <Text style={S.text}>{i18n.t('addcar.addcarbymodel')}</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={S.innerBox}>
            {active(selectedCarMake) ? (
              <ListItem
                chevron
                onPress={goToCarMakeChooseScreen}
                leftElement={
                  <Text style={[S.number, {backgroundColor: colors.orange}]}>
                    1
                  </Text>
                }
                title={selectedCarMake.title}
                titleStyle={{color: colors.orange, fontWeight: 'bold'}}
                bottomDivider
              />
            ) : (
              <ListItem
                chevron
                onPress={goToCarMakeChooseScreen}
                leftElement={
                  <Text style={[S.number, {backgroundColor: colors.orange}]}>
                    1
                  </Text>
                }
                title="Select car make"
                titleStyle={{color: colors.orange, fontWeight: 'bold'}}
                bottomDivider
              />
            )}

            {/* for model */}
            {active(selectedModel) ? (
              <ListItem
                chevron
                onPress={goToModelChooseScreen}
                leftElement={
                  <Text style={[S.number, {backgroundColor: colors.orange}]}>
                    2
                  </Text>
                }
                title={selectedModel.title}
                titleStyle={{color: colors.orange, fontWeight: 'bold'}}
                bottomDivider
              />
            ) : (
              <ListItem
                chevron
                onPress={goToModelChooseScreen}
                leftElement={
                  <Text style={[S.number, {backgroundColor: colors.gray}]}>
                    2
                  </Text>
                }
                title="Select model"
                titleStyle={{color: colors.gray, fontWeight: 'bold'}}
                bottomDivider
              />
            )}

            {/* for type */}
            {active(selectedType) ? (
              <ListItem
                chevron
                onPress={goToTypeChooseScreen}
                leftElement={
                  <Text style={[S.number, {backgroundColor: colors.orange}]}>
                    3
                  </Text>
                }
                title={selectedType.title}
                titleStyle={{color: colors.orange, fontWeight: 'bold'}}
              />
            ) : (
              <ListItem
                chevron
                onPress={goToTypeChooseScreen}
                leftElement={
                  <Text style={[S.number, {backgroundColor: colors.gray}]}>
                    3
                  </Text>
                }
                title="Select type"
                titleStyle={{color: colors.gray, fontWeight: 'bold'}}
              />
            )}
          </View>
          {active(selectedCarMake) &&
          active(selectedModel) &&
          active(selectedType) ? (
            <TouchableOpacity
              onPress={() =>
                addCar({
                  selectedCarMake,
                  selectedModel,
                  selectedType,
                  selectedCarId,
                })
              }
              style={S.addBtn}>
              <Text style={{color: colors.orange, fontWeight: 'bold'}}>
                {i18n.t('addcar.addcar')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled onPress={() => {}} style={S.addBtn}>
              <Text style={{color: colors.gray, fontWeight: 'bold'}}>
                {i18n.t('addcar.addcar')}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default AddCarView;
