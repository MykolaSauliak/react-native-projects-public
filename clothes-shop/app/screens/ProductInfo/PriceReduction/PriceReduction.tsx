import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import ButtonBlack from '../../../components/Button/ButtonBlack';
import { PreviewRowCard, BackHeaderCenter, Loading, Input, FormInput } from '../../../components';
import constants from '../../../constants';
import { colors } from '../../../styles';
import { ShopService, NavigationService } from '../../../services';
import { setLoading } from '../../../features/settings/actions';
import {  Text} from '../../../components';
import listnames from '../../../constants/listnames';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const PriceReduction = ({
    product = {},
    updateListItem,
    updateCurrentItem,
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
            <BackHeaderCenter title="Price reduction" />
            <View style={{flex:1,}}>
                <PreviewRowCard {...product} />
                <View style={{flex:1,alignItems:'center', marginTop: 20, paddingHorizontal: 15}}>
                    <Text style={{ opacity: 0.5,  fontSize: widthPercentageToDP(5)}}>Enter new price:</Text>
                    <View style={{width: "70%" }}>
                        <Input 
                            inputType="number" 
                            onChangeText={(text:number) => {
                                setNewPrice(text)
                                setError("")
                            }}
                            placeholder="200"
                            keyboardType="number-pad"
                            value={newPrice}
                            inputContainerStyle={{color: 'black'}}
                            inputStyle={{color: 'black'}}
                            errorMessage={error}
                            />
                    </View>
                    <Text style={{marginTop: 20, opacity: 0.5, fontSize: widthPercentageToDP(5)}}>For you:</Text>
                    <Text style={{ opacity: 0.5,  fontSize: widthPercentageToDP(5)}}>{getForYouPrice()}</Text>
                    <Text style={{ fontSize: widthPercentageToDP(6), textAlign:'center', marginTop: 20, lineHeight: 25}}>The new price of your item will appear on your item page:</Text>
                    <Text  style={{ fontSize: widthPercentageToDP(5),color: "red", fontWeight: "bold", marginTop: 10,  lineHeight: 25}}>{newPrice} USD</Text>

                    <View style={{width: '90%', marginTop: 20,}}>
                        <ButtonBlack 
                            // disabled={images.length == 0}
                            containerStyle={{height: 65}} 
                            title="Confirm" 
                            onPress={async () => {
                                if(newPrice > product.price || newPrice > product.newPrice){
                                    setError('New price is too high')
                                    return  
                                }
                                setLoading(true)
                                let successful = await ShopService.setNewPrice({
                                    product_id: product.id,
                                    newPrice: newPrice
                                })
                                if(successful){
                                    Alert.alert('Successfully updated the price')
                                    NavigationService.goBack()
                                    updateCurrentItem({listName: listnames.clothes, update: {newPrice}})
                                    updateListItem({listName: listnames.myitemsforsales, id: product.id, update: {newPrice}})
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

export default PriceReduction;