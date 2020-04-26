import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SectionGrid} from 'react-native-super-grid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import S from './styles';
import globalStyles from '../../constants/styles';
import {getSoundAvailability} from '../../features/sounds/operations';
import SearchBarCustom from '../../components/SearchBarCustom';
import colors from '../../styles/colors';

const BACKGROUND_IMAGE = require('../../assets/background.png');
const LOCK_IAMGE = require('../../assets/background.png');
import constants from '../../constants';

const AudioListView = ({
  sounds,
  viewType,
  downloadSound,
  deleteSound,
  openAudio,
  getState,
  setViewType,
}) => {
  // //console.log('getState',getState)

  const getRating = item => {
    if (!item.comments || item.comments.length == 0 || !item) {
      return '--';
    }
    // //console.log('rating',item.comments)
    let rating = item.comments.reduce((rating, comment) => {
      return rating + Number(comment.stars);
    }, 0);

    rating = rating / (item.comments ? item.comments.length : 1);
    if (!rating) {
      return '--';
    }
    return rating.toFixed(0) + '/7';
  };

  const _renderGridItem = item => (
    // <View style={{flex:1}}>
    <ImageBackground
      source={{uri: item.artwork}}
      style={{flex: 1, width: '100%', height: '100%', minHeight: 125}}
      resizeMode="stretch">
      <View style={globalStyles.transparentBox}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => openAudio(item)}>
          <Text style={globalStyles.text}>{item.title}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          globalStyles.transparentBox,
          {position: 'absolute', bottom: 0},
        ]}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {}}>
          <AntDesign name="download" size={25} color="black" />
          <Text style={globalStyles.text}>{item.size} мб</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  const _renderListItem = item => (
    <View style={{flexDirection: 'row', padding: 5}}>
      {
        // !getSoundAvailability(item, getState())
        // ? <ImageBackground  source={LOCK_IAMGE} style={S.overAudio}/>
        // : null
      }
      <View style={{flex: 0.85}}>
        <TouchableOpacity
          onPress={() =>
            //  !getSoundAvailability(item) ? null :
            openAudio(item)
          }>
          <Text style={S.audioTitle}>{item.title}</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="star" color="black" />
          <Text style={[globalStyles.text]}>{getRating(item)}</Text>
        </View>
      </View>
      <View style={{flex: 0.15, alignItems: 'center'}}>
        {!item.downloaded ? (

                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} onPress={() => downloadSound(item)}>
            <AntDesign name="download" size={30} color="black" />
            <Text style={globalStyles.text}>{item.size} мб</Text>
          </TouchableOpacity>

                    )
          <TouchableOpacity onPress={() => deleteSound(item)}>
            >
            <AntDesign name="closecircle" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  //console.log('sounds length',sounds.length)

  return (
    <SafeAreaView style={S.container}>
      <ImageBackground
        source={BACKGROUND_IMAGE}
        style={{width: '100%', height: '100%'}}>
        <View style={{padding: 10}}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => setViewType(constants.LIST)}>
                <Entypo name="list" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setViewType(constants.TABLE)}>
                <AntDesign name="table" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <SearchBarCustom
              updateSearch={text => {}}
              inputStyle={{color: colors.SECONDARY_COLOR}}
              inputContainerStyle={{backgroundColor: colors.MAIN_COLOR}}
            />
          </View>
          {viewType == constants.TABLE ? (
            <SectionGrid
              itemDimension={130}
              sections={[
                {
                  title: 'Аудио истории',
                  data: sounds,
                },
                {
                  title: 'Сказки',
                  data: [],
                },
              ]}
              renderItem={({item}) => _renderGridItem(item)}
              renderSectionHeader={({section}) => (
                <Text style={[globalStyles.text, {fontSize: 20}]}>
                  {section.title}
                </Text>
              )}
            />
          ) : (
            <FlatList
              data={sounds}
              renderItem={({item}) => _renderListItem(item)}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AudioListView;
