import React from 'react';
import { 
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    ScrollView
} from "react-native";
import { Shop } from "../../types/Shop.type"
import i18n from '../../i18n';
import colors from '../../styles/colors'
import StepIndicator from 'react-native-step-indicator';
import PreviewRowCard from '../PreviewRowCard/PreviewRowCard';

const fillColor = "#c9b676"

const SoldCard = ({
    id,
    brand_name,
    type_name,
    subtype_name,
    images,
    description,
    sale_status,
    sale_status_updated_at,
}  : Shop.Product) => {

    let [collapsed, setCollapsed] = React.useState(true)
    const getImageURI = () => {
        return images && images[0] && images[0].src
    };

    console.log('sale_status', sale_status)
    // console.log('Shop.SaleStatus[sale_status]',Shop.SaleStatus.shipping)
    return (
        <View style={{padding: 10, marginTop: 10,borderRadius: 10, backgroundColor: 'white'}}>
            <PreviewRowCard 
                images={images}
                brand_name={brand_name}
                type_name={type_name}
                description={description}
                subtype_name={subtype_name}
                rightIcon={{ name : collapsed ? 'chevron-down' : 'chevron-up', type : "entypo"}}
                onPress={() => setCollapsed(!collapsed)}
                />
            {/* <ListItem 
                onPress={() => setCollapsed(!collapsed)}
                leftElement={
                    <View
                      style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                        source={{
                          uri: getImageURI(),
                        }}
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
                </View>}
                rightIcon={{ name : collapsed ? 'chevron-down' : 'chevron-up', type : "entypo"}}
                /> */}
                {
                    !collapsed && (<ScrollView>
                        <View style={{marginLeft: 15}}>
                            <StepIndicator 
                            direction="vertical"
                            stepCount={5}
                            labels={['1','2','3','4','5']}
                            customStyles={{
                                stepIndicatorFinishedColor : fillColor,
                                stepIndicatorUnFinishedColor : 'white',
                                stepIndicatorCurrentColor : 'white',
                                stepStrokeCurrentColor : fillColor,
                                separatorStrokeWidth: 0.5,
                                stepStrokeWidth: 2,
                                currentStepStrokeWidth:4,
                                stepStrokeFinishedColor : fillColor,
                                stepStrokeUnFinishedColor : fillColor,
                                separatorFinishedColor : fillColor,
                                separatorUnFinishedColor : fillColor,
                                stepIndicatorLabelUnFinishedColor : 'black',
                                labelAlign: 'flex-start',
                                stepIndicatorSize: 35
                            }}
                            currentPosition={Shop.SaleStatus[sale_status]}
                            // renderStepIndicator={()=> ()}
                            renderLabel={({position, stepStatus, label, currentPosition} :{position: Number, stepStatus: String, label: String, currentPosition: Number}) => {
                                let text = null
                                // console.log('position',position)
                                // console.log('Shop.SaleStatus[sale_status]',Shop.SaleStatus[sale_status])
                                switch(position){
                                    case 0:
                                        text = <>
                                            <Text style={S.title}>Sale</Text>
                                            {   sale_status_updated_at[Shop.SaleStatus[0]] && (
                                                <Text style={{fontSize: 13}}>
                                                Sold on {sale_status_updated_at[Shop.SaleStatus[0]]}
                                                </Text>)
                                            }
                                        </>
                                        break
                                    case 1:
                                        text = <>
                                            <Text  style={S.title}>Shipping</Text>
                                            {/* <Text style={{fontSize: 13}}>Sold on {sale_status_updated_at[1]}</Text> */}
                                        </>
                                        break
                                    case 2:
                                        text = <>
                                            <Text  style={S.title}>Delivery</Text>
                                            {sale_status_updated_at[Shop.SaleStatus[2]] && (
                                                <Text style={{fontSize: 13}}>
                                                {/* Start delivery by Verstiaire Collective on {sale_status_updated_at[Shop.SaleStatus[2]]} */}
                                                Received  on {sale_status_updated_at[Shop.SaleStatus[2]]}
                                                </Text>)
                                            }
                                        </>
                                        break
                                    case 3:
                                        text = <>
                                            <Text  style={S.title}>Authentication</Text>
                                            {sale_status_updated_at[Shop.SaleStatus[3]] && <Text style={{fontSize: 13}}>Authenticated on {sale_status_updated_at[Shop.SaleStatus[3]]}</Text>}
                                        </>
                                        break
                                    case 4:
                                        text = <>
                                            <Text  style={S.title}>Payment</Text>
                                            {sale_status_updated_at[Shop.SaleStatus[4]] && <Text style={{fontSize: 13}}>To be transfered on {sale_status_updated_at[Shop.SaleStatus[4]]}</Text>}
                                        </>
                                        break
                                }
                                return <View style={{paddingBottom: 25, paddingTop: 5, marginLeft: 10 }}>{text}</View>
                            }}
                        />
                        </View>
                    </ScrollView>)
                }
        </View>
    );
};

SoldCard.defaultProps = {
    id: "tst",
    brand_name : 'test brand',
    type_name : 'test type',
    subtype_name : 'test subtype',
    sale_status : 'shipping',
    sale_status_updated_at : {
        'sold' : '2020/04/03'
    }
}

export default SoldCard;


const S = StyleSheet.create({
    cartBtn: {
      padding: 12,
      // position: "absolute",
      bottom: 0,
      backgroundColor: colors.black,
      borderRadius: 5,
      marginTop: 20,
    },
    id: {
      // color: colors.gray,
      color: 'gray',
      fontSize: 13,
    },
    title: {
      color: 'black',
      fontSize: 17,
      fontWeight: 'bold',
      textAlign:'left',
    },
    price: {
      fontSize: 18,
    },
    newPrice: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    discountPrice: {
      color: 'gray',
      marginHorizontal: 3,
  
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    },
    desc: {
      fontSize: 15,
      color: 'gray',
    },
    discount: {
      fontWeight: 'bold',
      backgroundColor: 'red',
      borderRadius: 5,
      color: 'white',
      padding: 3,
      // padding: 5
    },
    countBox: {
      backgroundColor: colors.gray,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });