import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import ButtonBlack from '../../../components/Button/ButtonBlack';
import { PreviewRowCard, BackHeaderCenter, Loading, Input, FormInput } from '../../../components';
import constants from '../../../constants';
import { colors } from '../../../styles';
import { ShopService, NavigationService } from '../../../services';
import { setLoading } from '../../../features/settings/actions';
import { Text } from 'react-native-animatable';
import listnames from '../../../constants/listnames';

const RemoveFromSold = ({
    product = {},
    removeFromList,
    updateCurrentItem
}) => {

    let [newPrice, setNewPrice] = React.useState(0)
    let [error, setError] = React.useState("")
    let [loading, setLoading] = React.useState(false)
    // console.log('product',product)
    const getForYouPrice  = () => {
        return newPrice * constants.priceCoef
    }

    return (
        <>
        {loading && <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.gray, alignItems:'center', justifyContent:'center', zIndex: 2, opacity: 0.3}}>
            <Loading />    
        </View>}
        <ScrollView style={{flex:1, paddingBottom: 50}} contentContainerStyle={{paddingBottom: 50}}>
            <BackHeaderCenter title="Remove from sale" />
            <View style={{flex:1,}}>
                <PreviewRowCard {...product} />
                <View style={{flex:1,alignItems:'center', marginTop: 20, paddingHorizontal: 15}}>
                    <Text >You are about to withdraw an item from sale. 
                        {/* Please indicate the reason for this  withdrawal: */}
                    </Text>
                    {/* <ListItem 
                        title="I no logner wit to sell it"
                        />
                    <ListItem 
                        title="I sold tje item elsewhere"
                        />
                    <ListItem 
                        title="Other reason"
                        /> */}
                    <View style={{width: '90%', marginTop: 30,}}>
                        <ButtonBlack 
                            // disabled={images.length == 0}
                            containerStyle={{height: 65}} 
                            title="REMOVE THIS ITEM FROM SALE" 
                            onPress={async () => {
                                // let 
                                // if(newPrice > product.price || newPrice > product.newPrice){
                                //     setError('New price is too high')
                                //     return  
                                // }
                                // setLoading(true)
                                let successful = await ShopService.hideProduct({
                                    product_id: product.id,
                                })
                                if(successful){
                                    removeFromList({listName: listnames.myitemsforsales, item:product})
                                    updateCurrentItem({listName: listnames.myitemsforsales, id:product.id, update:{
                                        status: constants.clothes_fields.status_field.user_dismiss
                                    }})
                                    Alert.alert('Successfully updated the status')
                                    NavigationService.goBack()
                                }else{
                                    Alert.alert('Something goes wrong')
                                }

                                // setLoading(false)
                            }}
                            />
                    </View>
                </View>
            </View>
        </ScrollView>
        </>
    );
};

export default RemoveFromSold;