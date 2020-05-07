import React, { Component } from 'react'
import { 
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions
 } from "react-native";
import { ListItem, Input } from "react-native-elements";
import Modal from "react-native-modal";
import { BackHeader } from '../../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../styles';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
    DataTable,
  } from 'react-native-paper';
import i18n from '../../../i18n';
import { TabBarHorizontalScroll } from "../../../components";
import style from '../../../../storybook/stories/CenterView/style';

  
  const initialLayout = { width: Dimensions.get('window').width };

const ProductDetailsModal = ({
    isModalVisible = false,
    toggleModal,
    description,
    color = "",
    material = "", 
    printed = "", 
    condition = "", 
    paddingHorizontal = 25,
}) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Description' },
      { key: 'second', title: 'Informations' },
    ]);
  
    const FirstRoute = () => (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.scene,]}>
                <View style={[styles.itemDetailsBox, {marginHorizontal:paddingHorizontal}]}>
                    <Text style={styles.desc}>{description}</Text>
                    <Text style={[styles.text, {marginVertical: 15}]}>
                        {i18n.t('product.itemdetails')}
                    </Text>
                    <DataTable>
                        <DataTable.Header>
                        <DataTable.Title>Title</DataTable.Title>
                        <DataTable.Title numeric>Value</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                        <DataTable.Cell>Color</DataTable.Cell>
                        <DataTable.Cell numeric>{color}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                        <DataTable.Cell>Material</DataTable.Cell>
                        <DataTable.Cell numeric>{material}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                        <DataTable.Cell>Printed</DataTable.Cell>
                        <DataTable.Cell numeric>{printed}</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                        <DataTable.Cell>Condition</DataTable.Cell>
                        <DataTable.Cell numeric>{condition}</DataTable.Cell>
                        </DataTable.Row>
                        {/* <DataTable.Pagination
                                        page={1}
                                        numberOfPages={3}
                                        onPageChange={(page) => { console.log(page); }}
                                        label="1-2 of 6"
                                        /> */}
                    </DataTable>
                    </View>
            </View>
        </ScrollView>
    );
    
    const SecondRoute = () => (
        <View style={[styles.scene,]}>

        </View>
    );

    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    return (
    <Modal 
        style={styles.modalContainer} 
        isVisible={isModalVisible}
        >
       <BackHeader title="More information" goBack={toggleModal}/>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <TabView
                navigationState={{ index, routes }}
                renderTabBar={(props) => (
                    <TabBarHorizontalScroll 
                        indicatorContainerStyle={{marginTop:0, paddingBottom: 0}}
                        scrollProps={{maxHeight: 75, marginBottom: 25, paddingBottom: 0, }} 
                        indicatorStyle={{height: 2, marginTop: 0,padding:0, backgroundColor: colors.orange}}
                        {...props}
                    />
                )}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                />
        </View>
    </Modal>
    );
};

export default ProductDetailsModal;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
      },
    desc: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.3,
        paddingBottom: 15,
        marginBottom: 10,
    },
    modalContainer: {flex:1, backgroundColor: 'white', margin: 0, padding: 0},
    title: {
        fontSize: 13,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    subtitle: {
        fontSize: 17,
        color: 'black'
    },
    itemDetailsBox: {
        borderRadius: 10,
        // backgroundColor: 'white',
        // padding: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
      },
})