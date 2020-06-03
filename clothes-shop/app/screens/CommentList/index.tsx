import {compose,withProps, withState, withHandlers, lifecycle} from 'recompose';
import CommentList from './CommentList';
import {withAddresses, withComments} from '../../utils/enhancers';

const enhance = compose(
  withComments(),
  withProps(({navigation}) => ({
    id: navigation.getParam('id',''),
    seller_id: navigation.getParam('seller_id',''),
    }
  ))
);

export default enhance(CommentList);
