import algoliasearch from 'algoliasearch/reactnative';
import config from '../../config';

const searchClient = algoliasearch(
    config.ALGOLIA_APP_ID,
    config.ALGOLIA_SEARCH_ID
)

export {
    searchClient
}