import {withStateHandlers} from 'recompose';

const withLoading = () =>
  withStateHandlers(
    ({loading = false}) => ({
      loading: loading,
    }),
    {
      setLoading: ({loading}) => value => ({
        loading: value,
      }),
    },
  );

export default withLoading;
