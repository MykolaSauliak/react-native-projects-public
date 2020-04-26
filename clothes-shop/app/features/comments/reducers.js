import createReducer from '../../utils/createReducer';
import types from './types';

const initialState = {
  comments: {
    defaults: [],
  },
};

export default createReducer(initialState, {
  /// funct recieve state and action
  [types.setComments]: (
    state,
    {payload: {listName, comments, lastUpdate = Date.now()}},
  ) => {
    let localComments = state.comments;
    localComments[listName] = [...comments];
    return {...state, comments: localComments, lastUpdate};
  },
  [types.addComment]: (
    state,
    {payload: {listName, item, lastUpdate = Date.now()}},
  ) => {
    let comments = state.comments;
    if (!comments[listName]) {
      comments[listName] = [];
    }
    comments[listName] = [
      item,
      ...comments[listName].filter(i => i.id != item.id),
    ];
    return {...state, comments, lastUpdate};
  },
  [types.likeComment]: (
    state,
    {payload: {listName, id, user_id, lastUpdate = Date.now()}},
  ) => {
    let comments = state.comments;
    if (!comments[listName]) {
      comments[listName] = [];
    }
    comments[listName] = comments[listName].map(c => {
      if (c.id == id) {
        if (!c.likes) {
          c.likes = [];
        }
        if (!c.dislikes) {
          c.dislikes = [];
        }
        c.likes = [user_id, ...c.likes.filter(item => item != user_id)];
        c.dislikes = [...c.likes.filter(item => item != user_id)];
        console.log('new commnt ', c);
      }
      return c;
    });
    return {...state, comments, lastUpdate};
  },
  [types.unlikeComment]: (
    state,
    {payload: {listName, id, user_id, lastUpdate = Date.now()}},
  ) => {
    console.log('unlikeComment user_id', user_id);
    console.log('unlikeComment id', id);
    let comments = state.comments;
    if (!comments[listName]) {
      comments[listName] = [];
    }
    comments[listName] = comments[listName].map(c => {
      console.log('c', c.id);
      if (c.id == id) {
        if (!c.likes) {
          c.likes = [];
        }
        if (!c.dislikes) {
          c.dislikes = [];
        }
        c.likes = [...c.likes.filter(item => item != user_id)];
        c.dislikes = [user_id, ...c.dislikes.filter(item => item != user_id)];
        console.log('new comemnt', c);
      }
      return c;
    });
    console.log('unlikeComment comments', comments);
    return {...state, comments, lastUpdate};
  },
});

export {initialState};
