import React, {useState} from 'react';

const withStateLoading = options => BaseComponent => props => {
  let [loading, setLoading] = useState(false);
  return (
    <BaseComponent
      {...props}
      loading={loading}
      setLoading={item => setLoading(item)}
    />
  );
};

export default withStateLoading;
