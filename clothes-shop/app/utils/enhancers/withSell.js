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
  getSelectedSellPrice,
  getSeller,
  getDrafts,
  getDraftsLastUpdate,
} from '../../features/seller/selectors';

const withSell = options => BaseComponent => props => {
  const dispatch = useDispatch();
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
  let seller = useSelector(state => getSeller(state));
  let draftLastUpdate = useSelector(state => getDraftsLastUpdate(state));
  // console.log('brand',brand)
  return (
    <BaseComponent
      {...props}
      drafts={drafts}
      draftLastUpdate={draftLastUpdate}
      selectedSellProduct={selectedSellProduct}
      sellProduct={sellProduct}
      subtype={subtype}
      type={type}
      brand={brand}
      material={material}
      category={category}
      subcategory={subcategory}
      color={color}
      printed={printed}
      photo1={photo1}
      photo2={photo2}
      photo3={photo3}
      photo4={photo4}
      photo5={photo5}
      description={description}
      measurements={measurements}
      condition={condition}
      price={price}
      seller={seller}
      setSelectedSellCategory={item => dispatch(setSelectedSellCategory(item))}
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
      addDraft={item => dispatch(addDraft(item))}
      removeFromDrafts={item => dispatch(removeFromDrafts(item))}
      removeDrafts={() => dispatch(removeDrafts())}
      setSellProduct={item => dispatch(setSellProduct(item))}
    />
  );
};

export default withSell;
