import React, { Component } from 'react';
import { View,Text } from "react-native";
import { User } from "../types";
import { ListItem } from "react-native-elements";
import { ShopService } from "../services";
import Loading from "../components/Loading";
import UserRow from '../components/UserRow'

type Props = {
    user_id : string,
}

type State = {
    user : User,
    error : any,
    loading : boolean,
}

class UserListItem extends Component<Props, State> {

    state = {
        user: {},
        error : {},
        loading: false
    }

    async componentDidMount(){
        console.log('user_id', this.props.user_id)
        if(this.props.user_id){
            let user = await ShopService
                .getUser(this.props.user_id)
            this.setState(() => ({
                user: user,
                loading: false
            }))
        }
    }

    render() {
        const {
            user = {},
            error,
            loading
        } = this.state;
        const { 
            user_id,
            ...otherProps
        } = this.props;

        if(loading){
            return <ListItem bottomDivider title={<Loading />} />
        }   

        if(!user.name){
            return null
        }

        return (
           <UserRow 
                avatar={user.avatar}
                name={user.name}
                last_name={user.last_name}
                user_id={user_id}
                {...otherProps}
                />
        );
    }
}

export default UserListItem;