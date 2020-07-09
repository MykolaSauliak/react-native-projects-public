import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator ,
    Image,
    StyleSheet
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { AuthService } from "../services";
import { withAuth } from "../utils/enhancers";
import {User} from '../types/User.type'
import constants from '../constants';
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Loading } from '../components';
import { headerMaxHeight } from '../constants/dimensions';

// const defaultAvatar = "https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01-300x250.png"

const S = StyleSheet.create({
  container: {
    // alignItems:'center',
    // justifyContent:'center',
    // height: 50,
    borderRadius: 25,
    // width: 50,
  },
  avatar: {
      // borderColor: colors.orange,
      // borderWidth: 1,
      height: 50,
      width: 50,
      resizeMode: 'cover',
      borderRadius: 25,
    },
})

type Props = {
    loggedInUser : User,
    containerStyle : any,
    disabled: boolean,
    maxHeight: number,
    maxWidth: boolean,
}

let AvatarUpload = ({
    loggedInUser,
    containerStyle,
    maxWidth = 100,
    maxHeight = 100,
    avatarStyle = {},
    disabled = false,
    defaultSource = {}
} : Props) => {

    const { showActionSheetWithOptions } = useActionSheet();
    
    let [avatar, changeAvatar] = React.useState(loggedInUser?.avatar)
    let [avatarLoading, setAvatarLoading] = React.useState(false)
    // sconsole.log('avatar',avatar)
    // const onAvatarPress = () => {
    //     ImagePicker
    //       .openPicker({cropping: true})
    //       .then(async image => {
    //         console.log('image',image)
    //         setAvatarLoading(true)
    //         let newUrl = await AuthService.changeAvatar(image.path)
    //         changeAvatar(newUrl)
    //         setAvatarLoading(false)
    //         // setImages([...images, ...imgs]);
    //         // console.log(images);
    //       });
    // }

    const uploadPicture = () => {
      ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        compressImageMaxHeight : maxHeight,
        compressImageMaxWidth : maxWidth,
        // compressImageQuality: quality,
        // compressImageMaxHeight: constants.compressImageMaxHeight,
        // compressImageMaxWidth: constants.compressImageMaxWidth,
        // includeBase64: true
      }).then(async (image) => {
        // setImage(image); 
        /**
         * response params
         * @path {String}
         * @width {Number}
         * @height {Number}
         * @size {Number}
         * @mime {string}
         */
        // console.log(image);
        console.log('image',image)
        setAvatarLoading(true)
        let newUrl = await AuthService.changeAvatar(image.path)
        changeAvatar(newUrl)
        setAvatarLoading(false)
      })
      .catch(err => {
        console.log('ERROR DURING IMAGE UPLOAD',err)
      })
    };
  
  
    const takePhoto = () => {
      ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        // includeBase64: true
      }).then(async (image) => {
        /**
         * response params
         * @path {String}
         * @width {Number}
         * @height {Number}
         * @size {Number}
         * @mime {string}
         */
        // console.log(image);
        console.log('image',image)
        setAvatarLoading(true)
        let newUrl = await AuthService.changeAvatar(image.path)
        changeAvatar(newUrl)
        setAvatarLoading(false)
      })
      .catch(err => {
        console.log('ERROR DURING IMAGE UPLOAD',err)
      })
    };

    const _onOpenActionSheet = () => {
      // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
      const options = ['Take a photo', 'Pick from gallery', 'Cancel'];
      // const destructiveButtonIndex = 0;
      const cancelButtonIndex = 2;
    
      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          // destructiveButtonIndex,
        },
        buttonIndex => {
          switch(buttonIndex){
            case 0:
              takePhoto()
              break
            case 1:
              uploadPicture()
              break
            case 2:
              break
          }
          // Do something here depending on the button index selected
        },
      );
    };

    return (
        <TouchableOpacity 
          disabled={disabled} 
          style={[S.container, containerStyle]} 
          onPress={_onOpenActionSheet}
          >
        {avatarLoading 
          ?<Loading />
          :<Image
              source={avatar ? {uri: avatar} : constants.defaultAvatar}
              resizeMode="contain"
              style={[S.avatar, avatarStyle]}
              // defaultSource={defaultSource}
              />
        }
        
      </TouchableOpacity>
    );
};

AvatarUpload = withAuth()(AvatarUpload)

export default AvatarUpload;