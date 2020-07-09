import React, { useEffect} from 'react';
import { Alert } from "react-native";
import { 
  Negotiation, Message,
} from "../../types/Negotiation.type";
import { 
  Shop,
} from "../../types/Shop.type";
import { 
  User
} from "../../types/User.type";
import { ShopService, DropdownAlertService } from '../../services';
import NegotiationBox from "../../components/Negotiations/NegotiationsBox";
import _ from 'lodash';
import {
  withAuth
} from '../../utils/enhancers'
import constants from '../../constants';

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
    id = "",
    product_id = "",
    product,
    sellerUser,
    buyerUser,
    negotiation,
    loggedInUser,
  } : Props) => {
    
    const minPriceCoef = 0.7

    let [loading, setLoading] = React.useState(false)
    let [error, setError] = React.useState('')
    let [localProduct, setProduct] : {localProduct : Shop.Product, setProduct : Function} = React.useState(product || {})
    let [localNegotiation, setNegotiation] = React.useState(negotiation || {})
    let [localSellerUser, setSellerUser] = React.useState(sellerUser || {})
    let [localBuyerUser, setBuyerUser] = React.useState(buyerUser || loggedInUser)
    
    useEffect(() => {
      console.log('localProduct',localProduct)
      if(_.isEmpty(localSellerUser) 
        && !_.isEmpty(localProduct)){
        // _.debounce(() => {
          console.log('fetch seller')
          ShopService
            .fetchUser(localProduct?.user_id)
            .then( user => setSellerUser(user))
        // }, 
        // )  
      }
      return () => {
        
      }
    }, [localProduct?.id])

    useEffect(() => {
      if(_.isEmpty(localProduct) 
        && product_id &&  product_id.length > 0){
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
        setLoading(true)
        /**
         * user go from notification or "price offer sent" screen, when we have negotiation id
         */
        // console.log('localNegotiation',localNegotiation)
        // console.log('id',id)
        if(_.isEmpty(localNegotiation) && id && id.length > 0){
          const negotiation = await ShopService.getNegotiation({
            id,
          });
          console.log('fetched negotiation',negotiation)
          // if(negotiation && (negotiation.user_id === this.props.user.uid || negotiation.seller_id === this.props.user.uid)){
          // if(!this.props.item.id){
          if (negotiation) {
            try{
              let item = await ShopService.getGood(negotiation.product_id);
              console.log('item', item);
              setProduct(item);
            }catch(err){

            }

            // setLastUpdate(Date.now());
            // }
            setNegotiation(negotiation);
            let sellerUser = await ShopService.getUser(negotiation.seller_id);
            let buyerUser = await ShopService.getUser(negotiation.user_id);
            setSellerUser(sellerUser);
            setBuyerUser(buyerUser);
            // }
          }
        }

      /**
       * user go from product page
       */
        else if(_.isEmpty(localNegotiation) &&  product_id && loggedInUser?.uid){
          // console.log('getNegotiation',product_id,  loggedInUser?.uid)
          const negotiation = await ShopService.getNegotiation({
              product_id: product_id,
              user_id: loggedInUser.uid,
            });
            // if(negotiation && (negotiation.user_id === this.props.user.uid || negotiation.seller_id === this.props.user.uid)){
            // if(!this.props.item.id){
            if (negotiation?.id) {
              console.log(negotiation)
              let sellerUser = await ShopService.getUser(negotiation.seller_id);
              let buyerUser = await ShopService.getUser(negotiation.user_id);
              setSellerUser(sellerUser);
              setBuyerUser(buyerUser);
              console.log(sellerUser)
              console.log(buyerUser)
              console.log(negotiation)
              setNegotiation(negotiation);
              // }
            }
        }
        setLoading(false);
      }
      fetchNegotiation()
      return () => { 

      }
    }, [id, localProduct?.id])


    const onUpdatePrice = async (priceOffer : number) => {
      if(localProduct.price * minPriceCoef > priceOffer){
        return DropdownAlertService.getDropDown().alertWithType('error', '', 'Your offer must be about 70% of the product\'s initial price', {}, 2500);
      }
      setLoading(true);
      // console.log('new neg options',options)
      if(!localNegotiation?.id){
        try {
          let newMessage : Message = {
            offer_price: priceOffer,
            created_time: Date.now(),
            user_id: localBuyerUser.uid,
            status: 'sent',
          }
          let newNegotiation = {
            messages: [newMessage],
            createdAt: Date.now(),
            created_time: Date.now(),
            seller_id: localSellerUser.uid,
            product_id: localProduct.id,
            offer_price: priceOffer,
            starting_price: localProduct.price,
            currency: localProduct.currency,
            // isAccepted: false,
            // answered: false,
            status: 'sent',
            brand_name: localProduct.brand_name || 'brand name test',
            type_name: localProduct.type_name || 'subtype test',
            subtype_name: localProduct.subtype_name || 'subtype test',
            color: localProduct.color || '',
            material: localProduct.material || '',
            printed: localProduct.printed || '',
            image: localProduct.images
              ? localProduct.images[0]
              : 'https://pngimg.com/uploads/clown/clown_PNG23.png', //so we can sent notification later
          };
          // console.log('newNegotiation',newNegotiation)
          newNegotiation = await ShopService.createNegotiation(newNegotiation);
          if (newNegotiation) {
            setNegotiation(newNegotiation);
          }
          // console.log('onCreateNew neg',successful)
        } catch (err) {
          console.log('onCreateNew err', err);
          Alert.alert('Create new error',JSON.stringify(err))
        }
      }else{
        let newMessage : Message = {
          offer_price: priceOffer,
          created_time: Date.now(),
          user_id: loggedInUser.uid,
          status: 'sent',
        }
        const update = {
          id: localNegotiation.id,
          status: 'sent',
          offer_price: priceOffer,
          messages: [...localNegotiation.messages,newMessage]
        };
        let successful = await ShopService.updateNegotiation(update);
        await ShopService.addNegotiationMessage(localNegotiation.id, newMessage);
        if (successful) {
          setNegotiation({
            ...localNegotiation,
            ...update,
          });
        }

      }
      setLoading(false);
      setError('');
    }

    const makeCounterOffer = async (priceOffer : number) => {
      if(localProduct.price * minPriceCoef > priceOffer){
        return DropdownAlertService.getDropDown().alertWithType('error', '', 'Your offer must be about 70% of the product\'s initial price', {}, 2500);
      }
      setLoading(true);
      // console.log('new neg options',options)
      let newMessage : Message = {
        offer_price: priceOffer,
        created_time: Date.now(),
        user_id: loggedInUser.uid,
        status: 'seller_sent',
      }
      const update = {
        id: localNegotiation.id,
        status: 'seller_sent',
        messages: [...localNegotiation.messages,newMessage]
      };
      let successful = await ShopService.updateNegotiation(update);
      await ShopService.addNegotiationMessage(localNegotiation.id, newMessage);
      if (successful) {
        setNegotiation({
          ...localNegotiation,
          ...update,
        });
      } else {
        Alert.alert('Some errors, try later ...');
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
              localNegotiation.messages = localNegotiation.messages || []
              const newMessage : Message = {
                status: 'accepted',
                offer_price: localNegotiation.offer_price,
                created_time :Date.now(),
                user_id: loggedInUser.uid,
              };
              const update = {
                id: localNegotiation.id,
                status: 'accepted',
                messages: [...localNegotiation.messages,newMessage]
              };
              let successful = await ShopService.updateNegotiation(update);
              await ShopService.addNegotiationMessage(localNegotiation.id, newMessage);
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
              localNegotiation.messages = localNegotiation.messages || []
              const newMessage : Message = {
                status: 'declined',
                offer_price: localNegotiation.offer_price,
                created_time : Date.now(),
                user_id: loggedInUser.uid,
              };
              const update = {
                id: localNegotiation.id,
                status: 'declined',
                messages: [...localNegotiation.messages,newMessage]
              };

              let successful = await ShopService.updateNegotiation(update);
              await ShopService.addNegotiationMessage(localNegotiation.id, newMessage);
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
      // null
       <NegotiationBox 
            product={localProduct}
            negotiation={localNegotiation}
            maxPrice={localProduct.price * constants.negotiation_price_min_coef}
            minPrice={localProduct.price}
            error={error}
            onUpdatePrice={onUpdatePrice}
            makeCounterOffer={makeCounterOffer}
            acceptOffer={acceptOffer}
            declineOffer={declineOffer}
            loading={loading}
            sellerUser={localSellerUser}
            loggedInUser={loggedInUser}
            buyer={localBuyerUser}
            />
    );
};

export default withAuth()(NegotiationContainer);