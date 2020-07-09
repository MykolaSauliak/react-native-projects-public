import React from 'react';
import {
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import S from './styles';
import globalStyles from '../../../../styles';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../../../styles/colors';
import {ListItem} from '../../../../components';
import {List, Checkbox} from 'react-native-paper';
import {NavigationService} from '../../../../services';
import constants from '../../../../constants';
import {search} from '../../../../features/search/actions';
import ClothesSearchHeader from '../../../../components/ClothesSearchHeader';
import {  Text} from '../../../../components';

const category_id = 'g2llU0ofWnYUFdvSh7Tn';
const kidCategory = "OYruGwYUh0JRujWdc0iY"

const typeGirl = "Eo2l5gIDLgjCKWLTR7Nw"
const typeBoys = "7YTbSmuiLHH9Hcqr9iyh"
const typeShoes = "L3nCd0aPr9pOAbKNaAcW"
const typeAccessories	 = "pjvJcy4IdmJ1ri4tvvXD"

const WomanSearchView = ({
  subcategories,
  onPress,
  isModalVisible,
  setModalVisible,
  loading,
  types,
  subtypes,
  search,
  addToLastSearch,
}) => {
  // //console.log('categories length',subcategories.length);
  // console.log('subcategories length',subcategories.length);
  const _handlePress = () => {};

  const addLastSearchItem = item => {
    if (addToLastSearch) {
      addToLastSearch(item);
    }
  };

  const _renderNewIn = () => (        
  <View style={[S.listAccordion]}>
    <List.Accordion 
    title="New in" 
      titleStyle={S.sectionTitle}>
      <TouchableOpacity
        onPress={
          () =>
            search('Woman - All',
              {
                refinementList: {
                  category_id: [category_id],
                },
              },
            )
          // NavigationService.navigateToTextSearch({
          //   title: 'All',
          //   category_id : category_id,
          // })
        }>
        <List.Item title="All" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={
          () =>
            search(
              'Woman - Today',
              {
                refinementList: {
                  [constants.clothes_fields.category_id]: [category_id],
                },
                range: {
                  [constants.clothes_fields.created_time]: {
                    min: Date.now() - constants.ONE_DAY_MILISECONDS,
                  },
                },
              },
              constants.clothes,
            )
          // NavigationService.navigateToTextSearch({
          //   title: 'Today',
          //   category_id : category_id,
          //   created_time_start: Date.now() - constants.ONE_DAY_MILISECONDS,
          // })
        }>
        <List.Item title="Today" />
      </TouchableOpacity>
    </List.Accordion>
  </View>)

  const _renderBrands = () => (
    <View style={S.listAccordion}>
    <TouchableOpacity
      onPress={() => NavigationService.navigateToBrandChoose({onPress: ({brand}) => {
            search(
              'Woman - ' + brand.title,
              {
                refinementList: {
                  category_id: [category_id],
                  brand_name: brand.title
                },
              },
            )
          }
      })}
      >
      <List.Item titleStyle={{fontWeight: 'bold'}} title="Brands A-Z" />
    </TouchableOpacity>
  </View>
  )

  const _renderTypes = () => (
    <FlatList
      data={types.filter(type => type.category_ids.includes(category_id))}
      renderItem={({item}) => (
        <View style={[S.listAccordion]}>
          <List.Accordion
            title={item.title || ''}
            titleStyle={S.sectionTitle}>
            <TouchableOpacity
              onPress={
                () =>
                  search(
                    item.title,
                    {
                      refinementList: {
                        category_id: [category_id],
                        type_id: [item.id],
                      },
                    },
                    constants.clothes,
                  )
                // NavigationService.navigateToTextSearch({
                //   title: item.title,
                //   type_id : item.id
                //   // options: {type_id: item.id},
                // })
              }>
              <List.Item title={'All'} />
            </TouchableOpacity>
            {subtypes
              // .filter(st => st && st.type_id && st.type_id == item.id  && st.category_ids && st.category_ids.includes(category_id))
              .filter(st => st && st.type_ids && st.type_ids.includes(item.id)  && st.category_ids && st.category_ids.includes(category_id))
              .map(st => (
                <TouchableOpacity
                  onPress={
                    () =>
                      search(
                        item.title + ' - ' + st.title,
                        {
                          refinementList: {
                            category_id: [category_id],
                            type_id: [item.id],
                            subtype_id: [st.id],
                          },
                        },
                        constants.clothes,
                      )
                    // NavigationService.navigateToTextSearch({
                    //   options: {subtype_id: st.id, type_id: item.id},
                    // })
                    // NavigationService.navigateToTextSearch({
                    //   title: st.title,
                    //   subtype_id : st.id,
                    //   category_id : category_id,
                    // })
                  }>
                  {/* <TouchableOpacity onPress={() => addLastSearchItem({category: 'Woman', type : item, subtype : st})}> */}
                  <List.Item title={st.title} />
                </TouchableOpacity>
              ))}
          </List.Accordion>
        </View>
      )}
    />
  );

  const _renderChildren = () => (
    <View style={[S.listAccordion]}>
    <List.Accordion
      title={"Children"}
      titleStyle={S.sectionTitle}>
      <TouchableOpacity
        onPress={() => search(
              "Girl's clothing",
              {
                refinementList: {
                  category_id: [kidCategory],
                  type_id: [typeGirl],
                },
              },
            )
        }>
        <List.Item title={"Girl's clothing"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => search(
          "Boy's clothing",
          {
                refinementList: {
                  category_id: [kidCategory],
                  type_id: [typeBoys],
                },
              },
            )
        }>
        <List.Item title={"Boy's clothing"} />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => search(
            "Kids - Shoes",
            {
                  refinementList: {
                    category_id: [kidCategory],
                    type_id: [typeShoes],
                  },
                },
              )
          }>
          <List.Item title={"Shoes"} />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => search(
                "Kids - Accessories",
                {
                  refinementList: {
                    category_id: [kidCategory],
                    type_id: [typeAccessories],
                  },
                },
              )
          }>
          <List.Item title={"Accessories"} />
      </TouchableOpacity>
    </List.Accordion>
  </View>
  )

  const _renderWeLove = () => (
    <View style={S.listAccordion}>
    <TouchableOpacity
      onPress={() =>
        search(
          'We love',
          {
            refinementList: {
              category_id: [category_id],
            },
            toggle: {
              [constants.we_love]: true,
            },
            // range: {
            //   created_time : {min:  Date.now() - constants.ONE_DAY_MILISECONDS}
            // }
          },
          constants.clothes,
        )
      }>
      <List.Item titleStyle={{fontWeight: 'bold'}} title="We love" />
    </TouchableOpacity>
  </View>
  )

  const _renderExpressDelivery = () => ( <View style={S.listAccordion}>
    <TouchableOpacity
      onPress={
        () => {
          search(
            'Express Delivery',
            {
              refinementList: {
                category_id: [category_id],
              },
              toggle: {
                [constants.express_delivery]: true,
              },
            },
            constants.clothes,
          );
        }
        // NavigationService.navigateToTextSearch({
        //   title: 'Express delivery',
        //   // options: {

        //     // tag_ids: ['Bcw4GOJsS2wBlqiozlzy'],
        //   // },
        // })
      }>
      <List.Item
        color="black"
        titleStyle={S.sectionTitle}
        title="Express Delivery"
      />
    </TouchableOpacity>
  </View>)

  return (
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        {/* <ClothesSearchHeader
              onLeftButtonPress={() => NavigationService.navigateToHome()}
              onCartClick={() => navigation.navigate(screens.CartStack)}
              onSearchClick={() => navigation.navigate(screens.TextSearch)}
            /> */}
        <ScrollView>
          {_renderNewIn()}
          {_renderBrands()}
          {_renderTypes()}
          {_renderWeLove()}
          {_renderChildren()}
          {_renderExpressDelivery()}
        </ScrollView>
      </View>
  );
};

export default WomanSearchView;
