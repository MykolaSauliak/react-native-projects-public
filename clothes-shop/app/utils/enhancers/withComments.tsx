import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    getComments,
    getLastUpdate,
    getAllComments,
} from '../../features/comments/selectors';
import {
  addComment,
  likeComment,
  unlikeComment,
  setComments,
} from '../../features/comments/actions';
import {Comment} from '../../types/Comment.type'

const withComments = (listName?:string) => BaseComponent => props => {
  const dispatch = useDispatch();
  let comments = useSelector(state => getComments(listName,state)) || [];
  let lastUpdate = useSelector(state => getLastUpdate(state)) || [];
  let allComments = useSelector(state => getAllComments(state)) || {};

  // console.log('cartItems',cartItems.length)
  return (
    <BaseComponent
      {...props}
      comments={comments}
      lastUpdate={lastUpdate}
      setComments={(listname = listName, items) : {items: Comment[], listname: string} => dispatch(setComments(listname,items))}
      getComments={(listname = listName) : {listname: string} => listname ? allComments[listname] : []}
      addComment={({
        text,
        listName,
        productId,
        parentId,
      }:{
        listName: string,
        text: string,
        productId: string,
        parentId: string,
      }) => dispatch(addComment({
        listName,
        text, 
        productId,
        parentId
      }))}
      likeComment={(item, listname = listName) : {item:string, listname: string} => dispatch(likeComment(listname,item))}
      unlikeComment={(item, listname = listName) : {item:string, listname: string} => dispatch(unlikeComment(listname,item))}

    />
  );
};

export default withComments;
