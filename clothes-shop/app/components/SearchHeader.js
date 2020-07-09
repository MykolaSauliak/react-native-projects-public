import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import colors from '../styles/colors';
import globalStyles from '../styles';
import {Text} from '../components';
import Modal from 'react-native-modal';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import constants from '../constants';
import i18n from '../i18n';

let fall = new Animated.Value(1);
let filterSheetActive = false;

const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    // marginBottom:10
  },
  sortBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // borderRadius: 8,
    marginVertical: 3,
    height: 35,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    padding: 20,
    // backgroundColor: '#2c2c2fAA',
    backgroundColor: colors.gray,
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    width: '100%',
    height: 50,
    padding: 15,
    backgroundColor: colors.gray,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // flexDirection:'row's,
    // justifyContent:'space-around',
    // alignItems:'center',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  },
});

const SearchHeader = ({
  showFilter,
  showSort,
  showBack,
  filterClick,
  onFilter,

  onBack,
  search,
  updateSearch,
  placeholder,
  sortByTop,
  sortByString,
  onSort,
  onSearchClick,
  sortBy = 'TOP',
}) => {
  let bottomSheet = React.createRef();
  let filterSheet = React.createRef();

  const renderInner = () => (
    <View style={S.panel}>
      {/* <View style={{marginTop: 25}}> */}
      <TouchableOpacity
        style={[
          S.sortBtn,
          {borderWidth: 1, borderColor: sortBy == 'TOP' ? 'green' : 'black'},
        ]}
        onPress={sortByTop}>
        <Text>Top</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'AZ'? 'green' : colors.gray}]} onPress={sortByString}>
              <Text>A-Z</Text> */}
      {/* </TouchableOpacity> */}
      {/* <View style={S.panelButton}>
          <Text style={S.panelButtonTitle}>Copy</Text>
        </View>
        <View style={S.panelButton}>
          <Text style={S.panelButtonTitle}>Paste</Text>
        </View>
        <View style={S.panelButton}>
          <Text style={S.panelButtonTitle}>Crop</Text>
        </View>
        <View style={S.panelButton}>
          <Text style={S.panelButtonTitle}>Search</Text>
        </View>
        <View style={S.panelButton}>
          <Text style={S.panelButtonTitle}>Send</Text>
        </View> */}
    </View>
  );

  const renderHeader = () => (
    <View style={S.header}>
      <Text
        style={[globalStyles.text, {position: 'absolute', left: 15, top: 15}]}>
        {i18n.t('sort')}
      </Text>
      <TouchableOpacity
        style={{position: 'absolute', right: 15, top: 15}}
        onPress={hideFilterSheet}>
        <Text style={globalStyles.text}>{i18n.t('cancel')}</Text>
      </TouchableOpacity>
    </View>
  );

  const toggleSortModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const openBottomSheet = item => {
    if (bottomSheet.current) {
      bottomSheet.current.snapTo(1);
    }
  };

  const hideBottomSheet = () => {
    if (bottomSheet.current) {
      bottomSheet.current.snapTo(0);
    }
  };

  const toggleFilterSheet = () => {
    if (!filterSheetActive) {
      openFilterSheet();
    } else {
      hideFilterSheet();
    }
  };

  const openFilterSheet = () => {
    setTimeout(() => {
      if (filterSheet.current) {
        filterSheet.current.snapTo(0);
      }
    }, 150);
    filterSheetActive = true;
  };

  const hideFilterSheet = () => {
    setTimeout(() => {
      if (filterSheet.current) {
        filterSheet.current.snapTo(1);
      }
    }, 150);
    filterSheetActive = false;
  };

  return (
    <>
      <View style={{zIndex: 1, backgroundColor: colors.orange}}>
        {/* {
              showSort == true && (
              <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, backgroundColor: colors.gray, padding: 10}}>
                  <View style={{flexDirection:'row', paddingBottom: 10, backgroundColor:colors.gray, width: '100%', borderBottomColor:'gray', borderBottomWidth:1}}>
                    <Text style={globalStyles.text}>Sort</Text>
                    <TouchableOpacity onPress={toggleSortModal} style={{position:'absolute', right: 0}}>
                      <Text style={globalStyles.text}>Cancel</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: 25}}>
                      <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'TOP'? 'green' : 'black'}]} onPress={sortByTop}>
                          <Text>Top</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'AZ'? 'green' : colors.gray}]} onPress={sortByString}>
                          <Text>A-Z</Text>
                      </TouchableOpacity>
                  </View>

                </View>
              </Modal>)
            } */}
        {
          // showFilter == true && (// )
          // <Modal isVisible={isFilterModalVisible}>
          //
          // </Modal>)
        }

        <View style={S.container}>
          {showBack === true && (
            <TouchableOpacity onPress={() => onBack()}>
              <FontAwesome name="arrow-left" size={20} />
            </TouchableOpacity>
          )}
          {onSearchClick ? (
            <TouchableOpacity
              style={{flex: 0.9, maxHeight: 50, backgroundColor: colors.gray}}
              onPress={() => onSearchClick()}>
              <SearchBar
                disabled
                containerStyle={{
                  backgroundColor: colors.gray,
                  borderBottomWidth: null,
                  borderTopWidth: null,
                }}
                inputContainerStyle={{backgroundColor: 'white'}}
                inputStyle={{color: colors.SECONDARY_COLOR, fontSize: 14}}
                placeholder={placeholder || i18n.t('searchpbypartnumber')}
                lightTheme
                round
              />
            </TouchableOpacity>
          ) : (
            <SearchBar
              containerStyle={{
                flex: 0.9,
                maxHeight: 50,
                backgroundColor: null,
                borderBottomWidth: null,
                borderTopWidth: null,
              }}
              inputContainerStyle={{backgroundColor: 'white'}}
              inputStyle={{color: colors.SECONDARY_COLOR, fontSize: 14}}
              //  style={{borderColor:'white', borderWidth:0}}
              placeholder={placeholder || i18n.t('searchpbypartnumber')}
              // placeholder={placeholder || 'Search by item, by part number, by OEM'}
              lightTheme
              round
              showLoading={false}
              // underlineColorAndroid={false}
              onChangeText={text => {
                updateSearch(text);
              }}
              value={search}
            />
          )}

          {showFilter === true && (
            <TouchableOpacity onPress={toggleFilterSheet}>
              <FontAwesome name="filter" size={25} />
            </TouchableOpacity>
          )}
          {showSort === true && (
            <TouchableOpacity onPress={toggleSortModal}>
              <FontAwesome name="sort" size={25} />
            </TouchableOpacity>
          )}
        </View>

        {showFilter == true && (
          <>
            <BottomSheet
              ref={filterSheet}
              snapPoints={[constants.DEVICE_HEIGHT * 0.6, -150]}
              renderContent={renderInner}
              renderHeader={renderHeader}
              initialSnap={1}
              callbackNode={fall}
              enabledInnerScrolling={false}
            />
            <Animated.View
              style={{
                alignItems: 'center',
                opacity: Animated.add(0.1, Animated.multiply(fall, 0.9)),
              }}
            />
          </>
        )}
      </View>
    </>
  );
};

export default SearchHeader;
