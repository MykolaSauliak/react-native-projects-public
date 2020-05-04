import {Dimensions} from 'react-native';
import * as options from './options';
import * as countries from './countries';

export default {
  authentication_fees: 9.99,

  LIST: 'LIST',
  TABLE: 'TABLE',
  ONE_DAY_MILISECONDS: 86400000,

  clothes: 'clothes',
  /** tags ids */
  WE_LOVE_TAG: 'fi5lSQlsw7ZQ6HTFgspJ',

  priceCoef: 0.85,

  neverWornWithTag: 'Never worn, with tag',
  neverWorn: 'Never worn',
  perfectCondition: 'Perfect condition',
  goodCondition: 'Good condition',
  fairCondition: 'Fair condition',

  DEVICE_WIDTH: Dimensions.get('window').width,
  DEVICE_HEIGHT: Dimensions.get('window').height,

  TEST_IMAGE: require('../assets/test.png'),
  DEFAULT_AVATAR: 'http://placehold.it/200x200?text=1',

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

  clothes_fields: {
    category_id: 'sold',
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
    status_field : {
      image_cropped:  "image_cropped"
    },
  },

  negotiations_field: {
    seller_id : 'seller_id',
    user_id : 'user_id',
    answered : 'answered',
  },


  publishedAtFormat: 'DD MMMM YYYY',
  updatedAtFormat: 'DD MMMM YYYY',
};

export {default as categories} from './categories';

export {options, countries};

export {default as dayOfWeek} from './dayOfWeek';

export {transitionStatuses} from './transitionStatuses';
