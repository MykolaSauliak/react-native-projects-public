import React from 'react';
import { View, StyleSheet, Alert } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import ButtonBlack from '../../../components/Button/ButtonBlack';
import { PreviewRowCard, BackHeaderCenter, Loading } from '../../../components';
import ImagePickerRow from '../../../components/ImagePickerRow';
import constants from '../../../constants';
import { colors } from '../../../styles';
import { ShopService, NavigationService } from '../../../services';
import { setLoading } from '../../../features/settings/actions';
import { withLinks } from '@storybook/addon-links';
import { compose } from 'redux';
import { withLists } from '../../../features/lists';
import listnames from '../../../constants/listnames';

const AddPhoto = ({
    navigation,
    updateListItem,
    updateCurrentItem
}) => {
    let product = navigation.getParam('product',{})
    let [images, setImages] = React.useState([])
    let [loading, setLoading] = React.useState(false)
    console.log('product',product)

    
    return (
        <>
        {loading && <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.gray, alignItems:'center', justifyContent:'center', zIndex: 2, opacity: 0.3}}>
            <Loading />    
        </View>}
        <ScrollView style={{flex:1, paddingBottom: 50}} contentContainerStyle={{paddingBottom: 50}}>
            <BackHeaderCenter title="Add picture" />
            <View style={{flex:1,}}>
                <PreviewRowCard {...product} />
                <View style={{flex:1,alignItems:'center', marginTop: 20}}>
                    <ImagePickerRow 
                        multiple
                        imgs={images}
                        title="Add new photo" 
                        titleStyle={{textAlign:'center', fontSize: 16, color: colors.dark}}
                        placeholderImage={{uri: constants.DEFAULT_UPLOAD_IMAGE}} 
                        onImageUpload={(ims =[]) => setImages([...images, ...ims])} />
                    <View style={{width: '90%', marginTop: 20,}}>
                        <ButtonBlack 
                            disabled={images.length == 0}
                            containerStyle={{height: 65}} 
                            title="Confirm" 
                            onPress={async () => {
                                setLoading(true)
                                let {successful, errorMessage, newImages} = await ShopService.uploadPhotoAndUpdate({
                                    images,
                                    product_id: product.id,
                                    productImages: product.images
                                })

                                if(successful){
                                    Alert.alert('Successfully updated photos')
                                    setImages([])
                                    updateListItem({listName: listnames.myitemsforsales, id: product.id, update: {
                                        images: [...product.images, ...newImages]
                                    }})
                                    updateCurrentItem({listName: listnames.clothes, update: {
                                        images: [...product.images, ...newImages]
                                    }})
                                    setLoading(false)
                                    NavigationService.goBack()
                                }else{
                                    console.log(errorMessage)
                                    Alert.alert('Some error occur','Try later')
                                }
                                setLoading(false)
                            }}
                            />
                    </View>
                </View>
            </View>
        </ScrollView>
        </>
    );
};

const enhance = compose(
    withLists(),
)

export default enhance(AddPhoto);