import reducer, {initialState} from './reducers';
import types from './types';

describe('comment section', () => {
  it('should add new comment', () => {
    const stateBefore = {
      comments: {
        defaults: [],
      },
    };

    const newComment = {
      id: 'testid',
      snippet: {
        displayText: 'new clothes',
      },
      likes: [],
    };

    const lastUpdate = Date.now();
    const action = {
      type: types.addComment,
      payload: {listName: 'clothes', item: newComment, lastUpdate},
    };

    expect(reducer(stateBefore, action)).toEqual({
      ...stateBefore,
      comments: {
        ...stateBefore.comments,
        clothes: [newComment],
      },
      lastUpdate,
    });
  });

  it('should add new like for comment', () => {
    const loggedInUser = {
      uid: 'testUserId',
    };
    const existedComment = {
      id: 'testId',
      snippet: {
        // some data
      },
      likes: [],
    };

    const stateBefore = {
      comments: {
        defaults: [],
        clothes: [existedComment],
      },
    };

    const lastUpdate = Date.now();

    const action = {
      type: types.likeComment,
      payload: {
        listName: 'clothes',
        id: existedComment.id,
        user_id: loggedInUser.uid,
        lastUpdate,
      },
    };

    expect(reducer(stateBefore, action)).toEqual({
      ...stateBefore,
      comments: {
        ...stateBefore.comments,
        clothes: [
          {
            ...existedComment,
            likes: [loggedInUser.uid],
          },
        ],
      },
      lastUpdate,
    });
  });

  it('should remove like from comment', () => {
    const loggedInUser = {
      uid: 'testUserId',
    };
    const existedComment = {
      id: 'testId',
      snippet: {
        // some data
      },
      likes: [loggedInUser.uid],
    };

    const stateBefore = {
      comments: {
        defaults: [],
        clothes: [existedComment],
      },
    };

    const lastUpdate = Date.now();

    const action = {
      type: types.unlikeComment,
      payload: {
        listName: 'clothes',
        id: existedComment.id,
        user_id: loggedInUser.uid,
        lastUpdate,
      },
    };

    expect(reducer(stateBefore, action)).toEqual({
      ...stateBefore,
      comments: {
        ...stateBefore.comments,
        clothes: [
          {
            ...existedComment,
            likes: [],
          },
        ],
      },
      lastUpdate,
    });
  });
});
