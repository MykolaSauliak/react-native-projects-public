import {
    compose,
    withProps
} from 'recompose'
import PriceReduction from './PriceReduction'
import { withLists } from '../../../features/lists'

const enhance = compose(
    withLists(),
    withProps(({navigation}) => ({
        product: navigation.getParam('product', {})
    }))
)

export default enhance(PriceReduction)