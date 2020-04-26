import React, { Component } from 'react'
import { 
    View,
    Text,
    FlatList
 } from "react-native";
import CommentCard from "../containers/Comments/CommentCard";
import T from 'prop-types'
import  globalStyles from "../constants/styles";
import { ListItem, Input } from "react-native-elements";
import colors from '../styles/colors'
import Button from './Button/Button';
import Modal from "react-native-modal";
import { BackHeader } from '.';
import { Comment } from '../types/Comment.type';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import constants from '../constants';
import _ from 'lodash'

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
    isModalVisible : boolean,
    commentText : string,
}

class CommentList extends Component<Props, State> {

    state = {
        isModalVisible : false,
        commentText : '',
    }

    toggleModal = () => {
        this.setState({
            isModalVisible : !this.state.isModalVisible
        })
    }

    render() {
        const {
            horizontal = true,
            title,
            containerStyle,
            onCommentLeft,
            comments,
            CommentElement,
            lastUpdate = 123
        } = this.props

        const { 
            commentText
        } = this.state

        return (
            <View key={lastUpdate}>
                <Modal style={{backgroundColor: 'white', margin: 0, padding: 0}} isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <BackHeader title="Chat" goBack={this.toggleModal}/>
                        <View style={{flex:1, padding: 15}}>
                            <FlatList 
                                data={comments}
                                keyExtractor={(item, index) => item.id + lastUpdate.toString()}
                                renderItem={({item, index}) => {
                                    if(CommentElement){
                                        return <CommentElement {...item} />
                                    }
                                    return <CommentCard {...item} />
                                }}
                                />
                        </View>
                        <View style={{flexDirection: "row", paddingHorizontal: 10, borderTopWidth: 2, paddingVertical: 10}}>
                            <View style={{flex:0.8}}>
                                <Input
                                    value={commentText}
                                    onChangeText={(text) => this.setState(() => ({commentText: text}))}
                                    multiline 
                                    />
                            </View>
                            <View style={{flex:0.2, justifyContent:"center"}}>
                                <Button 
                                    title="Post" 
                                    onPress={() => onCommentLeft(commentText)} 
                                    />
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={[{backgroundColor: 'white'}, containerStyle]}>
                    {title && <Text style={globalStyles.listTitle}>{title}</Text>}
                    {(!comments || _.isEmpty(comments))
                        && <>
                        <ListItem 
                            containerStyle={[{ backgroundColor: colors.lightGray, marginVertical: 15}]}
                            title="Leave the first comment"
                            titleStyle={{color: colors.black, fontSize: 12,paddingHorizontal: 10}}
                            leftIcon={{color:colors.black,  name: "commenting-o", type: "font-awesome", size: 35}}
                            />
                        <Button 
                            titleStyle={{color: 'black'}}
                            onPress={() => this.setState({isModalVisible : true})}
                            containerStyle={{marginTop: 15}}
                            title="write a comment"
                            />
                    </>}
                    <FlatList 
                        horizontal={horizontal}
                        data={comments}
                        renderItem={({item,index}) => (
                            <CommentCard 
                                {...item}
                                containerStyle={{
                                    width: constants.DEVICE_WIDTH*0.7, 
                                    aspectRatio: 1.2/1
                                }}
                                />
                        )}
                        />
                    <TouchableOpacity style={{marginTop: 15}} onPress={this.toggleModal}>
                        <Text>Show all comments</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
