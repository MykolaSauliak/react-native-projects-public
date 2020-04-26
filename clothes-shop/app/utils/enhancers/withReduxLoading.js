import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLoading} from '../../features/settings/selectors';
import {setLoading} from '../../features/settings/actions';

const withReduxLoading = options => BaseComponent => props => {
  const dispatch = useDispatch();
  let loading = useSelector(state => getLoading(state));
  return (
    <BaseComponent
      {...props}
      loading={loading}
      setLoading={item => dispatch(setLoading(item))}
    />
  );
};

export default withReduxLoading;
