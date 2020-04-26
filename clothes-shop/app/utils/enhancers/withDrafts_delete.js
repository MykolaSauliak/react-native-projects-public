import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getDrafts, getDraftsLastUpdate} from '../../features/seller/selectors';
import {removeFromDrafts, setSellProduct} from '../../features/seller/actions';

const withDrafts = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let drafts = useSelector(state => getDrafts(state)) || [];
  let draftLastUpdate = useSelector(state => getDraftsLastUpdate(state));
  // console.log('cartItems',cartItems.length)
  return (
    <BaseComponent
      {...props}
      drafts={drafts}
      draftLastUpdate={draftLastUpdate}
      removeFromDrafts={item => dispatch(removeFromDrafts(item))}
      setSellProduct={item => dispatch(setSellProduct(item))}
    />
  );
};

export default withDrafts;
