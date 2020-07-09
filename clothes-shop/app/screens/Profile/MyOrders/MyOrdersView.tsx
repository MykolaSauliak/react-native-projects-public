import React from 'react';
import {View, ImageBackground, StyleSheet, FlatList} from 'react-native';
import globalStyles from '../../../styles';
import colors from '../../../styles/colors';
import i18n from '../../../i18n';
import {Address,Order} from '../../../types/types'
import OrderCard from '../../../components/OrderCard'
import Loading from '../../../components/Loading'
import {  Text} from '../../../components';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const S = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.dark,
  },
});

const MyOrdersView = ({
  orders = [],
  loading,
}) => {

  return (
    <View style={{flex: 1, backgroundColor: colors.gray, padding: 15}}>
      {/* <StatusBar backgroundColor={colors.gray}/> */}
      {/* {_renderHeader()} */}
      {loading ? 
        <Loading /> :
        <FlatList
          listKey={'orders'}
          keyExtractor={(item) => item.id}
          data={orders}
          ListEmptyComponent={<Text style={{...globalStyles.text, textAlign: "center", fontSize: widthPercentageToDP(5)}}>no orders</Text>}
          renderItem={({item} : {item: Order}) => <OrderCard {...item}/>}
          />
      }

    </View>
  );
};

export default MyOrdersView;
