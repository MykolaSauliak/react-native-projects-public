import React, { useEffect} from 'react';
import { Alert } from "react-native";
import { 
  Negotiation,
} from "../../types/Negotiation.type";
import { 
  Shop,
} from "../../types/Shop.type";
import { 
  User
} from "../../types/User.type";
import { ShopService } from '../../services';
import NegotiationBox from "../../components/Negotiations/NegotiationsBox";
import _ from 'lodash';
import {
  withAuth
} from '../../utils/enhancers'

interface Props {
    product?: Shop.Product,
    id : string,
    product_id?: string,
    negotiation?: Negotiation,
    lastUpdate : number,
    sellerUser?: User,
    buyerUser?: User,
    loggedInUser: User
  }

/**
 * if no negotation, product info, seller,buyer set, download this information
 */
const NegotiationContainer = ({
    id,
    product_id,
    product,
    sellerUser,
    buyerUser,
    negotiation,
    loggedInUser,
  } : Props) => {
    
    let [loading, setLoading] = React.useState(false)
    let [error, setError] = React.useState('')
    let [localProduct, setProduct] = React.useState(product || {})
    let [localNegotiation, setNegotiation] = React.useState(negotiation || {})
    let [localSellerUser, setSellerUser] = React.useState(sellerUser || {})
    let [localBuyerUser, setBuyerUser] = React.useState(buyerUser || loggedInUser)
    
    useEffect(() => {
      if(_.isEmpty(localProduct) 
        && !_.isEmpty(product_id)){
        _.debounce(() => {
          console.log('fetch product')
          ShopService
            .getGood(product_id)
            .then( product => setProduct(product))
        }, 200)  
      }
      return () => {
        
      }
    }, [product_id])

    useEffect(() => {
      async function fetchNegotiation(){
        if(_.isEmpty(localNegotiation) && id){
          setLoading(true)
          let negotiation = await ShopService.getNegotiation({
            id,
          });
          // if(negotiation && (negotiation.user_id === this.props.user.uid || negotiation.seller_id === this.props.user.uid)){
          // if(!this.props.item.id){
          if (negotiation) {
            let item = await ShopService.getGood(negotiation.product_id);
            console.log('item', item);
            setProduct(item);
            // setLastUpdate(Date.now());
            // }
            setNegotiation(negotiation);
            let sellerUser = await ShopService.getUser(negotiation.seller_id);
            let buyerUser = await ShopService.getUser(negotiation.user_id);
            setSellerUser(sellerUser);
            setBuyerUser(buyerUser);
            // }
          }
          setLoading(false);
        }
      }
      fetchNegotiation()
      return () => { 

      }
    }, [id, localProduct?.id])


    const onCreateNew = async (priceOffer : number) => {
      setLoading(true);
      // console.log('new neg options',options)
      try {
        let newNegotiation = {
          createdAt: Date.now(),
          created_time: Date.now(),
          seller_id: localSellerUser.uid,
          product_id: localProduct.id,
          offer_price: priceOffer,
          currency: localProduct.currency,
          isAccepted: false,
          answered: false,
          brand_name: localProduct.brand_name || 'brand name test',
          subtype_name: localProduct.subtype_name || 'subtype test',
          image: localProduct.images
            ? localProduct.images[0]
            : 'https://pngimg.com/uploads/clown/clown_PNG23.png', //so we can sent notification later
        };
        newNegotiation = await ShopService.createNegotiation(newNegotiation);
        if (newNegotiation) {
          setNegotiation(newNegotiation);
        }
        // console.log('onCreateNew neg',successful)
      } catch (err) {
        console.log('onCreateNew err', err);
        Alert.alert('Create new error',JSON.stringify(err))
      }
      setLoading(false);
      setError('');
    }

    
    useEffect(() => {
      if(_.isEmpty(localSellerUser) 
        && !_.isEmpty(localProduct)){
        _.debounce(() => {
          ShopService
            .fetchUser(localProduct.user_id)
            .then( user => setSellerUser(user))
        }, 2000)  
      }
      return () => {
        
      }
    }, [localSellerUser?.id])

    
    // const acceptOffer = () => ShopService
    const acceptOffer = () => {
      if(!localNegotiation.id){
        Alert.alert("Can't fetch negotiations info")
        return 
      }
      Alert.alert(
        //title
        'Do you really want to accept this price? ',
        //body
        '',
        [
          {
            text: 'Yes',
            onPress: async () => {
              const update = {
                id: localNegotiation.id,
                isAccepted: true,
                answered: true,
                answeredAt: Date.now(),
              };
              let successful = await ShopService.updateNegotiation(update);
              if (successful) {
                setNegotiation({
                  ...localNegotiation,
                  ...update,
                });
              } else {
                Alert.alert('Some errors, try later ...');
              }
            },
          },
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
        //clicking out side of alert will not cancel
      );
    }

    const declineOffer = () => {
      if(!localNegotiation.id){
        Alert.alert("Can't fetch negotiations info")
        return 
      }
      Alert.alert(
        'Do you really want to decline this price? ',
        '',
        [
          {
            text: 'Yes',
            onPress: async () => {
              const update = {
                id: localNegotiation.id,
                isAccepted: false,
                answered: true,
                answeredAt: Date.now(),
              };
              let successful = await ShopService.updateNegotiation(update);
              if (successful) {
                setNegotiation({
                    ...localNegotiation,
                    ...update,
                });
              } else {
                Alert.alert('Some errors, try later ...');
              }
            },
          },
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
        //clicking out side of alert will not cancel
      );
    }

    return (
       <NegotiationBox 
            product={localProduct}
            negotiation={localNegotiation}
            error={error}
            onCreateNew={onCreateNew}
            acceptOffer={acceptOffer}
            declineOffer={declineOffer}
            loading={loading}
            sellerUser={localSellerUser}
            buyerUser={localBuyerUser}
            />
    );
};

export default withAuth()(NegotiationContainer);