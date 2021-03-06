//@flow
import React from 'react';
import { View, Text, Button } from "react-native";
import PreviewRowCard from '../PreviewRowCard';
import { Formik,  Form, Field } from 'formik';
import * as Yup from "yup";
import FormInput from '../FormInput/FormInput';
import InputForm from '../InputForm/InputForm';
import FormError from '../FormError/FormError';



const PriceReductionProductCard = ({
    id,
    brand_name,
    type_name,
    subtype_name,
    images,
    description,
    onCollapsedChange,
    price = 0,
    currency,
    onPriceChange,
}) => {

    const PriceSchema = Yup.object().shape({
        price: Yup.number()
            .positive()
            .integer()
            .min(1)
            .max(price)
            .required("Required"),
    });
    console.log('price',price)
    // let [collapsed, setCollapsed] = React.useState(true)
    return (
        <View>
            <PreviewRowCard 
                    id={id}
                    brand_name={brand_name}
                    type_name={type_name}
                    subtype_name={subtype_name}
                    images={images}
                    price={price}
                    currency={currency}
                    description={description}
                    // onCollapsedChange={(collapsed) => {
                    //     setCollapsed(collapsed)
                    // }}
                    />
                <Formik
                    initialValues={{
                        price: price
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        onPriceChange(values.price)
                    }}
                    validationSchema={PriceSchema}
                    >
                    {({
                        values, errors, touched, handleSubmit, handleChange, handleBlur
                    }) => (
                        // <Form>
                        //     <Field name="price" type="number" />
                        //     {errors.price && touched.price ? <Text>{errors.price}</Text> : null}
                        //     <Button type="submit"title="Submit"/>
                        // </Form>
                        <View style={{padding: 10}}>
                            <InputForm
                                placeholder={`New price`}
                                // containerStyle={s.inputContainerPassword}
                                value={values.price}
                                // iconNameLeft="dollar"
                                // iconTypeLeft="font-awesome"
                                inputStyle={{color:'black'}}
                                keyboardType="number-pad"
                                // active={activeField === 'password'}
                                // onFocus={() => onChange('activeField', 'password')}
                                onBlur={handleBlur('price')}
                                onChangeText={handleChange('price')}
                                autoCapitalize="none"
                                // error={errors.price}
                                />
                            <FormError showError={errors.price} error={errors.price}/>
                            {/* <FormInput.Field 
                                placeholder="New price"
                                inputType="number"
                                name="price"
                                onChangeText={handleChange('price')}
                                value={values.price}
                                error={errors.price}
                                keyboardType="numpad"
                                containerStyle={{marginBottom: 15}}
                                /> */}
                            <Button 
                                color="black" 
                                onPress={handleSubmit} 
                                title="Change price" 
                                />
                        </View>
                    )}
                </Formik>
        </View>
    );
};

export default PriceReductionProductCard;