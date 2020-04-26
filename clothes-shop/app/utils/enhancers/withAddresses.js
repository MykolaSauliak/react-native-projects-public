import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAddresses,
  getSelectedAddress,
} from '../../features/shippingaddress/selectors';
import {
  addShippingAddress,
  removeShippingAddress,
  setSelectedAddress,
  updateAddress,
} from '../../features/shippingaddress/actions';

const withAddresses = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let addresses = useSelector(state => getAddresses(state)) || [];
  let selectedAddress = useSelector(state => getSelectedAddress(state)) || {};
  console.log('addresses',addresses.length)
  return (
    <BaseComponent
      {...props}
      addresses={addresses}
      selectedAddress={selectedAddress}
      selectAddress={address => dispatch(setSelectedAddress(address))}
      addShippingAddress={address => dispatch(addShippingAddress(address))}
      addAddress={address => dispatch(addShippingAddress(address))}
      updateAddress={({id, update}) => dispatch(updateAddress({id, update}))}
      addressExist={address =>
        addresses.map(ad => ad.id).indexOf(address.id) > 0
      }
      removeShippingAddress={address =>
        dispatch(removeShippingAddress(address))
      }
    />
  );
};

export default withAddresses;
