import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getTokens,
  getSelectedToken,
} from '../../features/stripetokens/selectors';
import {addStripeToken, setToken} from '../../features/stripetokens/actions';

const withCards = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let tokens = useSelector(state => getTokens(state));
  let selectedToken = useSelector(state => getSelectedToken(state)) || {};
  // console.log('cartItems',cartItems.length)
  return (
    <BaseComponent
      {...props}
      tokens={tokens}
      selectedToken={selectedToken}
      selectToken={token => dispatch(setToken(token))}
      addToken={token => dispatch(addStripeToken(token))}
    />
  );
};

export default withCards;
