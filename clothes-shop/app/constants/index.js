import {Dimensions} from 'react-native';
import * as options from './options';
import * as countries from './countries';

export default {
  authentication_fees: 9.99,
  photo_quality: 0.8,

  newin: "newin",
  holidaymode: "holidaymode",
  LIST: 'LIST',
  TABLE: 'TABLE',
  ONE_DAY_MILISECONDS: 86400000,
  TWO_DAYS_MILISECONDS: 172800000,
  negotiation_price_min_coef: 0.75,

  clothes: 'clothes',
  /** tags ids */
  WE_LOVE_TAG: 'fi5lSQlsw7ZQ6HTFgspJ',

  priceCoef: 0.87,

  neverWornWithTag: 'Never worn, with tag',
  neverWorn: 'Never worn',
  perfectCondition: 'Perfect condition',
  goodCondition: 'Good condition',
  fairCondition: 'Fair condition',

  DEVICE_WIDTH: Dimensions.get('window').width,
  DEVICE_HEIGHT: Dimensions.get('window').height,

  TEST_IMAGE: require('../assets/test.png'),
  // defaultImage: require('../assets/images/defaultImage.png'),
  defaultImage: require('../assets/images/icon.png'),
  DEFAULT_AVATAR: 'http://placehold.it/200x200?text=1',
  defaultAvatar: require('../assets/images/avatar-placeholder-300x300.png'),
  ///https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01-300x250.png
  DEFAULT_UPLOAD_IMAGE: 'http://placehold.it/200x200?text=+',

  PAYPAL_LOGO: require('../assets/images/paypal_logo.png'),
  VISA_LOGO: require('../assets/images/visa_logo.png'),
  WARANTLY_ICON:require('../assets/images/waranty_icon.jpg'),
  GOOGLE_PAY: require('../assets/images/google_pay.jpg'),

  MONEY_SYMBOL: 'USD',
  SORT_BY_ALPHABET: 'SORT_BY_ALPHABET',

  category_id: 'sold',
  sold: 'sold',
  created_time: 'created_time',
  express_delivery: 'express_delivery',
  we_love: 'we_love',
  trusted_seller: 'trusted_seller',
  vintage: 'vintage',
  expert_seller: 'expert_seller',
  cardcertificate : 'cardcertificate',
  originalbox : 'originalbox',
  dustbag : 'dustbag',

  selectedSellProduct: 'selectedSellProduct',
  sellProduct: 'sellProduct',
  drafts: "drafts",
  subtype: "subtype",
  type: "type",
  brand: "brand",
  material: "material",
  category: "category",
  subcategory: "subcategory",
  color: "color",
  printed: "printed",
  photo1: "photo1",
  photo2: "photo2",
  photo3: "photo3",
  photo4: "photo4",
  photo5: "photo5",
  description: "description",
  measurements: "measurements",
  condition: "condition",
  price: "price",
  soldWith: "soldWith",
  seller: "seller",
  shipping_country: "shipping_country",
  shipping_country_code: "shipping_country_code",
  draftLastUpdate: "draftLastUpdate",
  
  vintage: "vintage",
  serialNumber: "serialNumber",
  origin: "origin",
  proofOfOrigin: "proofOfOrigin",
  packaging: "packaging",

  compressImageMaxHeight: 1000,
  compressImageMaxWidth: 1000,
  phone: "phone",
  phoneCode: "phoneCode",
  phoneCountry: "phoneCountry",

  clothes_fields: {
    category_id: 'category_id',
    created_time: 'created_time',
    express_delivery: 'express_delivery',
    we_love: 'we_love',
    vintage: 'vintage',
    reputation: 'reputation',
    user_id: 'user_id',
    // sold: 'sold',
    sale_status: "sale_status",
    status : 'status',
    // isApproved: 'isApproved',
    seller: {
      seller: "seller",
      personal_contact_information: "personal_contact_information",
    },
    status_field : {
      image_cropped:  "image_cropped",
      user_dismiss:  "user_dismiss",
      approved:  "approved",
      sold:  "sold",
    },
    sale_status_fields: {
      'none':"none",
      'sold':"sold",
      'shipping': "shipping",
      'delivery' : "delivery",
      'authentication' : "authentication",
      'payment' : "payment",
    },
  },

  negotiations_field: {
    seller_id : 'seller_id',
    user_id : 'user_id',
    answered : 'answered',
  },

  withAuthentication: "withAuthentication",
  withoutAuthentication: "withoutAuthentication",
  
  rowHeight: 65,
  publishedAtFormat: 'DD MMMM YYYY',
  updatedAtFormat: 'DD MMMM YYYY',
};

export {default as categories} from './categories';

export {options, countries};

export {default as dayOfWeek} from './dayOfWeek';

export {transitionStatuses} from './transitionStatuses';
