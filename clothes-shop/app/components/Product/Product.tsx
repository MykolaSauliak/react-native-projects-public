import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal,
    Animated,
  } from 'react-native';
import FavoriteButton from '../../containers/FavoriteButton';
import Chip from '../../components/Chip/Chip';
import styles from './Product.style'
import globalStyles from '../../constants/styles';
import {
    DataTable,
  } from 'react-native-paper';
import constants from '../../constants'
import i18n from '../../i18n';

const Product = ({
    
}) => {
    return (
        <View>
            
        </View>
    );
};

const FavoriteRow = ({
    item
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'flex-end',
                paddingHorizontal:15,
                // alignItems:'center'
            }}> 
            <FavoriteButton 
                containerStyle={{padding: 5}}
                item={item}
                />
            {item.favorite_count > 0 && <Text style={styles.favoriteCount}>{item.favorite_count}</Text>}
        </View>
    );
};

const E = ({

}) => {
    return (
        <div>
            
        </div>
    );
};

const Warantly = ({
    warranty = 0,
    waranty_icon
}) => {
    return (
        <View>
            {warranty > 0 && (
                <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                }}>
                <Image
                    source={waranty_icon ? waranty_icon : constants.WARANTLY_ICON}
                    resizeMode="contain"
                    style={{width: 25, height: 25}}
                />
                <Text>
                    {i18n.t('product.waranty')} {warranty}{' '}
                    {i18n.t('product.months')}
                </Text>
                </View>
            )}
        </View>
    );
};

const Chips = ({
    we_love = false,
    vintage
}) => {
    return (
        <View style={styles.chipContainer}>
            {<Chip textStyle={{fontSize: 13,  }} style={styles.chip}>We love</Chip>}
            {vintage &&<Chip style={styles.chip}>Vintage</Chip>}
            {/* {we_love && <Mark fontSize={15} title="we love" />}
            {vintage && <Mark fontSize={15} title="vintage" />} */}
        </View>
    );
};

const ProductHeader = ({
    type_name =  "",
    subtype_name= "",
    brand_name = "",
    category_name = "",
    material = "",
    color = "",
    paddingHorizontal = 15,
    children = () => null,
}) => {
    return (
        <View style={{ marginTop: 5, backgroundColor: 'white', paddingHorizontal, paddingVertical: 10}}>
            <Text style={[globalStyles.text, styles.productTitle]}>
                {`${brand_name}`}
            </Text>
            <Text style={globalStyles.desc}>
                {`${color || ""} ${material || ""} ${subtype_name || ""}`}
            </Text>
            {children}
        </View>
    );
};

const Details = ({
    color,
    material,
    printed,
    condition,
    paddingHorizontal = 25
}) => {
    return (
        <View style={[styles.itemDetailsBox, {marginHorizontal:paddingHorizontal}]}>
              <Text style={[styles.text, {marginVertical: 15}]}>
                {i18n.t('product.itemdetails')}
              </Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Title</DataTable.Title>
                  <DataTable.Title numeric>Value</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                  <DataTable.Cell>Color</DataTable.Cell>
                  <DataTable.Cell numeric>{color}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Material</DataTable.Cell>
                  <DataTable.Cell numeric>{material}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Printed</DataTable.Cell>
                  <DataTable.Cell numeric>{printed}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Condition</DataTable.Cell>
                  <DataTable.Cell numeric>{condition}</DataTable.Cell>
                </DataTable.Row>
                {/* <DataTable.Pagination
                                page={1}
                                numberOfPages={3}
                                onPageChange={(page) => { console.log(page); }}
                                label="1-2 of 6"
                                /> */}
              </DataTable>
              {/* {specs.map( (spec, i)=> {
                            console.log('spec - ',specs)
                            return(
                            <View style={{width: "100%", flexDirection:'row', paddingVertical: 4}}>
                                <View style={styles.tableCeil}>
                                    <Text style={{textAlign:'left'}}>{styles.title || styles.name || (specs.key ? specs.key.toUpperCase() : '') }</Text>
                                </View>
                                <View style={styles.tableCeil}>
                                    <Text style={{textAlign:'right'}}>{specs.value}</Text>
                                </View>
                            </View>
                            )
                })} */}
            </View>
    );
};

Product.FavoriteRow = FavoriteRow
Product.Header = ProductHeader
Product.Chips = Chips
Product.Warantly = Warantly
Product.Details = Details

export default Product;