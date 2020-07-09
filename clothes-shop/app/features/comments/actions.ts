import types from './types';
import { ShopService } from '../../services';
import { Comment } from '../../types/Comment.type';


export const setComments = (listName : string, comments : Comment[]) => dispatch  => {
  // console.log('addToFavorites', item);
  // console.log('addToFavorites', listName);
    dispatch({
      type: types.setComments,
      payload: {
        listName,
        comments,
      },
    });
};


export const addComment = ({
  listName,
  text,
  productId,
  parentId = ""
} : {
  listName: string,
    text: string,
    productId: string,
    parentId: string,
  }
  ) => dispatch  => {
  // console.log('addToFavorites', item);
  // console.log('addToFavorites', listName);
  ShopService
    .postComment(text, productId, parentId)
    .then(({successfull, item}) => {
      if(successfull){
        // console.log('add new comment ',listName,response)
        dispatch({
          type: types.addComment,
          payload: {
            listName,
            item,
          },
        });
      }
    })
};

export const likeComment = (listName : string, id : string) => dispatch => {
  // console.log('addToFavorites', item);
  console.log('likeComment', listName, id);
  ShopService
  .likeComment(id)
  .then(({successfull, user_id}) => {
    if(successfull){
      // console.log('like comment response,')
      dispatch({
          type: types.likeComment,
          payload: {
            listName,
            id,
            user_id
          },
      });
    }
  })
  .catch(err => {
    
  })
};


export const unlikeComment = (listName: string, id :string) => dispatch => {

  
  ShopService
  .unlikeComment(id)
  .then( response => {
      console.log('response',response)
    // if(response){
      dispatch({
          type: types.unlikeComment,
          payload: {
            listName,
            id,
            user_id : response.user_id
          },
      });
    // }
  })

};
