import React from 'react';
import { 
    compose,
    withProps
} from "recompose";
import { View,Text } from "react-native";
import CommentCard from "../../components/Comments/CommentCard";
import { NavigationService  } from "../../services";
import { 
    withAuth,
    withComments
 } from '../../utils/enhancers';

type Props = {
    id: string,
    snippet: any,
    likeComment: (id: string, listname: string) => void,
    unlikeComment: (id: string, listname: string) => void,
}

const CommentCardContainer = ({
    id,
    likeComment,
    unlikeComment,
    snippet,
    loggedInUser,
    user,
    likes = [],
    dislikes = [],
    fromSeller,
    ...props
} : Props) => {
    // console.log('loggedInUser',loggedInUser)
    // console.log('user',user)
    // console.log('snippet',snippet)
    return (
        <CommentCard 
            {...props}
            id={id}
            fromSeller={fromSeller}
            user={user}
            snippet={snippet}
            likes={likes}
            dislikes={dislikes}
            likeActive={likes.includes(loggedInUser.uid)}
            dislikeActive={dislikes.includes(loggedInUser.uid)}
            onAvatarPress={() => NavigationService.navigateToCustomUserProfile({user_id : user.uid || snippet.authorId})}
            onLikePress={() => likeComment(id,snippet.productId,)}
            onDislikePress={() => unlikeComment(id,snippet.productId,)}
            />
    );
};

const enhance = compose(
    withAuth(),
    withComments(),
)

    export default enhance(CommentCardContainer);