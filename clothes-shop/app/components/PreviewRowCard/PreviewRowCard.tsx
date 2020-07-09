import React from 'react';
import { 
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import constants from '../../constants';
import moment from 'moment'
import { colors } from '../../styles';
import { Touchable, ListItem, Text } from '..';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const pluralize = require('pluralize')

const S = StyleSheet.create({
      title: {
        lineHeight: 24,
        color: 'black',
        fontSize: widthPercentageToDP(5),
        fontWeight: 'bold',
        textAlign:'left',
      },
      subtitle: {
        lineHeight: 24,
        color: 'black',
        fontSize:  widthPercentageToDP(5)   ,
        textAlign:'left',
      },
      forSale: {
        lineHeight: 24,
        color: colors.orange,
        fontSize:  widthPercentageToDP(4),
        textAlign:'left',
        fontWeight:'bold'
      },
      desc: {
        lineHeight: 24,
        fontSize: widthPercentageToDP(5),
        color: 'gray',
      },
})

type Props = {
    id?:string, 
    brand_name?:string, 
    type_name?:string, 
    created_time?:number, 
    dropdown?:boolean, 
    subtype_name?:string, 
    images?:{src: string}[], 
    price?:number, 
    currency?:string, 
    description?:string, 
    onCollapsedChange?: () => void, 
}

const PreviewRowCard = ({
    id = "",
    brand_name = "",
    material = "",
    created_time = 0,
    type_name = "",
    dropdown = false,
    subtype_name = "",
    images,
    image,
    price = 0,
    currency = 'USD',
    description = "",
    onCollapsedChange,
    showOnSales = true,
    newPrice = 0,
    onPress,
    onImagePress,
    ...otherProps
} :Props) => {

    let [collapsed, setCollapsed] = React.useState(true)
    const getImageURI = () => {
        return (images && images[0]) ? images[0].src : image ? image?.src : ""
    };

    const getPastMonth = () => {
        let month = moment(new Date(created_time)).diff(new Date(), 'month') || 1
        return  month + ' ' + pluralize('month', month)  
    }

    return (
        <ListItem 
            Component={TouchableWithoutFeedback}
            onPress={dropdown ? () => {
                if(onCollapsedChange){
                    onCollapsedChange(!collapsed)
                }
                setCollapsed(!collapsed)
            } : onPress? onPress : null}
            leftElement={onImagePress ? (
                <TouchableOpacity
                    onPress={onImagePress}
                    style={{flex:0.4, height: 75,  alignItems: 'center', justifyContent: 'center'}}
                   >
                    <View
                         style={{width: '100%', height: '100%'}}>
                        <Image
                            source={{
                                uri: getImageURI()
                            }}
                            defaultSource={constants.defaultImage}
                            resizeMode="contain"
                            style={{width: '100%', height: 75}}
                        />  
                    </View>
                </TouchableOpacity>
            ) : (<View
                style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    source={{
                        uri: getImageURI()
                    }}
                    defaultSource={constants.defaultImage}
                    resizeMode="contain"
                    style={{width: '100%', height: 75}}
                />
                </View>)
            }
            title={<View>
                {brand_name.length > 0 && (<Text numberOfLines={1} style={S.title}>
                    {brand_name}
                </Text>)}
                {(<Text style={S.subtitle}>{`${material?material+' ' : ""}${type_name?type_name + " " : ""}${subtype_name}`}</Text>)}
                {description.length > 0 && <Text style={S.subtitle}>{description}</Text>}
                {price > 0 && <Text style={S.subtitle}>On the site: {price} {currency}</Text>}
                {newPrice > 0 && <Text style={S.subtitle}>For you: {newPrice} {currency}</Text>}
                {showOnSales && created_time > 0 && <Text  style={S.forSale}>For sales {getPastMonth()}</Text>}
            </View>}
            rightIcon={dropdown ? { name : collapsed ? 'chevron-down' : 'chevron-up', type : "entypo"} : null}
            {...otherProps}
            />
    );
};

export default PreviewRowCard;