import {
    compose,
    withProps
} from 'recompose'
import RemoveFromSold from './RemoveFromSold'
import { withLists } from '../../../features/lists'

const enhance = compose(
    withLists(),
    withProps(({navigation}) => ({
        product: navigation.getParam('product', {})
    }))
)

export default enhance(RemoveFromSold)