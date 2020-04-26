import React, { useEffect} from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import Message from '../../components/Message';
import {
    ListItem, 
    Input, 
    Button
} from 'react-native-elements';
import colors from '../../styles/colors';
import { ActivityIndicator } from 'react-native-paper';
import { Negotiation } from "../../types/Negotiation.type";
import { User } from "../../types/User.type";
import { Shop as ShopTypes } from "../../types/Shop.type";
import NegotiationPreview from './NegotiationPreview';

type Props = {
    placeholder: string,
    error: string,
    loading: boolean,
    product: ShopTypes.Product,
    negotiation: Negotiation,
    sellerUser: User,
    buyerUser: User,
    onCreateNew: (price: number) => void,
    acceptOffer: (price: number) => void,
    declineOffer: (price: number) => void,
}

const NegotiationsBox = ({
    placeholder = 'You want to make an offer to seller for the following item:',
    product = {},
    negotiation = {},
    error,
    onCreateNew,
    acceptOffer,
    declineOffer,
    loading,
    sellerUser,
    buyerUser,
} : Props) => {

    console.log('product',product)
    let [localOfferPrice, setOfferPrice] = React.useState(negotiation.offer_price || 0)

    return (
        <ScrollView>
            <View>
                <Text style={{textAlign:'center', padding: 20, color: 'black'}}>
                    {placeholder}
                </Text>
                <NegotiationPreview 
                    id={product.id}
                    brand_name={product.brand_name}
                    type_name={product.type_name}
                    subtype_name={product.subtype_name}
                    images={product.images}
                    price={product.price}
                    currency={product.currency}
                    />
                {negotiation.offer_price && <Text style={{width: '100%', paddingVertical: 10, textAlign:'center', backgroundColor: colors.gray}}>History</Text>}
                {
                !negotiation.offer_price  && <View style={{padding: 15}}>
                    <Input
                        placeholder='Amount'
                        value={localOfferPrice}
                        onChangeText={(text) => setOfferPrice(Number(text))}
                        keyboardType="number-pad"
                        placeholderTextColor="black"
                        // inputStyle={{color:"black",}}
                        containerStyle={{
                                // color:'black', 
                                padding:0,
                                margin: 0,  
                                backgroundColor : colors.inputBackgroud, 
                                marginVertical: 5
                            }}
                        errorStyle={{ color: 'red' }}
                        errorMessage={error}
                        />
                <Button 
                    onPress={() => onCreateNew(localOfferPrice)} 
                    title="confirm" 
                    buttonStyle={{backgroundColor:'black', width: '100%'}}
                    />
                {loading && <ActivityIndicator />}
                </View>
            }
            {negotiation.offer_price && (
                <Message
                position="right"
                showUserAvatar
                currentMessage={{
                    text: 'Offer sent'+ '\n' + negotiation.offer_price + ' ' + negotiation.currency,
                    // ...offer,
                    // _id:1,
                    // text: 'sdfsdfdssdfsds\nsdfsd',
                    createdAt: new Date(negotiation.createdAt),
                    user: buyerUser
                    // offer: true
                }}
                />
            )}
            {/* only seller can answer, show buttons if offer price is not null and negotiation is not answered */}
            {(negotiation.offer_price && !negotiation.answered && negotiation.seller_id == sellerUser.uid) 
            ? <View style={{marginTop: 15}}>
                <Button 
                    containerStyle={{paddingHorizontal: 15, marginVertical: 2}} 
                    buttonStyle={{backgroundColor: 'black'}} 
                    title="Accept" 
                    onPress={acceptOffer}
                    />
                <Button 
                    containerStyle={{paddingHorizontal: 15}} 
                    buttonStyle={{backgroundColor: 'black'}} 
                    title="Decline" 
                    onPress={declineOffer}
                    />
                </View>
            : (negotiation.offer_price && negotiation.answered && <Message
                showUserAvatar
                position="left"
                currentMessage={{
                text: negotiation.isAccepted ? 'You accepted this price' : 'You declined this price',
                createdAt: new Date(negotiation.answeredAt),
                user: sellerUser,
                // offer: true
                }}
            />)
            }
        </View>
      </ScrollView>
    );
};

export default NegotiationsBox;