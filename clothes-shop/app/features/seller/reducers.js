import createReducer from '../../utils/createReducer';
import types from './types';
import _ from 'lodash'

const initialState = {
  user: {},
  email: null,
  draftLastUpdate: null,
  phone: null,
  drafts: [
    /**
     *
     */
  ],
  seller: {
    /**
     * shipping_country,
     * mobile number,
     * personal_info : {
     *    title,
     *    last_name
     * }
     * payments : {
     * bank_contry,
     * currency
     * }
     */
  },
  sellProduct: {
    // id :
    // selectedSellProduct: null /// {}
    // selectedSellCategory : null,
    // selectedSellSubcategory : null,
    // selectedSellType : null,
    // selectedSellSubtype : null,
    // selectedSellBrand : null,
    // selectedSellMaterial : null,
    // selectedSellColor : null,
    // selectedSellPrinted : null,
    // selectedSellPhotos: [],
    // selectedSellDescription: [],
    // selectedSellMeasurement: {
    //   "height" : 0,
    //   "width" : 0,
    //   "thickness" : 0,
    // },
    // selectedSellCondition: null,
    // selectedSellPrice: null,
    // imageFirst : null,
    // imageSecond : null,
    // imageThird : null,
    // imageFourth : null,
    // imageFifth : null,
    // images : [],
  },

  // isLoggedIn : false,
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.setUser]: (state, {payload}) => {
    return {...state, user: payload};
  },
  [types.setEmail]: (state, {payload}) => {
    return {...state, email: payload};
  },
  [types.setSellProperty]: (state, {payload : {key, value}}) => {
    let sellProduct = state.sellProduct;
    let drafts = state.drafts;

    sellProduct[key] = value;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i][key] = value;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSellerProperty]: (state, {payload : {key, value}}) => {
    let seller = state.seller
    seller[key] =  value
    return {...state, seller, draftLastUpdate: Date.now()};
  },
  [types.setPhone]: (state, {payload}) => {
    return {...state, phone: payload, };
  },
  [types.setSelectedSellCategory]: (state, {payload}) => {
    // console.log('setSelectedSellCategory',payload)
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellCategory = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellCategory = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSellSubcategory]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellSubcategory = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellCategory = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSellType]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellType = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellType = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSellSubtype]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellSubtype = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellSubtype = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSellBrand]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellBrand = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellBrand = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },

  [types.setSelectedSellMaterial]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellMaterial = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellMaterial = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSellColor]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellColor = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellColor = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSellPrinted]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellPrinted = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellPrinted = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },

  [types.setSelectedSellPhotos]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellPhotos = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellPhotos = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },

  [types.setSelectedSell1Photo]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.imageFirst = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        console.log('');
        drafts[i].imageFirst = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSell2Photo]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.imageSecond = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].imageSecond = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSell3Photo]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.imageThird = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].imageThird = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSell4Photo]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.imageFourth = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].imageFourth = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSell5Photo]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.imageFifth = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].imageFifth = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.addToOtherSellPhotos]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.images = [...sellProduct.images, payload];
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].images = [...drafts[i].images, payload];
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.removeFromOtherSellPhtos]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.images = [
      ...sellProduct.images.filter(i => i.id != payload.id),
    ];
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].images = [
          ...drafts[i].images.filter(i => i.id != payload.id),
        ];
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },

  [types.setSelectedSellDescription]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellDescription = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellDescription = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSellMeasurements]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellMeasurements = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellMeasurements = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },

  [types.setSelectedSellCondition]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellCondition = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellCondition = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSelectedSellPrice]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.selectedSellPrice = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].selectedSellPrice = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSellVintage]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.vintage = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
        if (d.id == sellProduct.id) {
          drafts[i].vintage = payload;
        }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSellSoldWith]: (state, {payload: {key, value}}) => {
    let sellProduct = state.sellProduct;
    if(_.isEmpty(sellProduct.soldWith)){
      sellProduct.soldWith = {}
    }
    console.log('sellProduct.soldWith',sellProduct.soldWith)
    sellProduct.soldWith[key] = value;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        if(_.isEmpty(drafts[i].soldWith)){
          drafts[i].soldWith = {}
        }
        drafts[i].soldWith[key] = value;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setShippingCountry]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.shipping_country = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].shipping_country = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },
  [types.setShippingCountryCode]: (state, {payload}) => {
    let sellProduct = state.sellProduct;
    sellProduct.shipping_country_code = payload;
    let drafts = state.drafts;
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].shipping_country_code = payload;
      }
    });
    return {...state, sellProduct, drafts, draftLastUpdate: Date.now()};
  },

  [types.setSeller]: (state, {payload}) => {
    let drafts = state.drafts;
    let sellProduct = state.sellProduct;
    drafts.forEach((d, i) => {
      if (!drafts[i].seller) {
        drafts[i].seller = payload;
      }
    });
    drafts.forEach((d, i) => {
      if (d.id == sellProduct.id) {
        drafts[i].seller = payload;
      }
    });
    return {...state, seller: payload, drafts, draftLastUpdate: Date.now()};
  },
  [types.setSellProduct]: (state, {payload}) => {
    // console.log('reducet setSellProduct',payload)
    return {...state, sellProduct: payload};
  },
  [types.removeFromDrafts]: (state, {payload}) => {
    return {
      ...state,
      drafts: [...state.drafts.filter(d => d.id && d.id != payload)],
    };
  },
  [types.removeDrafts]: (state, {payload: id}) => {
    return {...state, drafts: []};
  },
  [types.addDraft]: (state, {payload}) => {
    return {...state, drafts: [...state.drafts, payload]};
  },
  // [types.setSelectedSellCategory]: (state, { payload }) => {
  //   return {...state, selectedSellCategory : payload}
  // },
  // [types.setSelectedSellSubcategory]: (state, { payload }) => {
  //   return {...state, selectedSellSubcategory : payload}
  // },
  // [types.setSelectedSellType]: (state, { payload }) => {
  //   return {...state, selectedSellType : payload}
  // },
  // [types.setSelectedSellSubtype]: (state, { payload }) => {
  //   return {...state, selectedSellSubtype : payload}
  // },
  // [types.setSelectedSellBrand]: (state, { payload }) => {
  //   return {...state, selectedSellBrand : payload}
  // },

  // [types.setSelectedSellMaterial]: (state, { payload }) => {
  //   return {...state, selectedSellMaterial : payload}
  // },
  // [types.setSelectedSellColor]: (state, { payload }) => {
  //   return {...state, selectedSellColor : payload}
  // },
  // [types.setSelectedSellPrinted]: (state, { payload }) => {
  //   return {...state, selectedSellPrinted : payload}
  // },

  // [types.setSelectedSellPhotos]: (state, { payload }) => {
  //   return {...state, selectedSellPhotos : payload}
  // },

  // [types.setSelectedSell1Photo]: (state, { payload }) => {
  //   return {...state, imageFirst : payload}
  // },
  // [types.setSelectedSell2Photo]: (state, { payload }) => {
  //   return {...state, imageSecond : payload}
  // },
  // [types.setSelectedSell3Photo]: (state, { payload }) => {
  //   return {...state, imageThird : payload}
  // },
  // [types.setSelectedSell4Photo]: (state, { payload }) => {
  //   return {...state, imageFourth : payload}
  // },
  // [types.setSelectedSell5Photo]: (state, { payload }) => {
  //   return {...state, imageFifth : payload}
  // },
  // [types.addToOtherSellPhotos]: (state, { payload }) => {
  //   return {...state, images : [...state.images, payload]}
  // },
  // [types.removeFromOtherSellPhtos]: (state, { payload }) => {
  //   return {...state, images : [...state.images.filter(i => i.id != payload.id)]}
  // },

  // [types.setSelectedSellDescription]: (state, { payload }) => {
  //   return {...state, selectedSellDescription : payload}
  // },
  // [types.setSelectedSellMeasurements]: (state, { payload }) => {
  //   return {...state, selectedSellMeasurement : payload}
  // },

  // [types.setSelectedSellCondition]: (state, { payload }) => {
  //   return {...state, selectedSellCondition : payload}
  // },
  // [types.setSelectedSellPrice]: (state, { payload }) => {
  //   return {...state, selectedSellPrice : payload}
  // },

  // [types.setSeller]: (state, { payload }) => {
  //   return {...state, seller : payload}
  // },
  // [types.addDraft]: (state, { payload }) => {
  //   return {...state, drafts : [...state.drafts,payload]}
  // },

  // [types.removeFromDrafts]: (state, { payload : id}) => {
  //   return {...state, drafts : [...state.drafts.filter( d => d.id != id)] }
  // },

  // [types.removeDrafts]: (state, { payload : id}) => {
  //   return {...state, drafts : [] }
  // },
});
