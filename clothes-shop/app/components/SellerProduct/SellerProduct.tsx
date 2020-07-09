//@flow
import React from 'react';
import { View, Animated } from 'react-native';
import TwoStateButton from '../TwoStateButton/TwoStateButton';
import { PriceReductionButton } from '../../containers';
import RemoveFromSold from '../../containers/Buttons/RemoveFromSold/RemoveFromSold';
import { colors } from '../../styles';
import { ShopService, NavigationService } from '../../services';
import constants from '../../constants';
import PreviewRowCard from '../PreviewRowCard/PreviewRowCard';
import Collapsible from 'react-native-collapsible';

const SellerProduct = ({
    id,
    status,
    images,
    ...props
}) => {

    let [collapsed, setCollapsed] = React.useState(true)
    // const fadeAnim = React.useRef(new Animated.Value(0)).current

    // const fadeIn = () => {
    //     // Will change fadeAnim value to 1 in 5 seconds
    //     Animated.timing(fadeAnim, {
    //       toValue: 1,
    //       duration: 2000
    //     }).start();
    //   };
    
    //   const fadeOut = () => {
    //     // Will change fadeAnim value to 0 in 5 seconds
    //     Animated.timing(fadeAnim, {
    //       toValue: 0,
    //       duration: 500
    //     }).start();
    //   };
    
    // console.log(fadeAnim)
      
    return (<>
            <PreviewRowCard 
                {...props}
                images={images}
                dropdown
                bottomDivider
                onImagePress={() => NavigationService.navigateToProduct({id})}
                onCollapsedChange={() => {
                    // if(collapsed){
                    //     fadeIn()
                    // }
                    // else{
                    //     fadeOut()
                    // }
                    setCollapsed(!collapsed)
                }}
                />
            <Collapsible 
                collapsed={collapsed}
                style={{ width:'100%',height:120, flexDirection:'row', alignItems: 'center'}}>
                <View style={{flex:1}}>
                    <TwoStateButton 
                        iconProps={{type: 'antdesign', name: "pluscircleo"}}
                        title="Add photo"
                        onPress={async () => NavigationService.navigateToAddPhoto({product: {id, images, status, ...props}})}
                        disabled={images.length > 8}
                        color={colors.orange}
                        // toggledD
                        />
                </View>
                <View style={{flex:1}}>
                    <TwoStateButton 
                        iconProps={{type: 'font-awesome', name: "angle-double-down"}}
                        title="Price reduction"
                        onPress={() => NavigationService.navigateToPriceReduction({product: {id, images, status, ...props}})} 
                        // disabled={images.length > 8}
                        color={colors.orange}
                        // toggledD
                        />
                    {/* <PriceReductionButton 
                        onPress={() => NavigationService.navigateToPriceInput()} 
                        // item={item} 
                        color={colors.orange}
                        /> */}
                    </View>
                <View style={{flex:1, justifyContent:'center'}}>
                    <RemoveFromSold onPress={() => NavigationService.navigateToRemoveFromSold({product: {id, images, status, ...props}})} id={id} status={status}/>
                    {/* <AlertButton item={item} color={colors.orange} /> */}
                </View>
        </Collapsible>
    </>
    );
};

export default SellerProduct;