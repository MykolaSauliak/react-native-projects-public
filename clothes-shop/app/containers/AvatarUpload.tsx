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

const defaultAvatar = "https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01-300x250.png"

const S = StyleSheet.create({
    avatar: {
        // borderColor: colors.orange,
        // borderWidth: 1,
        borderRadius: 50,
        height: 95,
        width: 95,
      },
})

type Props = {
    initialURL : string,
    signedUser : any,
    containerStyle : any,
}

let AvatarUpload = ({
    loggedInUser,
    containerStyle,
} : Props) => {

    let [avatar, changeAvatar] = React.useState(loggedInUser.avatar || defaultAvatar)
    let [avatarLoading, setAvatarLoading] = React.useState(false)

    const onAvatarPress = () => {
        ImagePicker
        .openPicker({})
        .then(async image => {
          console.log('image',image)
          setAvatarLoading(true)
          let newUrl = await AuthService.changeAvatar(image.path)
          changeAvatar(newUrl)
          setAvatarLoading(false)
          // setImages([...images, ...imgs]);
          // console.log(images);
        });
    }

    return (
        <TouchableOpacity style={[containerStyle]} onPress={onAvatarPress}>
        {avatarLoading 
          ?<ActivityIndicator />
          :<Image
            source={{uri: avatar}}
            resizeMode="contain"
            style={S.avatar}
            />
        }
        
      </TouchableOpacity>
    );
};

AvatarUpload = withAuth()(AvatarUpload)

export default AvatarUpload;