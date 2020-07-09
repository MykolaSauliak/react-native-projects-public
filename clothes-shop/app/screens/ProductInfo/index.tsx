import ProductInfoView from './ProductInfoView';
import {
  compose,
  withProps,
  withHandlers,
  withState,
  lifecycle,
} from 'recompose';
import screens from '../../constants/screens';
import {
  withCart,
  withWishlist,
  withFavorite,
  withHistory,
  withFollowing,
  withAuth,
  withLastUpdate,
  withComments,
} from '../../utils/enhancers';
import {ShopService, NavigationService} from '../../services';
import constants from '../../constants';
import listnames from '../../constants/listnames';
import { withLists } from '../../features/lists';
// import _ from 'lodash'

const enhance = compose(
  withLists({listName: listnames.clothes}),
  withWishlist(),
  withHistory(),
  withFollowing(),
  withAuth(),
  // withComments(),
  // withLastUpdate(),
  withFavorite({listName: constants.clothes}),
  withState('loading', 'setLoading', false),
  withState('lastUpdate', 'setLastUpdate', null),
  withState('userId', 'setUserId', null),
  // withState('item', 'setItem', {}),
  withState('sellerInfo', 'setSellerInfo', {}),
  withState('imageModalVisible', 'setImageModalVisible', false),
  withState('imageIndex', 'setImageIndex', 0),
  withProps(({currentListItem, navigation}) => ({
    // produc
    id: navigation.getParam('id', ''),
    item: currentListItem,
    // item : JSON.parse(props.navigation.getParam('item','') || '{}'),
    // id : props.navigation.getParam('id',''),
    // image : props.navigation.getParam('image',''),
    // id : props.navigation.getParam('id',''),
    // warranty : props.navigation.getParam('warranty',''),
    // specs : JSON.parse(props.navigation.getParam('specs','') || '[]') || [],
    // similar_parts : JSON.parse(props.navigation.getParam('similar_parts','') || '[]') || [],
    // title : props.navigation.getParam('title',''),
    // description : props.navigation.getParam('description',''),
    // discount : props.navigation.getParam('discount',''),
    // discountEnd : props.navigation.getParam('discountEnd',''),
    // // discountEndTs : props.navigation.getParam('discountEndTs',''),
    // price : props.navigation.getParam('price',null),
    // instock : props.navigation.getParam('instock',true),
    // universal : props.navigation.getParam('universal',true),
  })),
  withHandlers({
    onPress: props => item => {
      // props.navigation.navigate(screens.ProductInfo, {id : item.id})
    },
    onProductPress: props => item => {
      props.navigation.push(screens.ProductInfo, {id: item.id});
    },
    toNegotiation: ({sellerInfo, item}) => () => {
      NavigationService.navigateToNegotiations({
        item: {
          ...item,
          // image: item.images ? item.images[0] : '',
          seller: {user_id: item.user_id}, // if sellerIndfo is null (?)
        },
        sellerUser: sellerInfo
      });
    },
  }),
  lifecycle({
    async componentDidMount() {
      console.log('componentd did mount', this.props.id);
      if (this.props.id) {
        // if(!_.findKey(this.props.item, { id : 1})){
        this.props.setLoading(true);
        const item = await ShopService.getGood(this.props.id);
        // console.log('fetched item',Object.keys(item))
        if (item) {
          // this.props.setItem(item);
          // console.log('fetched item', Object.keys(item));
          this.props.setCurrentListItem({listName: listnames.clothes, item})
        }

        if (this.props.addToHistory) {
          this.props.addToHistory(item);
        }

        const user = await ShopService.getUser(this.props.item.user_id);
        if (user) {
          this.props.setSellerInfo(user);
          console.log('fetched use', Object.keys(user));
        }

        this.props.setLoading(false);
      }
    },
    async componentDidUpdate(prevProps, prevState) {
      // let prevItem = this.props.getCurrentListItem({listName: listnames.clothes}) || {}
      if (prevProps.item?.user_id != this.props.item?.user_id) {
        // console.log('fetch item ...')
        this.props.setLoading(true);
        try {
          const user = await ShopService.getUser(this.props.item.user_id);
          if (user) {
            this.props.setSellerInfo(user);
          }
        } catch (err) {
          console.log('ERROR DURING FETCH USER', err);
        }
        this.props.setLoading(false);
        this.props.addToHistory(this.props.item);
      }
      if (prevProps.id != this.props.id) {
        console.log('fech new product')
        // if(!_.findKey(this.props.item, { id : 1})){
        this.props.setLoading(true);
        const item = await ShopService.getGood(this.props.id);
        console.log('fetched item',Object.keys(item))
        if (item) {
          // this.props.setItem(item);
          this.props.setCurrentListItem({listName: listnames.clothes, item})
          if (this.props.addToHistory) {
            this.props.addToHistory(item);
          }
        }

        const user = await ShopService.getUser(this.props.item.user_id);
        if (user) {
          this.props.setSellerInfo(user);
          console.log('fetched use', Object.keys(user));
        }

        this.props.setLoading(false);
      }
    },
  }),
);

export default enhance(ProductInfoView);
