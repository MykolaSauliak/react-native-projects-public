import React from 'react';
import { 
    View,
    Text,
    FlatList,
    StyleSheet
} from "react-native";
import { Order } from "../types/types";
import i18n from '../i18n';
import colors from '../styles/colors'
import { ListItem } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from "react-native-vector-icons/Entypo";
import PreviewRowCard from './PreviewRowCard/PreviewRowCard';

const S = StyleSheet.create({
    orderStatus: {
        color : colors.orange
    },
})

const OrderCard = ({
    id,
    orderStatus,
    amount,
    shippingAddress,
    payment_status,
    payment_method,
    createdAt,
    created_time,
    updatedAt,
    items = [],
} : Order) => {

    let [collapsed, setCollapsed] = React.useState(true)

    return (
        <View style={{padding: 10, marginTop: 10,borderRadius: 10, backgroundColor: 'white'}}>
            <ListItem 
                onPress={() => setCollapsed(!collapsed)}
                title={<View>
                        <Text>
                            {i18n.t('myorders.orderid')} {id}
                        </Text>
                        {/* <Text>
                            {shippingAddress.first_name} {shippingAddress.last_name}{' '}
                        </Text> */}
                        {/* <Text>{shippingAddress} </Text> */}
                        <Text style={S.orderStatus}>
                            {i18n.t('myorders.orderstatus')} {orderStatus}
                        </Text>
                        <Text>
                            {i18n.t('myorders.totalincludedtax')} {amount}
                        </Text>
                        <Text>
                            {i18n.t('myorders.paymentstatus')} {payment_status}
                        </Text>
                        <Text>
                            {i18n.t('myorders.paymentmethod')} {payment_method}
                        </Text>
                        <Text>
                            {i18n.t('myorders.postalcode')} {shippingAddress.postal_code}{' '}
                        </Text>
                        {/* <Text>Items: </Text> */}
                        {createdAt && (
                            <Text>
                            {i18n.t('myorders.createdtime')} {createdAt}
                            </Text>
                        )}
                        {!createdAt && created_time && (
                            <Text>
                            {i18n.t('myorders.createdtime')} {new Date(created_time).toISOString()}
                            </Text>
                        )}
                        {updatedAt && (
                            <Text>
                            {i18n.t('myorders.lastupdate')} {updatedAt}{' '}
                            </Text>
                        )}
                        {
                            !collapsed && <FlatList
                                    listKey={id}     
                                    data={items}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({item, index}) => (
                                        <PreviewRowCard 
                                            id={item.id}
                                            brand_name={item.brand_name}
                                            type_name={item.type_name}
                                            subtype_name={item.subtype_name}
                                            images={item.images}
                                            currency={item.currency}
                                            description={item.description}
                                            />
                                        // <ListItem 
                                        //     containerStyle={{minHeight: 140,  backgroundColor: "white"}}
                                        //     leftAvatar={{ 
                                        //         source : {uri : item?.images[0].src}, 
                                        //         // containerStyle : {backgroundColor: "white"}, 
                                        //         // avatarStyle: {backgroundColor: null},
                                        //         imageProps:  {resizeMode : 'repeat'}, 
                                        //         rounded :false,
                                        //         size: "large"
                                        //     }}
                                        //     title={item.brand_name }
                                        //     subtitle={item.price + ' '  + (item.currency || 'USD')}
                                        //     />
                                    )}
                                    />
                        }
                </View>}
                Component={TouchableWithoutFeedback}
                rightElement={<View style={{height: '100%', justifyContent:'flex-start', alignItems:'center'}}>
                    <Entypo name={collapsed ? 'chevron-down' : 'chevron-up'} size={25} />    
                </View>}
                />
            
        </View>
    );
};

export default OrderCard;