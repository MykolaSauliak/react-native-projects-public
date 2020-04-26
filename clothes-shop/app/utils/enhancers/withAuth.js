import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../features/user/selectors';
import {updateUser} from '../../features/user/actions';

const withAuth = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let user = useSelector(state => getUser(state)) || [];
  // console.log('user', user);
  return (
    <BaseComponent
      {...props}
      isSignedIn={user && (user.uid || user.email) ? true : false}
      updateUser={update => dispatch(updateUser(update))}
      // user={options?.select?.user ? user : null}
      loggedInUser={user}
    />
  );
};

export default withAuth;
