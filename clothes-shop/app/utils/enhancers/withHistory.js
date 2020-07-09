import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getHistoryItems} from '../../features/history/selectors';
import {addToHistory} from '../../features/history/actions';

const withHistory = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let historyItems = useSelector(state => getHistoryItems(state)) || [];
  // console.log('historyItems', historyItems);
  return (
    <BaseComponent
      {...props}
      historyItems={historyItems}
      addToHistory={item => dispatch(addToHistory(item))}
    />
  );
};

export default withHistory;
