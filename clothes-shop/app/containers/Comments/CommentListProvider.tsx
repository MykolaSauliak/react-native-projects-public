import React, { Component } from 'react'
import { 
    View,
    Text,
    FlatList
 } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { Comment } from '../../types/Comment.type';
import { ShopService } from "../../services";
import { withComments } from "../../utils/enhancers";
import CommentList from "../../components/Comments/CommentList";
import { ActivityIndicator } from '../../components';
import { compose } from 'redux';

type Props = {
    collection :string,
    id :string,
    render : (items: Comment[]) => void
    setComments : (id:string, comments:  Comment[]) => void
}
class CommentListProvider extends Component<Props> {

    state = {
        comments: [],
        loading: false
    }

    async componentDidUpdate(prevProps, prevState){
        if(prevProps.id != this.props.id){
            const {
                collection,
                id
            } = this.props
            if(!id){
                return 
            }
            let comments :Comment[] = []
            this.setState(() => ({
                loading: true
            }))
            try{
                const querySnapshot  = await firestore()
                .collection(collection)
                .where('snippet.productId','==',id)
                .get();
                for(let doc of querySnapshot.docs){
                    console.log('doc',doc.data())
                    let commentData = doc.data()
                    let userDoc = await firestore().collection('users').doc(commentData?.snippet.authorId).get()
                    let {
                        name, 
                        last_name, 
                        avatar,uid, 
                        ...otherProps
                    } = userDoc.data()
                    comments = [...comments, 
                            {
                                ...commentData,
                                user : {
                                    name,
                                    last_name,
                                    avatar,
                                    uid,
                                }, 
                        }
                    ]
                }
            }catch(err){
                console.log('ERROR',err)
            }finally{
                console.log('set comment',comments)
                this.props.setComments(id,comments)
                this.setState(() => ({
                    comments,
                    loading: false
                }))
            }
        }
       
    }

    render() {
        const {
            comments,
            loading
        } = this.state
        // console.log('render comments',comments)
        if(loading){
            return <ActivityIndicator />
        }

        if(this.props.render){
            return (
                this.props.render(comments)
            )
        }
        
        if(this.props.children){
            return this.props.children
        }
        
        return null

    }
}

export default withComments()(CommentListProvider);
