import React, { memo } from 'react';
import T from 'prop-types';
import { 
    View, 
    Image,
} from "react-native";
import { Container, 
    Header, 
    Content, 
    Card, 
    CardItem, 
    Thumbnail, 
    Button, 
    Left, 
    Body, 
    Right,
    Icon,
    Text
} from 'native-base';
import {
    // Card,
    Icon as IconElement,
    ListItem
} from 'react-native-elements'
import { Rating, AirbnbRating } from 'react-native-ratings';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ErrorBoundary from '../ErrorBoundary'
import colors from '../../styles/colors';
import constants from '../../constants';
import { User } from '../types/types';
import _ from 'lodash';

type Props = {
    id: string,
    user : User,
    snippet : any,
    containerStyle : any,
    cardProps : any,
    onAvatarPress: () => void,
    onLikePress: () => void,
    onDislikePress: () => void,
    stars : number,
    likes : string[],
    dislikes : string[],
    dislikeActive : boolean,
    likeActive : boolean,
}

const CommentCard= ({
    user : {
        uid,
        name = "",
        last_name = "",
        avatar
    },
    snippet : {
        publishedAt = "",
        textDisplay,
        ...snippetProps
    },
    onAvatarPress,
    onLikePress,
    onDislikePress,
    stars,
    likes = [],
    dislikes= [],
    containerStyle,
    cardProps,
    dislikeActive,
    likeActive,
    ...otherProps
}: Props) => {
    console.log('textDisplay',textDisplay)
    // console.log('snippet',snippet)
    // console.log('textDisplay',textDisplay)
    if(typeof publishedAt != 'string' || _.isEmpty(publishedAt)){
        publishedAt = ""
    }
    console.log('publishedAt',publishedAt)
    console.log('last_name',last_name)
    console.log('name',name)
    // console.log('likes',likes)
    // console.log('otherProps',otherProps)
    return (
        // <Card {...cardProps} containerStyle={[containerStyle]}>
        //     <View style={[{flex:1, aspectRatio: 1.5/1, borderColor:'black',borderWidth: 1,padding:10,margin: 5},containerStyle]}>
        //         <ListItem 
        //             leftAvatar={{source: {uri: avatar}}}
        //             title={name + ' ' + last_name}
        //             subtitle={publishedAt}
        //             />
        //         <View style={{flexGrow:1,}}>
        //             <Text>
        //                 {textDisplay}
        //             </Text>
        //         </View>

        //         <View style={{flexDirection:"row",}}>
        //             <TouchableOpacity style={{paddingHorizontal: 10, flexDirection:'row'}} onPress={onLikePress}>
        //                 <IconElement name={likeActive ? "like1" : "like2"} type="antdesign" />
        //                 <Text>{likes ? likes.length : 0}</Text>
        //             </TouchableOpacity>
        //                 <TouchableOpacity style={{paddingHorizontal: 10, flexDirection:'row'}} onPress={onDislikePress}>
        //                     <IconElement name={dislikeActive ? "dislike1" : "dislike2"} type="antdesign" />
        //                     <Text>{dislikes ? dislikes.length : 0}</Text>
        //             </TouchableOpacity>
        //         </View>
        //         {/* <View style={{marginVertical: 15, flex:0.6}}>
        //             <Text>{'sdf'}</Text>
        //         </View>
        //         <View style={{flex:0.2,flexDirection:"row",}}>
        //             <TouchableOpacity style={{paddingHorizontal: 10, flexDirection:'row'}} onPress={onLikePress}>
        //                 <IconElement name="like2" type="antdesign" />
        //                 <Text>{likes ? likes.length : 0}</Text>
        //         </TouchableOpacity>
        //             <TouchableOpacity style={{paddingHorizontal: 10, flexDirection:'row'}} onPress={onDislikePress}>
        //                 <IconElement name="dislike2" type="antdesign" />
        //                 <Text>{dislikes ? dislikes.length : 0}</Text>
        //         </TouchableOpacity>
        //         </View> */}
        //     </View>
        // </Card>
        // <Container>
        //     <Content>
        <ErrorBoundary>   
            <Card {...cardProps} style={[containerStyle]}>
                <CardItem>
                    <Left>
                        <TouchableOpacity onPress={() => onAvatarPress(uid)}>
                            <Thumbnail source={{uri: avatar}} />
                        </TouchableOpacity>   
                            <Body style={{paddingHorizontal: 5}}>
                                {/* <Body> */}
                                <View style={{flexDirection:'row'}}>
                                    <Text>{`${name}`}</Text>
                                    <Text>{`${last_name}`}</Text>
                                </View>
                                <Text>{`${publishedAt}`}</Text>
                                {/* </Body> */}
                            </Body>
                    </Left>
                    
                    {
                        stars > 0 && (
                            <Right>
                                <Rating
                                    ratingCount={7}
                                    // reviews={[]}
                                    startingValue={stars}
                                    imageSize={15}
                                    readonly
                                    />
                            </Right>
                        )
                    }
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{`${textDisplay}`}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                <Left>
                    <Button light transparent  onPress={onLikePress}>
                        <IconElement  name={likeActive ? "like1" : "like2"} type="antdesign" />
                        <Text>{likes ? likes.length :" 0"}</Text>
                    </Button>
                    <Button light transparent  onPress={onDislikePress}>
                        <IconElement  name={dislikeActive ? "dislike1" : "dislike2"} type="antdesign"/>
                        <Text>{dislikes ? dislikes.length : "0"}</Text>
                    </Button>
                </Left>
                </CardItem>
            </Card>
        </ErrorBoundary>                
        //     </Content>
        // </Container>
    );
};

CommentCard.PropTypes = {
    user : T.object.isRequired,
    snippet : T.object.isRequired,
    likes : T.array,
    dislikes : T.array,
    onAvatarPress : T.func,
    onLikePress : T.func,
    onDislikePress : T.func,
};

CommentCard.defaultProps = {
    style: {
        height: 200
    },
    user:  {
        avatar :"https://gravatar.com/avatar/686d8d2a0081176c5042f39ed281c2ea?s=400&d=robohash&r=x",
        name: 'nick',
        last_name: "petrov",
    },
    stars: 0,
    snippet: {
        textOriginal: '',
        textDisplay: '',
        publishedAt: "",
    },
    onAvatarPress: () => {},

};

export default CommentCard;