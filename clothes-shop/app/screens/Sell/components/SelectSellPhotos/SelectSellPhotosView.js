import React, {useState} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalColors from '../../../../styles/colors';
import constants from '../../../../constants';
import ItemsList from '../../../../components/ItemsList';
import i18n from '../../../../i18n';
import S from './SelectSellPhotos.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import photo_example_1_main from '../../../../assets/images/photo_example_1_main.png';
import photo_example_2_back from '../../../../assets/images/photo_example_2_back.png';
import photo_example_inside_3_brand from '../../../../assets/images/photo_example_inside_3_brand.png';
import photo_example_4_bottom from '../../../../assets/images/photo_example_4_bottom.png';
import photo_example_5_inside from '../../../../assets/images/photo_example_5_inside.png';
import ImagePickerRow from '../../../../components/ImagePickerRow';
import { BackHeaderCenter } from '../../../../components';
import {  Text} from '../../../../components';
import { globalStyles } from '../../../../styles';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const SelectSellPhotosView = ({
  printed,
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  set1Image,
  set2Image,
  set3Image,
  set4Image,
  set5Image,
  setOtherPhotos,
  image1,
  image2,
  image3,
  image4,
  image5,
}) => {
  let [closed, setClosed] = useState(true);
  let sheetInitialHeight = 0;

  const uploadMainPhoto = () => {};
  const upload2Photo = () => {};
  const upload3Photo = () => {};
  const upload4Photo = () => {};
  const upload5Photo = () => {};
  const uploadOtherPhoto = () => {};

  const renderContent = () => (
    <View
      style={{
        padding: 10,
        backgroundColor: globalColors.weLoveColor || 'gray',
        height: constants.DEVICE_HEIGHT,
      }}>
      <View style={{width: '100%', alignItems: 'center'}}>
        {closed ? (
          <AntDesign name="up" size={15} />
        ) : (
          <AntDesign name="down" size={15} />
        )}
      </View>
      <Text style={[S.text, {opacity: 0.5}]}>
        How can I ensure that colour of the item is clear?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={S.text}>
        We advise that you take photos using a good source of natural light to
        ensure that the colour of your item is clear
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: globalColors.gray}}>
      {/* <BottomSheet
                onCloseEnd={() => setClosed(true)}
                onOpenEnd={() => setClosed(false)}
                snapPoints = {[sheetInitialHeight, constants.DEVICE_HEIGHT * 0.9]}
                renderContent = {renderContent}
                // renderHeader = {renderHeader}
                /> */}
      <View style={{flex: 1, paddingBottom: sheetInitialHeight}}>
        <BackHeaderCenter
          title="Photos"
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
        />
        <ScrollView>
          <Text
            style={[globalStyles.sellPlaceholder]}>
            In your first photo set your item against a white background so it is
            clearly visible
          </Text>
          {/* 5nd photo (inside) */}
          <ImagePickerRow
            source={image1}
            onImageUpload={set1Image}
            title="Main photo"
            titleStyle={{fontSize: widthPercentageToDP(5)}}
            imageExample={photo_example_1_main}
          />
          <ImagePickerRow
            source={image2}
            onImageUpload={set2Image}
            title="2nd photo (back)"
            titleStyle={{fontSize: widthPercentageToDP(5)}}
            imageExample={photo_example_2_back}
          />
          <ImagePickerRow
            source={image3}
            title="3nd photo (brand)"
            titleStyle={{fontSize: widthPercentageToDP(5)}}
            onImageUpload={set3Image}
            imageExample={photo_example_inside_3_brand}
          />
          <ImagePickerRow
            source={image4}
            title="4nd photo (bottom)"
            titleStyle={{fontSize: widthPercentageToDP(5)}}
            onImageUpload={set4Image}
            imageExample={photo_example_4_bottom}
          />
          <ImagePickerRow
            source={image5}
            title=" 5nd photo (inside) "
            titleStyle={{fontSize: widthPercentageToDP(5)}}
            onImageUpload={set5Image}
            imageExample={photo_example_5_inside}
          />
          {/* <ImagePickerRow
            source={image5}
            title=" MORE "
            onImageUpload={set5Image}
            imageExample={photo_example_5_inside}
          /> */}
          <View style={{marginTop: 15, borderTopWidth: 1, borderTopColor: 'gray'}}>
              <ImagePickerRow
                  multiple
                  onIm
                  title="More photos (optional)"
                  titleStyle={{fontSize: widthPercentageToDP(5)}}
                  onImageUpload={setOtherPhotos}
                  subtitle="You can add one, two, three or more photos"
                  subtitleStyle={{fontSize: widthPercentageToDP(5)}}
                  // imageExample={photo_example_5_inside}
                  />
          </View>
        </ScrollView>

        {/* <ItemsList items={printed} onItemPress={onPress}/> */}
      </View>
    </View>
  );
};

SelectSellPhotosView.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellPhotosView;
