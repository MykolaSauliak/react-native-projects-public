import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import FilterSort from '../screens/Search/FilterSortScreen';
import screens from '../constants/screens';

const FilterSortNavigation = createStackNavigator({
  [screens.FilterSort]: {
    screen: FilterSort,
    navigationOptions: props => ({
      header: null,
    }),
  },
});

export default FilterSortNavigation;
