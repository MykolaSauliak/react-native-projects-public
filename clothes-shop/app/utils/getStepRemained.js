import _ from 'lodash'

export default function(draft) {
  let steps = 5;
  if (informationComplete(draft) == true) {
    console.log('informationComplete')
    steps -= 1;
  }
  if (photosComplete(draft) == true) {
    console.log('photosComplete')
    steps -= 1;
  }
  if (descriptionComplete(draft) == true) {
    console.log('descriptionComplete')
    steps -= 1;
  }
  if (conditionComplete(draft) == true) {
    console.log('conditionComplete')
    steps -= 1;
  }
  if (sellerComplete(draft) == true) {
    console.log('sellerComplete')
    steps -= 1;
  }
  return steps;
}

const informationComplete = obj => {
  const {
    selectedSellSubcategory: subcategory,
    selectedSellMaterial: material,
    selectedSellColor: color,
    selectedSellPrinted: printed,
  } = obj;
  return (
    // subcategory != null && 
    material != null && 
    color != null && 
    printed != null
  );
};

const photosComplete = obj => {
  const {imageFirst, imageSecond, imageThird, imageFourth, imageFifth} = obj;
  return (
    imageFirst != null &&
    imageSecond != null &&
    imageThird != null &&
    imageFourth != null &&
    imageFifth != null &&
    imageFirst.path != null &&
    imageSecond.path != null &&
    imageThird.path != null &&
    imageFourth.path != null &&
    imageFifth.path != null
  );
};

const descriptionComplete = obj => {
  const {
    selectedSellDescription: description,
    selectedSellMeasurements: measurements,
  } = obj;
  return (
    description != null &&
    description.length > 0 &&
    measurements != null &&
    measurements.unit != null &&
    measurements.width != null &&
    measurements.height != null
  );
};

const conditionComplete = obj => {
  const {selectedSellPrice: price} = obj;
  return price != null && price.price != null && price.currency != null;
};

// const sellerComplete = obj => {
//   const {seller, shipping_country} = obj;
//   console.log('shipping_country',shipping_country)
//   return (
//     seller != null &&
//     seller.personal_contact_information != null &&
//     seller.phone != null &&
//     shipping_country != null
//   );
// };

const sellerComplete = (obj) => {
  const {seller, shipping_country} = obj;
  console.log(shipping_country, seller)
  return (
    seller != null &&
    !_.isEmpty(seller.personal_contact_information) &&
    // seller.phone != null &&
    shipping_country != null
  );
};