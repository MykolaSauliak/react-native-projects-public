import React from 'react';
import {compose, withProps} from 'recompose';
import HorizontalItemList from '../components/HorizontalItemList';
import {withHistory} from '../utils/enhancers';
import screens from '../constants/screens';
import {NavigationActions, DrawerActions} from 'react-navigation';

const enhance = compose(
  withHistory(),
  withProps(({historyItems, title}) => ({
    items: historyItems,
    title: title || 'Recently Viewed',
  })),
);

export default enhance(HorizontalItemList);
