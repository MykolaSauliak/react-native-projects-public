import {BackHeader} from '../../components';
import React from 'react';
import ShoppingCartIcon from '../ShippingCartIcon'

const HeaderWithCartContainer = ({
    ...props
}) => {
    return (
        <BackHeader 
            {...props}
            rightComponent={<ShoppingCartIcon />}
            />
    );
};

export default HeaderWithCartContainer;