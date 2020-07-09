import React, { Component } from 'react'
import { 
    View,
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
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flex:1,}}>
                {/* <ScrollView > */}
                    <View style={{ flex: 1 }}>
                        <BackHeaderCenter title="Chat"/>
                        <View style={{flex:1, padding: 15, paddingBottom: 75}}>
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
                        <View style={styles.bottomContainer}>
                            <View style={{flex:0.8}}>
                                <Input
                                    style={{height: "100%"}}
                                    value={commentText}
                                    onChangeText={(text) => this.setState(() => ({commentText: text}))}
                                    multiline 
                                    />
                            </View>
                            <View style={{flex:0.2, justifyContent:"center"}}>
                                <Button 
                                    titleStyle={{color : 'black'}}
                                    title="Post"     
                                    onPress={() => {
                                        addComment({
                                        text: commentText,
                                        listName: id,
                                        productId: id,
                                        parentId: '',
                                    })
                                    this.setState({commentText:""})
                                    }} 
                                    />
                            </View>
                        </View>
                    </View>
                {/* </ScrollView> */}
        </KeyboardAwareScrollView>
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
    container: {flex:1},
    bottomContainer : {position:"absolute", zIndex:2, bottom: 0, minHeight: 60, backgroundColor: 'white', flexDirection: "row", paddingHorizontal: 10, borderTopWidth:2}
})