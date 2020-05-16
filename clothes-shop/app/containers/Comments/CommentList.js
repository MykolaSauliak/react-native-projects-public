import React from 'react';
import {View, Text} from 'react-native';
import CommentList from '../../components/Comments/CommentList';
import {withComments} from '../../utils/enhancers';

type Props = {
  id: string,
  getComments: () => void,
  addComment: () => void,
};

const CommentListContainer = ({
  getComments,
  addComment,
  lastUpdate,
  id,
  ...props
}: Props) => {
  let comments = getComments(id);
  // comments = comments.filter(c => c.user && c.user.name)
  // comments =  comments || []
  // console.log('comments',comments)
  // console.log('id',id)
  // console.log('lastUpdate',lastUpdate)
  return (
    <CommentList
      {...props}
      key={lastUpdate}
      lastUpdate={lastUpdate}
      comments={comments}
      onCommentLeft={text => {
        addComment({
          text,
          listName: id,
          productId: id,
          parentId: '',
        });
      }}
    />
  );
};

export default withComments()(CommentListContainer);
