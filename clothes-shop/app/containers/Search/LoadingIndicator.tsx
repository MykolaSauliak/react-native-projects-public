import React from 'react';
import { View } from "react-native";
import {
    connectStateResults,
    } from 'react-instantsearch-native';
import { Loading } from '../../components';

const LoadingIndicator = connectStateResults(
    ({ isSearchStalled, children }) =>
      isSearchStalled ? (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Loading />
        </View>) : <>{children}</>
  );

export default LoadingIndicator;