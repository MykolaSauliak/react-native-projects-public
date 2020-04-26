import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getFollowing, isUserFollowed} from '../../features/following/selectors';
import {
  addToFollowing,
  removeFromFollowing,
} from '../../features/following/actions';

const withFollowing = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let following = useSelector(state => getFollowing(state)) || [];
  console.log('following', following);
  return (
    <BaseComponent
      {...props}
      following={following}
      isUserFollowed={({item, user_id}) =>
        isUserFollowed({following, item, user_id})
      }
      addToFollowing={item => dispatch(addToFollowing(item))}
      removeFromFollowing={item => dispatch(removeFromFollowing(item))}
    />
  );
};

export default withFollowing;
