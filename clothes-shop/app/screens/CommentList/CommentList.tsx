import React, { Component } from 'react'
import { 
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    StyleSheet,
    Platform
 } from "react-native";
import CommentCard from "../../containers/Comments/CommentCard";
import T from 'prop-types'
import {  Input } from "react-native-elements";
import { Button, BackHeader, BackHeaderCenter } from '../../components';
import { withComments } from '../../utils/enhancers';
import { Comment } from '../../types/Comment.type';

type Props = {
    title: string,
    horizontal: boolean,
    containerStyle: any,
    onCommentLeft: (text: string) => void,
    comments: Comment[],
    CommentElement: any
    lastUpdate?: number
}

type State = {
    commentText : string,
}

class CommentList extends Component<Props, State> {

    state = {
        commentText : '',
    }

    render() {
        const {
            getComments,
            id,
            seller_id,
            CommentElement,
            lastUpdate,
            addComment,
        } = this.props

        const { 
            commentText
        } = this.state

        const comments = getComments(id)
        console.log('id',id)
        // console.log('comments',comments)
        return (
            <KeyboardAvoidingView
                // behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
                >
                <View style={{ flex: 1 }}>
                    <BackHeaderCenter title="Chat"/>
                    <View style={{flex:0.95, padding: 15}}>
                    <FlatList 
                        data={comments}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({item, index}) => {
                            // console.log('item',item)
                            if(CommentElement){
                                return <CommentElement  {...item} />
                            }
                            return <CommentCard fromSeller={seller_id == item?.user?.uid} {...item} />
                        }}
                        />
                    </View>
                    <View style={{flex:0.05, minHeight: 60, backgroundColor: 'white', flexDirection: "row", paddingHorizontal: 10, borderTopWidth: 2, paddingVertical: 10}}>
                        <View style={{flex:0.8}}>
                            <Input
                                value={commentText}
                                onChangeText={(text) => this.setState(() => ({commentText: text}))}
                                multiline 
                                />
                        </View>
                        <View style={{flex:0.2, justifyContent:"center"}}>
                            <Button 
                                titleStyle={{color : 'black'}}
                                title="Post"     
                                onPress={() => addComment({
                                    text: commentText,
                                    listName: id,
                                    productId: id,
                                    parentId: '',
                                })} 
                                />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

CommentList.PropTypes = {
    horizontal : T.bool,
    collection : T.string,
    title : T.string,
    containerStyle : T.object,
}

export default CommentList;


const styles = StyleSheet.create({
    container: {flex:1}
})