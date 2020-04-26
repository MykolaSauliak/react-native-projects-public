import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  cancel,
} from 'redux-saga/effects';
import {pureActions} from './actions';
import {getCartitems} from './selectors';
import types from './types';
import ShopService from '../../services/ShopService';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateCart() {
  try {
    let cartItems = yield select(getCartitems);
    cartItems = cartItems.filter(c => c && c.id);
    if (cartItems.length == 0) {
      yield cancel();
    }
    yield put(pureActions.setCartLoading(true));
    const products = yield call(ShopService.getGoodsById, cartItems);
    yield put(pureActions.setCartLoading(false));
    yield put(pureActions.setCartItems(products));
  } catch (e) {
    yield put(pureActions.setCartLoading(true));
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
// */
// function* mySaga() {
//   yield takeEvery("updateCart", updateCart);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest(types.updateCart, updateCart);
}

export default mySaga;
