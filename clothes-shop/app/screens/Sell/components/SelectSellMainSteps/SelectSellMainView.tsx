import React from 'react';
import {
  View,
  FlatList,
  SectionList,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SearchBar, Header, Button} from 'react-native-elements';
import colors from '../../../../styles/colors';
import convertForSectionList from '../../../../utils/convertForSectionList';
import i18n from '../../../../i18n';
import getStepRemained from '../../../../utils/getStepRemained';
import {ShopService, NavigationService} from '../../../../services';
import { BackHeaderCenter, ListItem } from '../../../../components';
import _ from 'lodash'
import {  Text} from '../../../../components';
import constants from '../../../../constants';
import globalStyles from '../../../../styles';
import { ScrollView } from 'react-native-gesture-handler';

const S = StyleSheet.create({
  number: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // padding:,
    borderColor: colors.orange,
    borderWidth: 1,
    // margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

const SelectSellMainView = ({
  selectedSellProduct,
  // types,
  material,
  category,
  subtype,
  type,
  brand,
  subcategory,
  color,
  printed,

  otherPhotos,
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,

  description,
  measurements,
  shipping_country,

  condition,
  price,

  vintage,
  serialNumber,
  origin,
  proofOfOrigin,
  soldWith,

  seller,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  goToInformationSelect,
  goToPhotosSelect,
  goToDescriptionSelect,
  goToConditionSelect,
  goToSellerSelect,
  goToOptionalSelect,

  setSellProduct,
  removeFromDrafts,
  drafts,
}) => {
  // const filteredCars = cars.filter(c => c.carmake == selectedCarMake.title && c.model == selectedModel.title)
  // const types = filteredCars.map(c => ({type: c.engine_type || '', title : c.type, car_id : c.id }))
  // const DATA = convertForSectionList(types, 'type')
  // //console.log('DATA',DATA)
  // let stepsRemained = 5
  // console.log('brand',brand)
  // console.log('type',type)
  // console.log('subcategory',subcategory)
  // console.log('material',material)
  // console.log('color',color)
  // console.log('printed',printed)
  // console.log('selectedSellProduct', selectedSellProduct);
  // console.log('category', category);

  const complete = () => {
    return (
      informationComplete() &&
      photosComplete() &&
      descriptionComplete() &&
      conditionComplete() &&
      sellerComplete()
    );
  };

  const informationComplete = () => {
    return (
      // subcategory != null &&
      material != null &&
      color != null &&
      printed != null
    );
  };

  const photosComplete = () => {
    return (
      photo1 != null &&
      photo2 != null &&
      photo3 != null &&
      photo4 != null &&
      photo5 != null &&
      photo1.path != null &&
      photo2.path != null &&
      photo3.path != null &&
      photo4.path != null &&
      photo5.path != null
    );
  };

  const descriptionComplete = () => {
    return (
      description != null &&
      description.length > 0 &&
      measurements != null &&
      measurements.unit != null &&
      measurements.width != null &&
      measurements.height != null
    );
  };

  const conditionComplete = () => {
    return price != null && price.price != null && price.currency != null;
  };

  const sellerComplete = () => {
    return (
      seller != null &&
      !_.isEmpty(seller.personal_contact_information) &&
      // seller.phone != null &&
      shipping_country != null
    );
  };

  const handleSubmit = async () => {
    //     // console.log('category',category)
    //     // console.log('subcategory',subcategory)
    //     const newProduct = {
    //         material,
    //         brand,
    //         type_id : type ? type.id : type,
    //         subtype_id : subtype ? subtype.id : subtype,
    //         category_id : category ? category.id : category,
    //         subcategory_id: subcategory ? subcategory.id : subcategory,
    //         color,
    //         printed,
    //         photos,
    //         photo1,
    //         photo2,
    //         photo3,
    //         photo4,
    //         photo5,
    //         description,
    //         measurements,
    //         condition,
    //         price : price.price,
    //         currency: price.currency,
    //         seller,
    //     }

    const successful = await ShopService.createProduct({
      material,
      category_name: category
        ? category.title
        : selectedSellProduct
        ? selectedSellProduct.category.title
        : category,
      category_id: category ? category.id : category,
      brand_id: brand
        ? brand.id
        : selectedSellProduct
        ? selectedSellProduct.brand.id
        : brand,
      brand_name: brand
        ? brand.title
        : selectedSellProduct
        ? selectedSellProduct.brand.title
        : brand,
      type_id: type ? type.id : type,
      type_name: type ? type.title : type,
      subtype_id: subtype ? subtype.id : subtype,
      subtype_name: subtype ? subtype.title : subtype,
      subcategory_id: subcategory ? subcategory.id : subcategory,
      color,
      printed,

      otherPhotos,
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,

      description,
      measurements,

      condition,
      price: price.price,
      currency: price.currency,
      we_love: false,
      express_delivery: false,

      seller,
      shipping_country,

      vintage,
      soldWith,
      serialNumber,
      origin,
      proofOfOrigin,

    });
    if (successful) {
      NavigationService.navigateToDrafts();
      setSellProduct({})
      removeFromDrafts(selectedSellProduct.id)
    }
  };
  // console.log('complete',complete())
  console.log('seller.personal_contact_information', seller.personal_contact_information);
  return (
    <>
    <ScrollView 
      //   style={{flex:1}}
      // // style={{height: constants.DEVICE_HEIGHT - 100, }} 
        alwaysBounceVertical
        contentContainerStyle={{backgroundColor: colors.gray,paddingBottom: 75}}
        >
      {/* <View style={{}}> */}
        <BackHeaderCenter
          title={`${getStepRemained({
            ...selectedSellProduct,
            seller,
          })} Step(s) remained`}
          goBack={() => NavigationService.navigateToDrafts()}
        />
        {/* <ListItem containerStyle={{backgroundColor: colors.lightGray}} disabled /> */}
        {/* <View style={{flex:1}}> */}
        <View style={{marginVertical: 20}}>
          <Text xxmediumSize bold center>{brand.title}</Text>
          <Text xxmediumSize center capitalize>{`${category.title} ${type.title}`}</Text>
        </View>
        <ListItem
          titleMedium
          containerStyle={{backgroundColor: 'white'}}
          leftElement={
            !informationComplete() ? (
              <View style={S.number}>
                <Text xmediumSize style={{color: colors.orange}}>1</Text>
              </View>
            ) : (
              // <View style={S.number}>
                <AntDesign name="checkcircle" size={30} color={colors.orange}/>
              // {/* // </View> */}
            )
          }
          title="Information"
          titleStyle={globalStyles.mediumText}
          bottomDivider
          onPress={() => goToInformationSelect()}
          chevron
        />
        <ListItem
          titleMedium
          leftElement={
            !photosComplete() ? (
              <View style={S.number}>
                <Text xmediumSize style={{color: colors.orange}}>2</Text>
              </View>
            ) : (
              // <View style={S.number}>
                <AntDesign name="checkcircle" size={30} color={colors.orange}/>
              // </View>
            )
          }
          title="Photos"
          bottomDivider
          onPress={goToPhotosSelect}
          chevron
        />
        <ListItem
          titleMedium
          leftElement={
            !descriptionComplete() ? (
              <View style={S.number}>
                <Text xmediumSize style={{color: colors.orange}}>3</Text>
              </View>
            ) : (
              // <View style={{}}>
                <AntDesign name="checkcircle" size={30} color={colors.orange}/>
              // </View>
            )
          }
          title="Description"
          bottomDivider
          onPress={goToDescriptionSelect}
          chevron
        />
        <ListItem
          titleMedium
          leftElement={
            !conditionComplete() ? (
              <View style={S.number}>
                <Text xmediumSize style={{color: colors.orange}}>4</Text>
              </View>
            ) : (
              // <View style={S.number}>
                <AntDesign name="checkcircle" size={30} color={colors.orange}/>
              // </View>
            )
          }
          title="Condition & price"
          bottomDivider
          onPress={goToConditionSelect}
          chevron
        />
        <ListItem
          titleMedium
          leftElement={
            !sellerComplete() ? (
              <View style={S.number}>
                <Text xmediumSize style={{color: colors.orange}}>5</Text>
              </View>
            ) : (
              // <View style={S.number}>
                <AntDesign name="checkcircle" size={30} color={colors.orange}/>
              // </View>
            )
          }
          title="Seller"
          onPress={goToSellerSelect}
          chevron
        />
        <ListItem
          containerStyle={{backgroundColor: colors.lightGray}}
          disabled
        />
        <ListItem
          titleMedium
          title={"Optional information"}
          chevron
          onPress={() => NavigationService.navigateToSellProductOptionalSelect()}
        />
        {/* <ListItem
                  // leftElement={<View>
                  //         <Text style={S.number}></Text>
                  //     </View>}
                  title="Optional information"
                  onPress={goToOptionalSelect}
                  /> */}
    {/* </View> */}
      {/* </View> */}
    </ScrollView>
    <Button
      containerStyle={{
        padding: 5,
        marginHorizontal: 10,
        height: 50,
        width: '95%',
        position: 'absolute',
        bottom: 5,
      }}
      onPress={handleSubmit}
      title="confirm"
      disabled={complete() === true ? false : true}
      buttonStyle={{
        backgroundColor: colors.orange,
      }}
    />
    </>
  );
};

SelectSellMainView.defaultProps = {
  goBack: () => NavigationService.navigateToDrafts(),
  goToInformationSelect: () =>
    NavigationService.navigateToSellProductInformationSelect(),
  goToPhotosSelect: () => NavigationService.navigateToSellProductPhotoSelect(),
  goToDescriptionSelect: () =>
    NavigationService.navigateToSellProductDescriptionSelect(),
  goToConditionSelect: () =>
    NavigationService.navigateToSellProductConditionSelect(),
  goToSellerSelect: () => NavigationService.navigateToSellerSelect(),
  goToOptionalSelect: () =>
    NavigationService.navigateToSellProductOptionalSelect(),
};

export default SelectSellMainView;
