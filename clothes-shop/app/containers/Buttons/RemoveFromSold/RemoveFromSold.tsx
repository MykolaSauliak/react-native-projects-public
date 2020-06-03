import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import TwoStateButton from '../../../components/TwoStateButton/TwoStateButton';
import constants from '../../../constants';
import { Shop } from '../../../types/Shop.type';
import { ShopService } from '../../../services';
import { colors } from '../../../styles';

type RemoveFromSoldProps = {
  id: string,
  status: Shop.Status,
  btnStyle: any,
}

const styles = StyleSheet.create({
    wishlistBtn: {    
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
      fontSize: 14,
      marginTop: 10,
    }
})

const RemoveFromSold = ({
    id = "",
    status = 'approved',
    color=colors.orange,
    ...props
} : RemoveFromSoldProps) => {
    return (
      <TwoStateButton 
        iconProps={{type: 'antdesign', name: "check"}}
        toggledIconProps={{ type: 'antdesign', name: "closecircleo"}}
        toggled={status == constants.clothes_fields.status_field.approved}
        onToggledPress={() => ShopService.hideProduct(id)}
        title={`approve for\nsold`}
        toggledTitle={`remove from\nsold`}
        onPress={() => status == constants.clothes_fields.status_field.user_dismiss ?  ShopService.showProduct(id) : () => {}}
        disabled={status == constants.clothes_fields.status_field.sold}
        color={color}
        {...props}
        />
    );
};

export default RemoveFromSold;