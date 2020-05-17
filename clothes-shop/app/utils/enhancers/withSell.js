import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setSellProduct,
  setSelectedSellCategory,
  setSelectedSellSubcategory,
  setSelectedSellType,
  setSelectedSellSubtype,
  setSelectedSellBrand,
  setSelectedSellMaterial,
  setSelectedSellColor,
  setSelectedSellPrinted,
  setSelectedSellPhotos,
  setSelectedSell1Photo,
  setSelectedSell2Photo,
  setSelectedSell3Photo,
  setSelectedSell4Photo,
  setSelectedSell5Photo,
  setSelectedSellDescription,
  setSelectedSellMeasurements,
  setSelectedSellCondition,
  setSelectedSellPrice,
  setSeller,
  addDraft,
  removeFromDrafts,
  removeDrafts,
  setShippingCountry,
  setShippingCountryCode,
  setSellVintage,
  setSellSoldWith,
  setSellProperty,
} from '../../features/seller/actions';
import {
  getSelectedSellProduct,
  getSelectedSellCategory,
  getSelectedSellSubcategory,
  getSelectedSellType,
  getSelectedSellSubtype,
  getSelectedSellBrand,
  getSelectedSellMaterial,
  getSelectedSellColor,
  getSelectedSellPrinted,
  getSelectedSellPhotos,
  getSelectedSell1Photo,
  getSelectedSell2Photo,
  getSelectedSell3Photo,
  getSelectedSell4Photo,
  getSelectedSell5Photo,
  getSelectedSellOtherPhotos,
  getSelectedSellDescription,
  getSelectedSellMeasurements,
  getSelectedSellCondition,
  getSelectedSellShippingCountry,
  getSelectedSellShippingCountryCode,
  getSelectedSellPrice,
  getSelectedSellVintage,
  getSelectedSellSoldWith,
  getSeller,
  getDrafts,
  getDraftsLastUpdate,
} from '../../features/seller/selectors';
import constants from '../../constants';

const withSell = (options = {}) => BaseComponent => props => {
  const dispatch = useDispatch();
  // console.log('brand',brand)
  let properties = {
  }

  if(options.pick && Array.isArray(options.pick)){
    options.pick.forEach( key => {
      switch(key){
        case constants.selectedSellProduct:
          properties[constants.selectedSellProduct] =  useSelector(state => getSelectedSellProduct(state)) || {};
          break
        case constants.sellProduct:
          properties[constants.sellProduct] = useSelector(state => getSelectedSellProduct(state)) || {};
          break
        case constants.drafts:
          properties[constants.drafts] = useSelector(state => getDrafts(state)) || {};
          break
        case constants.subtype:
          properties[constants.subtype] =  useSelector(state => getSelectedSellSubtype(state));
          break
        case constants.type:
          properties[constants.type] =  useSelector(state => getSelectedSellType(state));
          break
        case constants.brand:
          properties[constants.brand] =  useSelector(state => getSelectedSellBrand(state));
          break
        case constants.material:
          properties[constants.material] =  useSelector(state => getSelectedSellMaterial(state));
          break
        case constants.category:
          properties[constants.category] =  useSelector(state => getSelectedSellCategory(state));
          break
        case constants.subcategory:
          properties[constants.subcategory] =  useSelector(state => getSelectedSellSubcategory(state));
          break
        case constants.color:
          properties[constants.color] =  useSelector(state => getSelectedSellColor(state));
          break
        case constants.printed:
          properties[constants.printed] =  useSelector(state => getSelectedSellPrinted(state));
          break
        case constants.photo1:
          properties[constants.photo1] =  useSelector(state => getSelectedSellPhoto1(state));
          break
        case constants.photo2:
          properties[constants.photo2] =  useSelector(state => getSelectedSellPhoto2(state));
          break
        case constants.photo3:
          properties[constants.photo3] =  useSelector(state => getSelectedSellPhoto3(state));
          break
        case constants.photo4:
          properties[constants.photo4] =  useSelector(state => getSelectedSellPhoto4(state));
          break
        case constants.photo5:
          properties[constants.photo5] =  useSelector(state => getSelectedSellPhoto5(state));
          break
        case constants.description:
          properties[constants.description] =  useSelector(state => getSelectedSellDescription(state));
          break
        case constants.measurements:
          properties[constants.measurements] =  useSelector(state => getSelectedSellMeasurements(state));
          break
        case constants.condition:
          properties[constants.condition] =  useSelector(state => getSelectedSellCondition(state));
          break
        case constants.price:
          properties[constants.price] =  useSelector(state => getSelectedSelPrice(state));
          break
        case constants.vintage:
          properties[constants.vintage] =  useSelector(state => getSelectedSellVintage(state));
          break
        case constants.soldWith:
          properties[constants.soldWith] =  useSelector(state => getSelectedSellSoldWith(state));
          break
        case constants.shipping_country:
          properties[constants.shipping_country] =  useSelector(state => getSelectedSellShippingCountry(state));
          break
        case constants.shipping_country_code:
          properties[constants.shipping_country_code] =  useSelector(state => getSelectedSellShippingCountryCode(state));
          break
      }
    })
  }else{
    let drafts = useSelector(state => getDrafts(state)) || {};
    let selectedSellProduct =
      useSelector(state => getSelectedSellProduct(state)) || {};
    let sellProduct = useSelector(state => getSelectedSellProduct(state)) || {};
    let subtype = useSelector(state => getSelectedSellSubtype(state));
    let type = useSelector(state => getSelectedSellType(state));
    let brand = useSelector(state => getSelectedSellBrand(state));
    let material = useSelector(state => getSelectedSellMaterial(state));
    let category = useSelector(state => getSelectedSellCategory(state));
    let subcategory = useSelector(state => getSelectedSellSubcategory(state));
    let color = useSelector(state => getSelectedSellColor(state));
    let printed = useSelector(state => getSelectedSellPrinted(state));
    let photo1 = useSelector(state => getSelectedSell1Photo(state));
    let photo2 = useSelector(state => getSelectedSell2Photo(state));
    let photo3 = useSelector(state => getSelectedSell3Photo(state));
    let photo4 = useSelector(state => getSelectedSell4Photo(state));
    let photo5 = useSelector(state => getSelectedSell5Photo(state));
    let description = useSelector(state => getSelectedSellDescription(state));
    let measurements = useSelector(state => getSelectedSellMeasurements(state));
    let condition = useSelector(state => getSelectedSellCondition(state));
    let price = useSelector(state => getSelectedSellPrice(state));
    let vintage = useSelector(state => getSelectedSellVintage(state));
    let soldWith = useSelector(state => getSelectedSellSoldWith(state));
    let seller = useSelector(state => getSeller(state));
    // let draftLastUpdate = useSelector(state => getDraftsLastUpdate(state));
    properties.drafts = drafts
    properties.selectedSellProduct = selectedSellProduct
    properties.sellProduct = sellProduct
    properties.subtype = subtype
    properties.type = type
    properties.brand = brand
    properties.material = material
    properties.category = category
    properties.subcategory = subcategory
    properties.color = color
    properties.printed = printed
    properties.photo1 = photo1
    properties.photo2 = photo2
    properties.photo3 = photo3
    properties.photo3 = photo3
    properties.photo4 = photo4
    properties.photo5 = photo5
    properties.description = description
    properties.measurements = measurements
    properties.condition = condition
    properties.price = price
    properties.condition = condition
    properties.vintage = vintage
    properties.soldWith = soldWith
    properties.seller = seller
    // properties.draftLastUpdate = draftLastUpdate
  }

  return (
    <BaseComponent
      {...props}
      {...properties}
      draftLastUpdate={useSelector(state => getDraftsLastUpdate(state))}
      // drafts={drafts}
      // draftLastUpdate={draftLastUpdate}
      // selectedSellProduct={selectedSellProduct}
      // sellProduct={sellProduct}
      // subtype={subtype}
      // type={type}
      // brand={brand}
      // material={material}
      // category={category}
      // subcategory={subcategory}
      // color={color}
      // printed={printed}
      // photo1={photo1}
      // photo2={photo2}
      // photo3={photo3}
      // photo4={photo4}
      // photo5={photo5}
      // description={description}
      // measurements={measurements}
      // condition={condition}
      // vintage={vintage}
      // soldWith={soldWith}
      // price={price}
      // seller={seller}
      setSelectedSellCategory={item => dispatch(setSelectedSellCategory(item))}
      setSellProperty={(key,value) => dispatch(setSellProperty(key, value))}
      setSelectedSellCategory={item => dispatch(set(item))}
      setSelectedSellSubcategory={item =>
        dispatch(setSelectedSellSubcategory(item))
      }
      setSelectedSellType={item => dispatch(setSelectedSellType(item))}
      setSelectedSellSubtype={item => dispatch(setSelectedSellSubtype(item))}
      setSelectedSellBrand={item => dispatch(setSelectedSellBrand(item))}
      setSelectedSellMaterial={item => dispatch(setSelectedSellMaterial(item))}
      setSelectedSellColor={item => dispatch(setSelectedSellColor(item))}
      setSelectedSellPrinted={item => dispatch(setSelectedSellPrinted(item))}
      setSelectedSellPhotos={item => dispatch(setSelectedSellPhotos(item))}
      setSelectedSell1Photo={item => dispatch(setSelectedSell1Photo(item))}
      setSelectedSell2Photo={item => dispatch(setSelectedSell2Photo(item))}
      setSelectedSell3Photo={item => dispatch(setSelectedSell3Photo(item))}
      setSelectedSell4Photo={item => dispatch(setSelectedSell4Photo(item))}
      setSelectedSell5Photo={item => dispatch(setSelectedSell5Photo(item))}
      setSelectedSellDescription={item =>
        dispatch(setSelectedSellDescription(item))
      }
      setSelectedSellMeasurements={item =>
        dispatch(setSelectedSellMeasurements(item))
      }
      setSelectedSellCondition={item =>
        dispatch(setSelectedSellCondition(item))
      }
      setSelectedSellPrice={item => dispatch(setSelectedSellPrice(item))}
      setSeller={item => dispatch(setSeller(item))}
      setShippingCountry={item => dispatch(setShippingCountry(item))}
      setShippingCountryCode={item => dispatch(setShippingCountryCode(item))}
      addDraft={item => dispatch(addDraft(item))}
      removeFromDrafts={item => dispatch(removeFromDrafts(item))}
      removeDrafts={() => dispatch(removeDrafts())}
      setSellProduct={item => dispatch(setSellProduct(item))}
      setSellVintage={item => dispatch(setSellVintage(item))}
      setSellSoldWith={(key, value) => dispatch(setSellSoldWith(key, value))}
      // setSellCardCertificate={item => dispatch(setSellCardCertificate(item))}
      // setSellDustbag={item => dispatch(setSellDustbag(item))}
      // setSellOriginalBox={item => dispatch(setSellOriginalBox(item))}
    />
  );
};

export default withSell;
