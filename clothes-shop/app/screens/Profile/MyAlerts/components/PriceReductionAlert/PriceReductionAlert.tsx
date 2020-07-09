import React from 'react';
import { 
    View,
    FlatList,
    Image
} from "react-native";
import { Product as ProductType } from "../../../../../types";
import { NavigationService } from '../../../../../services';
import constants from '../../../../../constants';
import {  Text, ListItem} from '../../../../../components';

type Props = {
    items: ProductType[]
}

const PriceReductionList = ({
    items
} : Props) => {
    return (
        <View style={{}}>
            <FlatList 
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => <ListItem 
                            // containerStyle={{margin: 10}}
                            bottomDivider
                            topDivider
                            leftElement={<Image 
                                        style={{width: constants.DEVICE_WIDTH * 0.3, height: 100}} 
                                        resizeMode="contain"
                                        source={{uri: item?.images[0].src }}
                                        />}
                            onPress={() => NavigationService.navigateToProduct({...item})}
                            title={`${item.brand_name}\n${item.color} ${item.material} ${item.type_name}`}
                            subtitle={`${item.price} ${item.currency}`}
                            // rightContentContainerStyle={{width: 0}}
                            />}
                />
         </View>
    );
};

export default PriceReductionList;