import * as R from 'ramda';

export const getUser = state => R.path(['user', 'user'], state);
export const getEmail = state => R.path(['user', 'email'], state);
export const getPhone = state => R.path(['user', 'phone'], state);
export const isLoggedIn = state => {
  const user = R.path(['user', 'user'], state);
  console.log('user in selector ', user);
  if (user != null) {
    return true;
  } else {
    return false;
  }
};
