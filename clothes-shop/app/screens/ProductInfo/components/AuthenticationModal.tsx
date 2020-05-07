import React, { Component } from 'react'
import { 
    View,
    Text,
    FlatList,
    StyleSheet
 } from "react-native";
import { ListItem, Input } from "react-native-elements";
import Modal from "react-native-modal";
import { BackHeader } from '../../../components';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../styles';

const AuthenticationModal = ({
    isModalVisible = false,
    toggleModal,
}) => {
    return (
  <Modal 
    style={styles.modalContainer} 
    isVisible={isModalVisible}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <BackHeader title="More information" goBack={toggleModal}/>
            <ScrollView>
                <Text style={{fontSize: 22, marginTop: 22}}>Authentication and verification</Text>
                <ListItem 
                    leftIcon={{name :'shield-check-outline', type: "material-community", color: "#f25d22", size: 35}}
                    titleStyle={styles.title}
                    title={"Authentication and verification"}
                    subtitle={<Text style={styles.subtitle}>Sold items are physically verified and authenticated by our experts. We have no asociation and/or affiliation with the brands whose products are offered for sale on its website/App. The authentication of said products is performed independently by us. <Text style={{opacity: 0.5, fontSize: 13}}>{"\n\n"}Our authentification fees is 2% of the item price and will be no more then $9.99</Text></Text>}
                    />
                <ListItem 
                    leftIcon={{name :'dollar-sign', type: "feather", color: "#f25d22", size: 35}}
                    titleStyle={styles.title}
                    title={"Guaranteed refund"}
                    subtitle={<Text style={styles.subtitle}>Guaranteed 100% refund when an item does not comply with the description fiven by the seller or in the event of it being misplaced by the carrier</Text>}
                    />
                <Text style={{fontSize: 22, marginTop: 22}}>How are our shipping costs calculated?</Text>
                <ListItem 
                    leftIcon={{name :'timer-sand', type: "material-community", color: "#f25d22", size: 35}}
                    titleStyle={styles.title}
                    title={"Exceptional products"}
                    subtitle={<Text style={styles.subtitle}>To avoid waiting for each item in your order, once your item has undergone authenticity and quality control checks, it will be sent straight to you. This is why shipping charges are calculated per product.</Text>}
                    />
                <ListItem 
                    leftIcon={{name :'sc-telegram', type: "evilicon", color: "#f25d22", size: 35}}
                    titleStyle={styles.title}
                    title={"Products from around the world"}
                    subtitle={<Text style={styles.subtitle}>The items sold come from all over the world. The shipping costs are calculated according to the origin of the product and the delivery address</Text>}
                    />
            </ScrollView>
        </View>
    </Modal>
    );
};

export default AuthenticationModal;

const styles = StyleSheet.create({
    modalContainer: {backgroundColor: 'white', margin: 0, padding: 0},
    title: {
        fontSize: 13,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    subtitle: {
        fontSize: 17,
        color: 'black'
    },
})