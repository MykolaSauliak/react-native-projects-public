import UserProfileView from './UserProfileView';
import {
  compose,
  withProps,
  withHandlers,
  withState,
  lifecycle,
  withStateHandlers,
} from 'recompose';
import {withFollowing} from '../../utils/enhancers';
import {ShopService} from '../../services';

const enhance = compose(
  withFollowing(),
  withState('loading', 'setLoading', false),
  withState('user', 'setUser', {}),
  // withStateHandlers(
  //     ({  loading = false}) => ({
  //         loading: loading,
  //     }),
  //     {
  //     setLoading: (props) => (loading) => ({
  //         loading : loading
  //     }),
  //     }
  // ),
  // withStateHandlers(
  //     ({ initialUser = {} }) => ({
  //         user: initialUser,
  //     }),
  //     {
  //         setUser: (props) => (user) => ({
  //             user : user
  //         }),
  //     }
  // ),
  withProps(props => ({
    user_id: props.navigation.getParam('user_id', ''),
  })),
  withState('checked', 'setChecked', false),
  withState('locale', 'setLocale', null),
  withState('userWishlist', 'setUserWishlist', []),
  withState('userItemsForSale', 'setUserItemsForSale', []),
  withState('userFavorites', 'setUserFavorites', []),
  withState('userFollowing', 'setUserFollowing', []),
  withState('userFollowers', 'setUserFollowers', []),
  withState('soldCount', 'setSoldCount', 0),
  lifecycle({
    async componentDidMount() {
      console.log('did mount');
      let user_id = this.props.navigation.getParam('user_id', '');
      // console.log('user_id', user_id);
      if (user_id) {
        try {
          this.props.setLoading(true);
          let user = await ShopService.getUser(user_id);
          console.log('user', user);
          if (user) {
            this.props.setUser(user);
          }
          let userWishlist = await ShopService.fetchWishlist(user_id);
          this.props.setUserWishlist(userWishlist);
          let userItemForSale = await ShopService.fetchItemsForSale(user_id);
          this.props.setUserItemsForSale(userItemForSale);
          let soldCount = await ShopService.fetchSoldCount(user_id);
          this.props.setSoldCount(soldCount);

          let userFavorites = await ShopService.fetchFavorites(user_id);
          this.props.setUserFavorites(userFavorites);
          let userFollowing = await ShopService.fetchFollowing(user_id);
          this.props.setUserFollowing(userFollowing);
          let userFollowers = await ShopService.fetchFollowedBy(user_id);
          this.props.setUserFollowers(userFollowers);
        } catch (err) {
          console.log('ERROR DURING', err);
        }
        this.props.setLoading(false);
      }
    },
    async componentDidUpdate(prevProps, prevState) {
      console.log('did mount');
      let user_id = this.props.navigation.getParam('user_id', '');
      // console.log('user_id', user_id);
      if (prevProps.user_id != user_id && user_id) {
        try {
          this.props.setLoading(true);
          let user = await ShopService.getUser(user_id);
          console.log('user', user);
          if (user) {
            this.props.setUser(user);
          }

          let userWishlist = await ShopService.fetchWishlist(user_id);
          this.props.setUserWishlist(userWishlist);
          let userItemForSale = await ShopService.fetchItemsForSale(user_id);
          this.props.setUserItemsForSale(userItemForSale);
          let userFavorites = await ShopService.fetchFavorites(user_id);
          this.props.setUserFavorites(userFavorites);
          let userFollowing = await ShopService.fetchFollowing(user_id);
          this.props.setUserFollowing(userFollowing);
          let userFollowers = await ShopService.fetchFollowedBy(user_id);
          this.props.setUserFollowers(userFollowers);
        } catch (err) {
          console.log('ERROR DURING', err);
        }
        this.props.setLoading(false);
      }
    },
  }),
);

export default enhance(UserProfileView);
