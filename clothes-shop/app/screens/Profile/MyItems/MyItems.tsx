import React from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList, ScrollView} from 'react-native';
// import globalStyles from '../../constants/styles';
import colors from '../../../styles/colors';
import GridList from '../../../containers/GridList'
import {BackHeader} from "../../../components";
import Loading from "../../../components/Loading";
import {ListItem} from 'react-native-elements'
import _ from 'lodash'
import {NavigationService} from '../../../services'
import ProductCard from '../../../containers/ProductCard';
import SoldCard from '../../../components/SoldCard';
import PriceReductionProductCard from '../../../containers/PriceReductionProductCard';
import { Loader } from '../../../components';
import NegotiationPreview from '../../../components/Negotiations/NegotiationPreview';

const S = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: colors.dark,
  },
});

const MyItems = ({
  loading,
  offerReceived,
  imageCroppedItems,
  priceReductionItems,
  soldItems,
  refusedItems,
  unreceivedItems,
  forSaleItems
}) => {

  let NegotiationContainer = ({item, ...props}) => <NegotiationPreview 
    id={id} 
    onPress={() => NavigationService.navigateToNegotiations({...item})}
    {...props}
    />
  console.log('forSaleItems',forSaleItems.length)
  console.log('soldItems',soldItems.length)
  console.log('offerReceived',offerReceived.length)
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeader title="My items" />
      {loading 
        ? (<Loader containerStyle={{padding: 15}}/>)
        :
      <ScrollView>
        <ListItem title="Items for sale" titleStyle={{opacity: 0.5, fontSize: 12, textTransform: 'uppercase'}} containerStyle={{paddingTop: 25}} bottomDivider/>
        {!_.isEmpty(offerReceived) && (<ListItem title="Offers received" 
          chevron
          bottomDivider
          onPress={() => NavigationService.navigateToList({
            Component: (props) => <NegotiationPreview 
                    {...props} 
                    onPress={(item) => NavigationService.navigateToNegotiations({...item})}
                    />,
            items : offerReceived,
            title: "Offers received",

          })}
          />)}
        <ListItem 
          title={`My items for sale (${forSaleItems.length})`} 
          chevron 
          bottomDivider
          onPress={() => NavigationService.navigateToGrid({
            items : forSaleItems,
            title: "My items for sale"
          })}
          />
        
        {(!_.isEmpty(priceReductionItems) 
          || _.isEmpty(imageCroppedItems)) 
          && (<ListItem title="Items in progress" 
              titleStyle={{opacity: 0.5, fontSize: 12, textTransform: 'uppercase'}} 
              containerStyle={{paddingTop: 25}} 
              bottomDivider/>)}
        {!_.isEmpty(imageCroppedItems) && (<ListItem 
          title="Photos currently being cropped" 
          chevron 
          bottomDivider
          onPress={() => NavigationService.navigateToGrid({
            items : imageCroppedItems,
            title: "Photos currently being cropped"
          })}
          />)}
        {!_.isEmpty(priceReductionItems) && (<ListItem 
          title={`Price reduction (${priceReductionItems.length})`}
          chevron 
          bottomDivider
          onPress={() => NavigationService.navigateToList({
            Component :  PriceReductionProductCard,
            items : priceReductionItems,
            title: "Price reduction"
          })}
          />)
        }

        <ListItem 
          title="Historical" 
          titleStyle={{opacity: 0.5, fontSize: 12, textTransform: 'uppercase'}} 
          containerStyle={{paddingTop: 25}} 
          bottomDivider
          />
        {!_.isEmpty(soldItems) && (<ListItem 
            title={`Sold items (${soldItems.length})`}
            chevron 
            bottomDivider
            onPress={() => NavigationService.navigateToList({
              Component :  SoldCard,
              items : soldItems,
              title: "Sold items"
            })}
          />)}
        {!_.isEmpty(refusedItems) && (<ListItem 
          title={`Refused items (${refusedItems.length})`}
          chevron 
          bottomDivider
          onPress={() => NavigationService.navigateToGrid({
            items : refusedItems,
            title: "Refused items"
          })}
          />)}
        {!_.isEmpty(unreceivedItems) && (<ListItem 
          title="Unreceived items" 
          chevron 
          bottomDivider
          onPress={() => NavigationService.navigateToGrid({
            items : unreceivedItems,
            title: "Unreceived items"
          })}
          />)}     
      </ScrollView> }
      {/* <BackHeader title="My Items"/>
      <GridList loading={loading} LoadingComponent={Loading} items={items} /> */}
    </View>
  );
};

export default MyItems;
