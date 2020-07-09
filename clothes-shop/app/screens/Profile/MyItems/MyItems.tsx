import React from 'react';
import {View, ImageBackground, StyleSheet, FlatList, ScrollView} from 'react-native';
// import globalStyles from '../../styles';
import colors from '../../../styles/colors';
import GridList from '../../../containers/GridList'
import {BackHeader, BackHeaderCenter, PreviewRowCard, ListItem} from "../../../components";
import Loading from "../../../components/Loading";
import _ from 'lodash'
import {NavigationService} from '../../../services'
import ProductCard from '../../../containers/ProductCard';
import SoldCard from '../../../components/SoldCard';
import PriceReductionProductCard from '../../../containers/PriceReductionProductCard';
import { Loader } from '../../../components';
import NegotiationPreview from '../../../components/Negotiations/NegotiationPreview';
import SellerProduct from '../../../components/SellerProduct/SellerProduct';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import constants from '../../../constants';
import listnames from '../../../constants/listnames';
import {  Text} from '../../../components';
import { itemWidth } from '../../../containers/FirestoreSlider';
import {withListCount} from '../../../features/lists'
import globalStyles from '../../../styles'
import { widthPercentageToDP } from 'react-native-responsive-screen';

const S = StyleSheet.create({
  sectionTitle: {
    ...globalStyles.title,
    opacity: 0.5, 
    fontSize: widthPercentageToDP(4),
    textTransform: 'uppercase'
  },
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
  forSaleItems,
  getListCount
}) => {

  let NegotiationContainer = ({item, ...props}) => <NegotiationPreview 
    id={id} 
    onPress={() => NavigationService.navigateToNegotiations({...item})}
    {...props}
    />
  const forSaleItemsCount = getListCount({listName: listnames.myitemsforsales})
  // console.log('forSaleItems',forSaleItems.length)
  // console.log('soldItems',soldItems)
  // console.log('offerReceived',offerReceived)
  return (
    <View style={{flex: 1, backgroundColor: colors.gray}}>
      <BackHeaderCenter title="My items" />
      {loading 
        ? (<Loader containerStyle={{padding: 15}}/>)
        :
      <ScrollView>
        <ListItem 
          title="Items for sale" 
          titleStyle={S.sectionTitle} 
          containerStyle={{paddingTop: 25}} 
          bottomDivider
          />
        {!_.isEmpty(offerReceived) && (<ListItem 
          titleStyle={[globalStyles.title, globalStyles.leftListItemSmall]}
          title={`Offers received (${offerReceived.length})`} 
          chevron
          bottomDivider
          onPress={() => NavigationService.navigateToList({
            Component: ({id, product_id, ...props}) => (<PreviewRowCard 
            {...props} 
            onPress={() => NavigationService.navigateToNegotiations({id, product_id})}
            />),
            // Component: (props) => <NegotiationPreview 
            //         {...props} 
            //         onPress={(item) => NavigationService.navigateToNegotiations({...item})}
            //         />,
            items : offerReceived,
            title: "Offers received",
          })}
          />)}
        {forSaleItemsCount > 0 && (<ListItem 
          title={`My items for sale (${forSaleItemsCount})`} 
          titleStyle={[globalStyles.title, globalStyles.leftListItemSmall]}
          chevron 
          bottomDivider
          onPress={() => NavigationService.navigateToList({
            // items : forSaleItems,
            listName: listnames.myitemsforsales,
            Component: SellerProduct,
            headerProps: { rightComponent : () => <TouchableOpacity onPress={() =>  NavigationService.navigateToNegotiationOptions({goBack : () => NavigationService.navigateToList({listName: listnames.myitemsforsales})})}>
            <Ionicons name="ios-settings" size={25} color={colors.orange} />
          </TouchableOpacity> },
            title: "My items for sale"
          })}
          />
        )}
        
        {(!_.isEmpty(priceReductionItems) 
          || !_.isEmpty(imageCroppedItems)) 
          && (<ListItem title="Items in progress" 
              titleStyle={S.sectionTitle} 
              containerStyle={{paddingTop: 25}} 
              bottomDivider/>)}
        {!_.isEmpty(imageCroppedItems) && (<ListItem 
          title={`Photos currently being cropped (${imageCroppedItems.length})`}
          chevron 
          bottomDivider 
          onPress={() => NavigationService.navigateToGrid({
            items : imageCroppedItems,
            title: "Photos currently being cropped"
          })}
          />)}
        {withListCount( listnames.priceReduction)(({count = 0, ...props}) => {
          console.log('count',count)
          if(count == 0){
            return null
          }
        return <ListItem 
          title={`Price reduction (${count})`}
          titleStyle={[globalStyles.title, globalStyles.leftListItemSmall]}
          chevron 
          bottomDivider
          onPress={() => NavigationService.navigateToList({
            Component :  PriceReductionProductCard,
            // items : priceReductionItems,
            listName: listnames.priceReduction,
            title: "Price reduction"
          })}
        />})}
        {(!_.isEmpty(refusedItems) || !_.isEmpty(unreceivedItems) || !_.isEmpty(soldItems)) && (<ListItem 
          title="Historical" 
          titleStyle={S.sectionTitle} 
          containerStyle={{paddingTop: 25}} 
          bottomDivider
          />)}
        {!_.isEmpty(soldItems) && (<ListItem 
            title={`Sold items (${soldItems.length})`}
            titleStyle={[globalStyles.title, globalStyles.leftListItemSmall]}
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
          titleStyle={[globalStyles.title, globalStyles.leftListItemSmall]}
          chevron 
          bottomDivider
          onPress={() => NavigationService.navigateToGrid({
            items : refusedItems,
            title: "Refused items",
            listProps: {disabled: true, onPress: () => {}}
          })}
          />)}
        {!_.isEmpty(unreceivedItems) && (<ListItem 
          title={`Unreceived items (${unreceivedItems.length})`}
          titleStyle={[globalStyles.title, globalStyles.leftListItemSmall]}
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
