//@flow
import React from 'react';
import {ListItem} from 'react-native-elements'
import { Negotiation } from "../../types/Negotiation.type";

type Props = {
    id :string,
    brand_name :string,
    type_name :string,
    subtype_name :string,
    images :{src: string}[],
    image :{src: string},
    currency :string,
    price :number,
    onPress?: (item : Negotiation) => void,
    item: Negotiation,
}

const NegotiationPreview = ({
    id,
    brand_name,
    type_name = "",
    subtype_name = "",
    images,
    image,
    price = 0,
    currency = 'USD',
    onPress = () => {},
    item
} : Props) => {
    return (
        <ListItem
            title={brand_name}
            leftAvatar={{
                source:{
                    uri: image ? image.src : images ?  images[0].src ? images[0].src :"" : ""
                },
                rounded: false,
            }}
            subtitle={id + '\n' + (type_name || '') + " " + subtype_name + '\n'+price+' ' + currency}
            onPress={() => onPress(item)}
            />
    );
};

export default NegotiationPreview;