import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import colors from '../styles/colors';
import Animated from 'react-native-reanimated';

const HEIGHT = 75;

const styles = StyleSheet.create({
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
    borderRadius: 8,
    marginVertical: 3,
    height: 35,
  },
  filterBtn: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 10,
  },
  filterBtnText: {
    color: 'white',
    fontSize: 20,
  },
  // box: {
  //     width: IMAGE_SIZE,
  //     height: IMAGE_SIZE,
  //   },
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
    borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    width: '100%',
    height: 50,
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

export default class SortBottomSheet extends React.Component {
  state = {
    sortBy: '',
  };

  openBottomSheet = () => {};

  // renderInner = () => (
  //     <View style={styles.panel}>
  //       <View style={styles.panelButton}>
  //         <Text style={styles.panelButtonTitle}>Copy</Text>
  //       </View>
  //       <View style={styles.panelButton}>
  //         <Text style={styles.panelButtonTitle}>Paste</Text>
  //       </View>
  //       <View style={styles.panelButton}>
  //         <Text style={styles.panelButtonTitle}>Crop</Text>
  //       </View>
  //       <View style={styles.panelButton}>
  //         <Text style={styles.panelButtonTitle}>Search</Text>
  //       </View>
  //       <View style={styles.panelButton}>
  //         <Text style={styles.panelButtonTitle}>Send</Text>
  //       </View>
  //     </View>
  //   )

  renderHeader = () => <View style={styles.header} />;

  fall = new Animated.Value(1);

  render() {
    // let sortBy = useState(null)
    // let bottomSheet = React.createRef();
    return (
      <>
        <View
          style={{
            zIndex: 11,
            position: 'absolute',
            bottom: 10,
            width: '100%',
            height: HEIGHT,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={this.openBottomSheet}>
            <Text style={styles.filterBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>
        {/* <BottomSheet
          snapPoints={[500, 150]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledInnerScrolling={false}
        /> */}
        <Animated.View
          style={{
            alignItems: 'center',
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 0.9)),
          }}>
          <Text style={{position: 'absolute', zIndex: 1}}>
            Swipe up from very bottom
          </Text>
          {/* <Image style={styles.map} source={require('./assets/map-bg.jpg')} /> */}
        </Animated.View>
        {/* <BottomSheet
            ref={bottomSheet}
            snapPoints={[-50, 500]}
            renderContent = {() => {
                <View style={{backgroundColor: colors.gray, padding: 10}}>
                    <View style={{marginTop: 25}}>
                        <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'TOP'? 'green' : 'black'}]} onPress={sortByTop}>
                            <Text>Top</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'AZ'? 'green' : colors.gray}]} onPress={sortByString}>
                            <Text>A-Z</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }}
            renderHeader = {() => {
                <View style={{backgroundColor: colors.gray, padding: 10}}>
                    <View style={{marginTop: 25}}>
                        <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'TOP'? 'green' : 'black'}]} onPress={sortByTop}>
                            <Text>Top</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[S.sortBtn, {borderWidth:1, borderColor : sortBy == 'AZ'? 'green' : colors.gray}]} onPress={sortByString}>
                            <Text>A-Z</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }}
            initialSnap={0}
            // overdragResistanceFactor={1}
            // enabledGestureInteraction={true}
            /> */}
      </>
    );
  }
}

// export default SortBottomSheet;
