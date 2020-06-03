import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import S from './styles';
import globalStyles from '../../../../constants/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../../../styles/colors';
import {ListItem} from 'react-native-elements';
import {List, Checkbox} from 'react-native-paper';
import {NavigationService} from '../../../../services';
import constants from '../../../../constants';

const category_id = 'mskRjk1CHCvdWsURmmvz';

const LifestyleSearchView = ({
  subcategories,
  onPress,
  isModalVisible,
  setModalVisible,
  loading,
  types,
  subtypes,
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

  const _renderTypes = () => (
    <FlatList
      data={types.filter(
        type =>
          type && type.category_ids && type.category_ids.includes(category_id),
      )}
      renderItem={({item}) => (
        <View style={[S.listAccordion]}>
          <List.Accordion
            title={item.title || ''}
            titleStyle={{fontWeight: 'bold',  color: 'black'}}>
            <TouchableOpacity
              onPress={
                () => {
                  search(
                    item.title,
                    {
                      refinementList: {
                        category_id: [category_id],
                        type_id: [item.id],
                      },
                    },
                    constants.clothes,
                  );
                }
                // NavigationService.navigateToSearchResult({
                //   title: item.title,
                //   options: {type_id: item.id},
                // })
              }>
              <List.Item title={'All'} />
            </TouchableOpacity>
            {subtypes
              .filter(st => st && st.type_ids && st.type_ids.includes(item.id)  && st.category_ids && st.category_ids.includes(category_id))
              // .filter(st => st && st.type_id && st.type_id == item.id && st.category_ids && st.category_ids.includes(category_id))
              .map(st => (
                <TouchableOpacity
                  onPress={() => {
                    search(
                      item.title,
                      {
                        refinementList: {
                          category_id: [category_id],
                          type_id: [item.id],
                          subtype_id: [st.id],
                        },
                      },
                      constants.clothes,
                    );
                    // NavigationService.navigateToSearchResult({
                    //   options: {subtype_id: st.id, type_id: item.id},
                    // })
                  }}>
                  {/* <TouchableOpacity onPress={() => addLastSearchItem({category: 'Woman', type : item, subtype : st})}> */}
                  <List.Item title={st.title} />
                </TouchableOpacity>
              ))}
          </List.Accordion>
        </View>
      )}
    />
  );

  
  const _renderBrands = () => (
    <View style={S.listAccordion}>
    <TouchableOpacity
      onPress={() => NavigationService.navigateToBrandChoose({onPress: ({brand}) => {
            search(
              'Lifestyle - ' + brand.title,
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

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: colors.gray}}>
        <View style={[S.listAccordion]}>
          <List.Accordion title="New in" titleStyle={{fontWeight: 'bold'}}>
            <TouchableOpacity
              onPress={
                () =>
                  search(
                    'Lifestyle - New in',
                    {
                      refinementList: {
                        [constants.clothes_fields.category_id]: [category_id],
                      },
                    },
                    constants.clothes,
                  )
                // NavigationService.navigateToSearchResult({
                //   title: 'All',
                //   options: {},
                // })
              }>
              <List.Item title="All" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                () =>
                  search(
                    'Lifestyle - Today',
                    {
                      refinementList: {
                        category_id: [category_id],
                      },
                      range: {
                        [constants.clothes_fields.created_time]: {
                          min: Date.now() - constants.ONE_DAY_MILISECONDS,
                        },
                      },
                    },
                    constants.clothes,
                  )
                // NavigationService.navigateToSearchResult({
                //   title: 'Today',
                //   options: {},
                //   time: {createdAt: Date.now() - constants.ONE_DAY_MILISECONDS},
                // })
              }>
              <List.Item title="Today" />
            </TouchableOpacity>
          </List.Accordion>
        </View>
        {_renderBrands()}
        {_renderTypes()}
        <View style={S.listAccordion}>
          <TouchableOpacity
            onPress={
              () =>
                search(
                  'Express delivery',
                  {
                    refinementList: {
                      category_id: [category_id],
                    },
                    toggle: {
                      [constants.clothes_fields.we_love]: true,
                    },
                  },
                  constants.clothes,
                )
              // NavigationService.navigateToSearchResult({
              //   title: 'We love',
              //   options: {
              //     category_id: category_id,
              //     tag_ids: ['fi5lSQlsw7ZQ6HTFgspJ'],
              //   },
              // })
            }>
            <List.Item titleStyle={{fontWeight: 'bold'}} title="We love" />
          </TouchableOpacity>
        </View>
        <View style={S.listAccordion}>
          <TouchableOpacity
            onPress={
              () =>
                search(
                  'Express delivery',
                  {
                    refinementList: {
                      category_id: [category_id],
                    },
                    toggle: {
                      [constants.express_delivery]: true,
                    },
                  },
                  constants.clothes,
                )
              // NavigationService.navigateToSearchResult({
              //   title: 'Express delivery',
              //   options: {
              //     category_id: category_id,
              //     tag_ids: ['Bcw4GOJsS2wBlqiozlzy'],
              //   },
              // })
            }>
            <List.Item
              titleStyle={{fontWeight: 'bold'}}
              title="Express Delivery"
            />
          </TouchableOpacity>
        </View>
        {/*
              <List.Accordion
                title="Clothes"
                titleStyle={{fontWeight :'bold'}}
                // left={props => <List.Icon {...props} icon="folder" />}
                // expanded={true} //expanded
                // onPress={_handlePress}
              >
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion> */}
        {/* </List.Section> */}
      </View>
    </ScrollView>
  );
};

export default LifestyleSearchView;
