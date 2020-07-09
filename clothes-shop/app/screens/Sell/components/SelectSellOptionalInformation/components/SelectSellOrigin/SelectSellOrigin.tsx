import React, {useState} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalColors from '../../../../../../styles/colors';
import constants from '../../../../../../constants';
import ItemsList from '../../../../../../components/ItemsList';
import S from './SelectSellOrigin.style';
import T from 'prop-types';
import BottomSheet from 'reanimated-bottom-sheet';
import {BackHeaderCenter, Input, ListItem} from '../../../../../../components'
import { Formik } from 'formik';
import * as Yup from 'yup';
import AccordionList from '../../../../../../components/AccordionList';
import ButtonBlack from '../../../../../../components/Button/ButtonBlack';
import {  Text} from '../../../../../../components';
import colors from '../../../../../../styles/colors';
import { globalStyles } from '../../../../../../styles';

const OriginSchema = Yup.object().shape({
  purchasePlace: Yup.string()
    .required('Required'),
 purchasePrice: Yup.string()
    .min(1, 'Too small!')
    .required('Required'),
 purchaseYear: Yup.number()
    .required('Required'),
});

const SelectSellOrigin = ({
  search,
  updateSearch,
  placeholder,
  onPress,
  goBack,
  onDone,
  chooseItem,
  origin = {}
}) => {
  let [closed, setClosed] = useState(true);
  let sheetInitialHeight = 80;

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
      <Text style={[S.text, globalStyles.botomSheetTitle]}>
        Why do you request the provenenace of my item?
      </Text>
      <View style={{width: 50, borderWidth: 2}} />
      <Text style={[S.text, globalStyles.botomSheetSubtitle]}>
        We are commeitted to the fight against counterfeit products and each item placced online is selected by our team/ By specifying where it was bought, there is grater chance that your item will be accepted and processed quickly
      </Text>
    </View>
  );

  return (
    <ScrollView style={{flex:1}} contentContainerStyle={{flex:1}}>
    <View style={{flex: 1, backgroundColor: globalColors.gray}}>
      <BottomSheet
        onCloseEnd={() => setClosed(true)}
        onOpenEnd={() => setClosed(false)}
        snapPoints={[sheetInitialHeight, constants.DEVICE_HEIGHT * 0.9]}
        renderContent={renderContent}
        // renderHeader = {renderHeader}
      />
      <View style={{flex: 1, paddingBottom: sheetInitialHeight}}>
        <BackHeaderCenter
          title="Origin"
          rightComponent={{icon: 'check', color: '#000', onPress: onDone}}
          />
        <Text
          style={globalStyles.sellPlaceholder}>
          This information will not be publicly displayed
        </Text>
        <Formik
            initialValues={{
              purchasePlace: origin.purchasePlace || '',
              purchasePrice: origin.purchasePrice || 0,
              purchaseYear: origin.purchaseYear || 0,
            }}
            validationSchema={OriginSchema}
            onSubmit={(values, actions) => {
              
              let newOrigin = {
                  ...values,
              }
              console.log('newOrigin',newOrigin)
              chooseItem(newOrigin);
              // actions.resetForm();
              // onDone();
            }}>
            {({errors, handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                {/* <Text style={S.title}>Personal Information</Text> */}
                <AccordionList
                    // show
                    showChevron
                    rightSubtitle
                    subtitleStyle={{color: colors.orange}}
                    headerProps={{bottomDivider: true,}}
                    titleStyle={[S.listItemTitle, globalStyles.leftListItem]}
                    onSubItemPress={(item) => {
                      console.log('item',item)
                      console.log(handleChange('purchasePlace'))
                      handleChange('purchasePlace')(item.title)
                      console.log(values.purchasePlace)
                    }}
                    items={[{
                    title:  'Place of purchase',
                    subtitle: values.purchasePlace,
                    data : [
                      {
                        title: "Shop",
                      },
                      {
                        title: "Comes from private sales, press sales, staff sales",
                      },
                      {
                        title: "Bought in our app",
                      },
                      {
                        title: "Other (git, etc.)",
                      }
                    ]
                  }]}
                  />
                {/* <ListItem
                  title="Place"
                  containerStyle={S.listItemcontainerStyle}
                  titleStyle={S.listItemTitle}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.first_name, onChangeText: handleChange('first_name'), 
                  //   inputStyle
                  // }}
                  rightElement={<AccordionList
                    onSubItemPress={(item) => handleChange('first_name')(item.title)} 
                    items={[{
                    title:  'Place of purchase',
                    data : [
                      {
                        title: "Shop",
                      },
                      {
                        title: "Comes from private sales, press sales, staff sales",
                      },
                      {
                        title: "Bought in our app",
                      },
                      {
                        title: "Other (git, etc.)",
                      }
                    ]
                  }]}
                  />
                  // <Input 
                  //   errorMessage={errors.first_name}
                  //   onChangeText={handleChange('first_name')}
                  //   onBlur={handleBlur('first_name')}
                  //   value={values.first_name}
                  //   containerStyle={{
                  //     width: '50%'
                  //   }}
                  // />
                  }
                  bottomDivider
                /> */}
                <ListItem
                  title="Purchase price"
                  titleStyle={[S.listItemTitle, globalStyles.leftListItem]}
                  containerStyle={S.listItemcontainerStyle}
                  rightElement={<View style={{width: '50%',flexDirection:'row', justifyContent: 'flex-end', alignItems:'center'}}>
                    <Input 
                        containerStyle={{width: 100}}
                        textStyle={S.listItemTitle}
                        errorMessage={errors.purchasePrice}
                        onChangeText={handleChange('purchasePrice')}
                        onBlur={handleBlur('purchasePrice')}
                        value={values.purchasePrice}
                      />
                    <Text style={[globalStyles.rightListItem, {textTransform: 'uppercase'}]} >USD</Text>
                  </View>
                  }
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.last_name, 
                  //   onChangeText: handleChange('last_name'), 
                  //   inputStyle,
                  //   // inputContainerStyle: {
                  //   //   justifyContent:'flex-start'
                  //   // }
                  // }}
                  bottomDivider
                />
                <ListItem
                  title="Year of purchase"
                  containerStyle={[S.listItemcontainerStyle, {height:null ,minHeight: 75}]}
                  titleStyle={[S.listItemTitle, globalStyles.leftListItem]}
                  // input={{
                  //   errorStyle : {position: "absolute", bottom: 0},
                  //   errorMessage:errors.phone_number, onChangeText: handleChange('phone_number'), inputStyle}}
                  rightElement={<Input 
                    errorMessage={errors.purchaseYear}
                    onChangeText={handleChange('purchaseYear')}
                    onBlur={handleBlur('purchaseYear')}
                    value={values.purchaseYear}
                    containerStyle={{
                      width: '50%'
                    }}
                  />}
                  bottomDivider
                />
                <View
                  style={{
                    color: 'white',
                    height: 75,
                    marginHorizontal: 25,
                    marginVertical: 15,
                  }}>
                  <ButtonBlack onPress={handleSubmit} title="Submit"/>
                </View>
              </View>
            )}
          </Formik>
        {/* <ItemsList items={colors} onItemPress={onPress} /> */}
      </View>
    </View>
    </ScrollView>
  );
};

SelectSellOrigin.propTypes = {
  onDone: T.func.isRequired,
  chooseMaterial: T.func.isRequired,
};

export default SelectSellOrigin;
