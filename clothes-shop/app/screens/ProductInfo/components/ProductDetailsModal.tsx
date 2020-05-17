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
import _ from 'lodash';
import ListItemWithDropDown from '../../../components/ListItemWithDropDown';
import CollapsibleListItem from '../../../components/CollapsibleListItem/CollapsibleListItem';

  
const initialLayout = { width: Dimensions.get('window').width };

const ProductDetailsModal = ({
    isModalVisible = false,
    toggleModal,
    description = "",
    brand_name = "",
    status_updated_at = {},
    category_name = "",
    color = "",
    material = "", 
    printed = "", 
    condition = "", 
    shipping_country = "", 
    measurements,
    sold_with = {},
    paddingHorizontal = 25,
    informationItemVisible,
}) => {
    // console.log(informationItemVisible)
    let HEIGHT = 65;

    const [index, setIndex] = React.useState(informationItemVisible !== null ? 1:0); // if not null go to information page
    const [routes] = React.useState([
      { key: 'first', title: 'Description' },
      { key: 'second', title: 'Informations' },
    ]);

    React.useEffect(() => {
        if(informationItemVisible !== null){
            setTimeout(() => {setIndex(1)},150)
        }
    }, [informationItemVisible])

    let scrollRef = React.useRef()
    React.useEffect(() => {
        if(scrollRef?.current){
            scrollRef.current.scrollTo({x: 0, y : informationItemVisible * HEIGHT})
        }
    }, [scrollRef?.current])
    
    const FirstRoute = () => (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.scene,]}>
                <View style={[styles.itemDetailsBox, {marginHorizontal:paddingHorizontal}]}>
                    {description && <Text style={styles.desc}>{`" ` + description + ` "`}</Text>}
   
                    {typeof sold_with == 'object' 
                        && Object.values(sold_with).filter(s => s).length > 0 && (
                        <>
                        <Text style={[styles.text, {marginVertical: 15}]}>
                            Sold with
                        </Text>
                        <DataTable>
                            {Object.keys(sold_with).map( k => (
                                <DataTable.Row>
                                    <DataTable.Cell textStyle={{textTransform: 'uppercase'}}>{String(k).charAt(0).toUpperCase() + String(k).slice(1)}</DataTable.Cell>
                                    <DataTable.Cell numeric>{sold_with[k] == true ? 'yes' : 'no'}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                        </>
                    )}

                    {!_.isEmpty(measurements) && (
                        <>
                        <Text style={[styles.text, {marginVertical: 15}]}>
                            Size
                        </Text>
                        <DataTable>
                            {!_.isEmpty(measurements) && (<DataTable.Row>
                                <DataTable.Cell>Width</DataTable.Cell>
                                <DataTable.Cell numeric>{measurements.width + " " + measurements.unit}</DataTable.Cell>
                            </DataTable.Row>)}
                            {!_.isEmpty(measurements) && (<DataTable.Row>
                                <DataTable.Cell>Height</DataTable.Cell>
                                <DataTable.Cell numeric>{measurements.height + " " + measurements.unit}</DataTable.Cell>
                            </DataTable.Row>)}
                        </DataTable>
                        </>
                    )}
                    <Text style={[styles.text, {marginVertical: 15}]}>
                        {i18n.t('product.itemdetails')}
                    </Text>
                    <DataTable>
                        {!_.isEmpty(status_updated_at['approved']) && <DataTable.Row>
                            <DataTable.Cell>On-line</DataTable.Cell>
                            <DataTable.Cell numeric>{status_updated_at['approved'] || ""}</DataTable.Cell>
                        </DataTable.Row>}

                        {/* {!_.isEmpty(universe) && <DataTable.Row>
                            <DataTable.Cell>Universe</DataTable.Cell>
                            <DataTable.Cell numeric>{universe}</DataTable.Cell>
                        </DataTable.Row>} */}

                        {!_.isEmpty(category_name) && <DataTable.Row>
                            <DataTable.Cell>Universe</DataTable.Cell>
                            <DataTable.Cell numeric>{category_name}</DataTable.Cell>
                        </DataTable.Row>}

                        {!_.isEmpty(brand_name) && <DataTable.Row>
                            <DataTable.Cell>Brand</DataTable.Cell>
                            <DataTable.Cell numeric>{brand_name}</DataTable.Cell>
                        </DataTable.Row>}

                        {!_.isEmpty(color) && <DataTable.Row>
                            <DataTable.Cell>Color</DataTable.Cell>
                            <DataTable.Cell numeric>{color}</DataTable.Cell>
                        </DataTable.Row>}

                        {!_.isEmpty(material) && <DataTable.Row>
                            <DataTable.Cell>Material</DataTable.Cell>
                            <DataTable.Cell numeric>{material}</DataTable.Cell>
                        </DataTable.Row>}

                        {!_.isEmpty(printed) && <DataTable.Row>
                            <DataTable.Cell>Printed</DataTable.Cell>
                            <DataTable.Cell numeric>{printed}</DataTable.Cell>
                        </DataTable.Row>}

                        {!_.isEmpty(condition) && <DataTable.Row>
                            <DataTable.Cell>Condition</DataTable.Cell>
                            <DataTable.Cell numeric>{condition}</DataTable.Cell>
                        </DataTable.Row>}

                        {!_.isEmpty(shipping_country) && <DataTable.Row>
                            <DataTable.Cell>Location</DataTable.Cell>
                            <DataTable.Cell numeric>{shipping_country}</DataTable.Cell>
                        </DataTable.Row>}
                    </DataTable>
                    </View>
            </View>
        </ScrollView>
    );
    
    const SecondRoute = () => (
        <View style={[styles.scene,]}>
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
                <CollapsibleListItem 
                    leftIcon={{type: "evilicon", name:"location"}}
                    containerStyle={styles.collapseContainer}  
                    title={"Item location"}
                    collapsed={informationItemVisible == 0 ? false : true}
                    collapseText={`Origin: ${shipping_country}\n\nOnce purchased\n\n- If th item is located with the seller, it will be sent by seller to us to be authenticated. Once verifed, it will be send to you by us\n- If the item is already present, that means it has already been authenticated by our team of experts\n- If the Direct Shipping option is available, the item can be sent directly yo your address, skipping the visit to our control and authentication centre. This option is visible in your basket`}
                    collapseContainerStyle={{padding:15, backgroundColor : colors.gray,}}
                    />
                <CollapsibleListItem 
                    leftIcon={{type: "evilicon", name:"check"}}
                    containerStyle={styles.collapseContainer}  
                    title="Quality control" 
                    collapsed={informationItemVisible == 1? false : true}
                    collapseText={`Each item sold with control and authentication fees is physically checked by our exper teams. They verify:\n- the item's authenticity and quality\n- that the item matches the seller's description\n- that the item's condition matches the seller's stated condition\n\n We have no association and/or affiliation with brands whose products are offered for sale on its website/App\n\n The authentication of said products is performed independently by us.\n\nHowever, if the Direct Shipping options is available, the item can be sent directly yo your delivery address without being checked by us. Once your parcel has been received, you have to 72 hours to flag any conformity issues`}
                    collapseContainerStyle={{padding:15, backgroundColor : colors.gray,}}
                    // chevron
                    />
                <CollapsibleListItem 
                    leftIcon={{type: "ionicon", name:"ios-return-left"}}
                    containerStyle={styles.collapseContainer}  
                    title="Returns"
                    collapsed={informationItemVisible == 2 ? false : true}
                    collapseText={`In accordance with our General Conditions of Sale\n\n- Items purchased from a private seller can neither be refunded nor exchanged. If you do not like your item, we do offer the possibility of relisting your purchase, with no scommission. The item will be relisted at the purchase price and only a processing fee will be deducted.\n\n- Items bought from a proffesional seller are eligible for return`}
                    collapseContainerStyle={{padding:15, backgroundColor : colors.gray,}}
                    />
                <CollapsibleListItem 
                    leftIcon={{type: "material-icons", name:"local-shipping"}}
                    containerStyle={styles.collapseContainer}  
                    title="Shipping and returns"
                    collapsed={informationItemVisible == 3 ? false : true}
                    collapseText={`The item has been sent by its seller to our authentication experts.Once its authnticity has been checked, it will be sent to your delivery address.\n\nIf Direct Shipping is available for this item, it can be sent directly to your delivery address. This will save you on avarage 10$ thanks to the combined removal of your authentication and shipping fees.\n\nThe shipping cost for this product is 0$. We invite to visit our Terms of Use to check the fee schedule of shipping costs`}
                    collapseContainerStyle={{padding:15, backgroundColor : colors.gray,}}
                    />
                <CollapsibleListItem 
                    leftIcon={{type: "materialicons", name:"payment"}}
                    containerStyle={styles.collapseContainer}  
                    title="100% secure payment"
                    collapseText="100% secure"
                    collapsed={informationItemVisible == 4 ? false : true}
                    collapseContainerStyle={{padding:15, backgroundColor : colors.gray,}}
                    />
            </ScrollView>
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
                        labelStyle={{fontSize :22}}
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
    collapseContainer: {backgroundColor : colors.gray, marginVertical: 2, height: 65},
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