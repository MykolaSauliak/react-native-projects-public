import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import Sell from '../screens/Sell';
import SelectSellCategory from '../screens/Sell/components/SelectSellCategory';
import SelectSellType from '../screens/Sell/components/SelectSellType';
import SelectSellBrand from '../screens/Sell/components/SelectSellBrand';
import SelectSellMainSteps from '../screens/Sell/components/SelectSellMainSteps';

import SelectSellInformation from '../screens/Sell/components/SelectSellInformation';
import SelectSellSubcategory from '../screens/Sell/components/SelectSellSubcategory';
import SelectSellMaterial from '../screens/Sell/components/SelectSellMaterial';
import SelectSellColor from '../screens/Sell/components/SelectSellColor';
import SelectSellPrinted from '../screens/Sell/components/SelectSellPrinted';
import SelectSellPhotos from '../screens/Sell/components/SelectSellPhotos';

import SelectSellDescription from '../screens/Sell/components/SelectSellDescription';
import SelectSellDescriptionWrite from '../screens/Sell/components/SelectSellDescriptionWrite';
import SelectSellMeasurements from '../screens/Sell/components/SelectSellMeasurements';

import SelectSeller from '../screens/Sell/components/SelectSeller';

import SelectSellCondition from '../screens/Sell/components/SelectSellCondition';
import SelectSellConditionWrite from '../screens/Sell/components/SelectSellConditionWrite';
import SelectSellPrice from '../screens/Sell/components/SelectSellPrice';
import SelectSellOptionalInformation from '../screens/Sell/components/SelectSellOptionalInformation';
import screens from '../constants/screens';

const SellStack = createStackNavigator(
    {
      [screens.Sell]: Sell,
      [screens.SelectSellCategory]: SelectSellCategory,
      [screens.SelectSellType]: SelectSellType,
      [screens.SelectSellBrand]: SelectSellBrand,
      [screens.SelectSellMainSteps]: SelectSellMainSteps,
      [screens.SelectSellInformation]: SelectSellInformation,
      [screens.SelectSellSubcategory]: SelectSellSubcategory,
      [screens.SelectSellMaterial]: SelectSellMaterial,
      [screens.SelectSellColor]: SelectSellColor,
      [screens.SelectSellPrinted]: SelectSellPrinted,
      [screens.SelectSellPhotos]: SelectSellPhotos,
      [screens.SelectSellDescription]: SelectSellDescription,
      [screens.SelectSellDescriptionWrite]: SelectSellDescriptionWrite,
      [screens.SelectSellMeasurements]: SelectSellMeasurements,
      [screens.SelectSellCondition]: SelectSellCondition,
      [screens.SelectSellConditionWrite]: SelectSellConditionWrite,
      [screens.SelectSellPrice]: SelectSellPrice,
      [screens.SelectSeller]: SelectSeller,
      [screens.SelectSellOptionalInformation]: SelectSellOptionalInformation,
    },
    {
      defaultNavigationOptions: props => ({
        header: null,
      }),
    },
  );

export default SellStack;
