import React from 'react';
import { 
    View,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import { ListItem } from 'react-native-elements';
import constants from '../../constants';

const S = StyleSheet.create({
      title: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign:'left',
      },
      desc: {
        fontSize: 15,
        color: 'gray',
      },
})

type Props = {
    id?:string, 
    brand_name?:string, 
    type_name?:string, 
    dropdown?:boolean, 
    subtype_name?:string, 
    images?:{src: string}[], 
    price?:number, 
    currency?:string, 
    description?:string, 
    onCollapsedChange?: () => void, 
}

const PreviewRowCard = ({
    id,
    brand_name,
    type_name,
    dropdown = false,
    subtype_name,
    images,
    price,
    currency = 'USD',
    description,
    onCollapsedChange,
    ...otherProps
} :Props) => {

    let [collapsed, setCollapsed] = React.useState(true)
    const getImageURI = () => {
        return images && images[0] && images[0].src
    };

    return (
        <ListItem 
            onPress={dropdown ? () => {
                if(onCollapsedChange){
                    onCollapsedChange(!collapsed)
                }
                setCollapsed(!collapsed)
            } : null}
            leftElement={
                <View
                style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    source={{
                        uri: getImageURI()
                    }}
                    defaultSource={constants.defaultImage}
                    resizeMode="contain"
                    style={{width: '100%', height: 75}}
                />
                </View>
            }
            title={<View>
                <Text style={S.title}>
                    {brand_name} {type_name} {subtype_name}
                </Text>
                {description && <Text style={S.desc}>{description}</Text>}
                {price && <Text style={S.desc}>{price} {currency}</Text>}
            </View>}
            rightIcon={dropdown ? { name : collapsed ? 'chevron-down' : 'chevron-up', type : "entypo"} : null}
            {...otherProps}
            />
    );
};

export default PreviewRowCard;