import reducer from './reducers';
import types from './types';

describe('test search history', () => {
  it('should add to last search item', () => {
    const initialState = {
      searchLoading: false,
      searchState: {},
      currentSearchItem: {},
      lastsearch: {},
      lastUpdate: null,
    };

    const listname = 'clothes';
    const newSearchItem = {
      id: 'newItemsId',
      searchState: {
        query: 'test text',
      },
    };

    const newAction = {
      type: types.addToLastSearch,
      payload: {
        listname,
        item: newSearchItem,
      },
    };

    expect(reducer(initialState, newAction)).toEqual({
      ...initialState,
      lastsearch: {
        [listname]: [newSearchItem],
      },
      currentSearchItem: newSearchItem,
    });
  });

  it('should update current search item', () => {
    const initialSearchItem = {
      id: 'newItemsId',
      searchState: {
        query: 'test text',
      },
    };

    const listname = 'clothes';

    const initialState = {
      searchLoading: false,
      searchState: {},
      currentSearchItem: initialSearchItem,
      lastsearch: {
        [listname]: [initialSearchItem],
      },
      lastUpdate: null,
    };

    const update = {
      searchState: {
        refinementList: {
          brand_name: ['test brand'],
        },
      },
    };

    const newAction = {
      type: types.updateSearchItem,
      payload: {
        listname,
        id: initialSearchItem.id,
        update,
      },
    };

    expect(reducer(initialState, newAction)).toEqual({
      ...initialState,
      lastsearch: {
        [listname]: [
          {
            ...initialSearchItem,
            searchState: {
              ...initialSearchItem.searchState,
              ...update,
            },
          },
        ],
      },
      currentSearchItem: {
        ...initialSearchItem,
        searchState: {
          ...initialSearchItem.searchState,
          ...update,
        },
      },
    });
  });
});
