import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import {getLoading} from '../../features/settings/selectors';
// import { setLoading } from '../../features/settings/actions';

const withReduxLoading = options => BaseComponent => props => {
  //   const dispatch = useDispatch();
  let [lastUpdate, setLastUpdate] = React.useState(Date.now());
  //   let loading = useSelector(state => getLoading(state));
  return (
    <BaseComponent
      {...props}
      lastUpdate={lastUpdate}
      setLastUpdate={updateTs => setLastUpdate(updateTs)}
    />
  );
};

export default withReduxLoading;
