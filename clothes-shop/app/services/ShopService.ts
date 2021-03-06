import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Alert, AlertType } from "react-native";
import {
  Shop, 
} from '../types/Shop.type'
import {Alert as AlerType} from '../types/Alert.type'
import R from 'ramda';
import _ from 'lodash';
import constants from '../constants'
import moment from 'moment';
import { User, Order } from '../types/types';
import { Negotiation, Message } from '../types/Negotiation.type';
import { getUser } from "../features/user/selectors";
// import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import shortid from 'shortid'
import { updateUser } from '../features/user/actions';
import { Toast } from 'native-base';
import { DropdownAlertService } from './DropdownAlertService';

const collectionsNames = {
  negotiations : "negotiations",
}

const commentsRef = firestore().collection('comments');
const categoriesRef = firestore().collection('categories');
const subcategoriesRef = firestore().collection('subcategories');
const clothesRef = firestore().collection('clothes');
const negotiationsRef = firestore().collection('negotiations');
const slidesRef = firestore().collection('slides');
const ordersRef = firestore().collection('orders');
const subtypesRef = firestore().collection('subtypes');
const carRef = firestore().collection('cars');
const brandsRef = firestore().collection('brands');
const collectionsRef = firestore().collection('collections');
const usersRef = firestore().collection('users');
const followingRef = firestore().collection('following');
const followersRef = firestore().collection('followers');
const wishlistRef = firestore().collection('wishlists');
const favoritesRef = firestore().collection('favorites');
const stripe_customersRef = firestore().collection('stripe_customers');

// const { store } = configureStore();

const getImagePath = ({user_id, product_id}) => {
  return `images/${user_id}/${product_id}/${shortid.generate() + '_' + Date.now()}`
}

const getProofOfOriginPath = ({user_id, product_id}) => {
  return `proofOfOrigin/${user_id}/${product_id}/${shortid.generate() + '_' + Date.now()}`
}

interface  ShopServiceInterface {
    init : (store : any) => void
}

class ShopService implements ShopServiceInterface {

  _store = null;

  async init(store){
    if(!this._store){
      this._store = store
    }
    
    const settings = {
      persistence: true,
      cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
    }
    await firestore().settings(settings).catch(console.log)
  
  }

  async addToken(token : string){
    const user = auth().currentUser;
    if(!user || !user.uid){
      return 
    }
    if(!token){
      console.log('token is required')
    }
    let response = await firestore().collection('stripe_customers')
                .doc(user.uid)
                .collection('tokens').add({token: token})
    
  }

  async fetchPopulaBrands(){
    let brands = []
    try{
        const snapshot = await brandsRef.where('popular','==',true).limit(10).get()
        snapshot.forEach((doc) => {
          brands.push(doc.data());
            // //console.log(doc.data())
         });
    }catch(err){
        console.log('fetchPopularBrands err',err)
        // Alert.alert()
    }finally{
        return brands
    }
  }

  async fetchUser(user_id: string){
    let user = {}
    if(!user_id){
      return null
    }
    try{
        const doc = await usersRef.doc(user_id).get()
        if(doc.exists){
          user = doc.data()
        }
    }catch(err){
        console.log('fetchUser err',err)
        // Alert.alert()
    }finally{
        return user
    }
  }

  async updateUserInfo(update: any){
    const user = auth().currentUser;
    let successful = false
    if(!user || !user.uid){
      return 
    }
    if(!update){
      return 
    }

    try{
        const response = await usersRef.doc(user.uid).update({...update})
        successful = true
    }catch(err){
        successful = false
        console.log('updateUserInfo err',err)
    }finally{
        return successful
    }
  }

  async fetchItemsForSale(user_id  :string, createdAt : string){
    let items = []
    try{
        let query = clothesRef
              .where(constants.clothes_fields.user_id,'==',user_id)
              .where(constants.clothes_fields.status,'==',constants.clothes_fields.status_field.approved)
        if(createdAt){
            query = query.orderBy(createdAt).startAt(createdAt)
        }
        
        const snapshot = await query
                              .get()

        snapshot.forEach((doc) => {
          items.push(doc.data());
            // //console.log(doc.data())
         });
    }catch(err){  
        //console.log('err',err)
        // Alert.alert()
    }finally{
        console.log('wishlist',items.length)
        return items
    }
  }

  async fetchSoldCount(user_id  :string){
    let count = 0
    try{
      let query = clothesRef
            .where(constants.clothes_fields.user_id,'==',user_id)
            .where(constants.clothes_fields.status,'==','sold')
            // .where(constants.clothes_fields.isApproved,'==',true)
            // .where(constants.clothes_fields.sold,'==',true)
        const snapshot = await query
                              .get()
        count = snapshot.size;
    }catch(err){  
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return count
    }
  }

  async fetchWishlist(user_id  :string){
    console.log('fetchWishlist')
    let wishlist = []
    try{
        const doc = await wishlistRef
                              .doc(user_id)
                              .get()
        if(doc.exists){
          let wishlistKeys = doc.data()
          let promises = []
          Object.entries(wishlistKeys).forEach(([key,value]: [string,boolean]) => {
            if(value == true){
              promises.push(this.getGood(key))
            }
          })  
          wishlist = await Promise.all(promises)
        }

    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
      console.log('wishlist',wishlist.length)
        return wishlist
    }
  }

  async addToWishlist(id : string){
    const user = auth().currentUser;
    if(!user || !user.uid){
      return
    }
    let successful = false
    try{
        const response = await wishlistRef
                              .doc(user.uid)
                              .set({
                                [id]:true
                              }, {merge: true})
        // if(doc.exists){
        //   following = doc.data()
        // }
        successful=true
            // //console.log(doc.data())
    }catch(err){
        console.log('addToWishlist',err)
        // Alert.alert()
    }finally{
        return successful
    }
  }
  

  async removeFromWishlist(id : string){
      const user = auth().currentUser;
      if(!user || !user.uid){
        return
      }
      let successful = false
      try{
          const response = await wishlistRef
                                .doc(user.uid)
                                .set({
                                  [id]:false
                                }, {merge: true})
          // if(doc.exists){
          //   following = doc.data()
          // }
          successful=true
              // //console.log(doc.data())
      }catch(err){
          console.log('removeFromWishlist',err)
          // Alert.alert()
      }finally{
          return successful
      }
  }

  async fetchFavorites(user_id : string){
    let favorites=[]
    try{
        const doc = await favoritesRef
                              .doc(user_id)
                              .get()
        if(doc.exists){
          let favoritesKeys = doc.data()
          let promises = []
          Object.entries(favoritesKeys).forEach(([key,value]: [string,boolean]) => {
            if(value == true){
              promises.push(this.getGood(key))
            }
          })  
          favorites = await Promise.all(promises)
        }

    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
      // console.log('favorites',favorites.length)
        return favorites
    }
  }
  
  async addToFavorites(id : string){
    const user = auth().currentUser;
    if(!user || !user.uid){
      return
    }
    let successful = false
    try{
        const response = await favoritesRef
                              .doc(user.uid)
                              .set({
                                [id]:true
                              }, {merge: true})

        await clothesRef
                              .doc(id)
                              .update({
                                favorite_count : firestore.FieldValue.increment(1)
                              })
                        
        // if(doc.exists){
        //   following = doc.data()
        // }
        successful=true
            // //console.log(doc.data())
    }catch(err){
        console.log('ERROR addToFavorites',err)
        // Alert.alert()
    }finally{
        return successful
    }
  }

  async removeFromFavorites(id : string){
      const user = auth().currentUser;
      if(!user || !user.uid){
        return
      }
      let successful = false
      try{
          const response = await favoritesRef
                                .doc(user.uid)
                                .set({
                                  [id]:false
                                }, {merge: true})
          await clothesRef
            .doc(id)
            .update({
              favorite_count : firestore.FieldValue.increment(-1)
            })
          // if(doc.exists){
          //   following = doc.data()
          // }
          successful=true
              // //console.log(doc.data())
      }catch(err){
          console.log('ERROR removeFromFavorites',err)
          // Alert.alert()
      }finally{
          return successful
      }
  }


  /** Followers and followed */
  async addFollowing(followed_user_id : string){
    const user = auth().currentUser;
    if(!user || !user.uid){
      return
    }
    let successful = false
    try{
        await followingRef
                              .doc(user.uid)
                              .set({
                                [followed_user_id]:true
                              }, {merge: true})
        await followersRef
                              .doc(followed_user_id)
                              .set({
                                [user.uid]:true
                              }, {merge: true})
        // if(doc.exists){
        //   following = doc.data()
        // }
        successful=true
            // //console.log(doc.data())
    }catch(err){
        console.log('addFollowing',err)
        // Alert.alert()
    }finally{
        return successful
    }
  }

  async removeFollowing(followed_user_id:string){
      const user = auth().currentUser;
      if(!user || !user.uid){
        return false
      }
      let successful = false
      try{
        await followingRef
                  .doc(user.uid)
                  .set({
                    [followed_user_id]:false
                  }, {merge: true})
        await followersRef
                  .doc(followed_user_id)
                  .set({
                    [user.uid]:false
                  }, {merge: true})
          // if(doc.exists){
          //   following = doc.data()
          // }
          successful=true
              // //console.log(doc.data())
      }catch(err){
          console.log('addFollowing',err)
          // Alert.alert()
      }finally{
          return successful
      }
  }

  async fetchFollowing(user_id){
    let following = {}
    try{
        const doc = await followingRef
                              .doc(user_id)
                              .get()
        if(doc.exists){
          following = doc.data()
        }
            // //console.log(doc.data())
    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return following
    }
  }

  async fetchFollowedBy(user_id){
    let followers = {}
    try{
        const doc = await followersRef
                            .doc(user_id)
                            .get()
        if(doc.exists){
          followers = doc.data()
        }
            // //console.log(doc.data())
    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return followers
    }
  }

  async getCategories(){
    let categories=[]
    try{
        const snapshot = await categoriesRef.get()
        snapshot.forEach((doc) => {
            categories.push(doc.data());
            // //console.log(doc.data())
         });
    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return categories
    }
    // snapshot.
  }

  async getSubcategories(category_id){
    let subcategories=[]
    try{
        const snapshot = await subcategoriesRef.where('category_id','==',category_id).get()
        snapshot.forEach((doc) => {
          subcategories.push(doc.data());
            // //console.log(doc.data())
         });
    }catch(err){
        //console.log('err',err)
        // Alert.alert()
    }finally{
        return subcategories
    }
    // snapshot.
  }

  async getGoodsById(ids: string[]){
    const promises = ids.map(id => {
      return new Promise((resolve) => {
            this.getGood(id)
                .then(product => {
                    resolve(product)
                }).catch( _ => {
                    resolve(null)
                })
        })
    })
    let items = await Promise.all(promises);
    return items
  }

  async getGood(id : string){
    console.log('get item',id)
    if(!id){
      return 
    }
    let product = {}
    try{
      const doc = await clothesRef.doc(id).get()
      let data;
      if(doc.exists){
        product = doc.data()  
      }
      return data
    }catch(err){
      console.log('ERROR DURING FETCH GOOD',err)
    }finally{
      return product
    }
  }

  async hideProduct({product_id}){
    // const user = auth().currentUser;
    let successful = false
    // if(!user || !user.uid){
    //   return 
    // }
    // if(!update){
    //   return 
    // }
    if(!product_id){
      return successful
    }
    try{
        const response = await clothesRef.doc(product_id).update({status: constants.clothes_fields.status_field.user_dismiss})
        successful = true
    }catch(err){
        successful = false
        console.log('hideProduct err',err)
    }finally{
        return successful
    }
  }

  async showProduct(id: string){
    // const user = auth().currentUser;
    let successful = false
    // if(!user || !user.uid){
    //   return 
    // }
    // if(!update){
    //   return 
    // }
    if(!id){
      return successful
    }
    
    try{
        const response = await clothesRef.doc(id)
                    .update({
                      status: constants.clothes_fields.status_field.approved
                    })
        successful = true
    }catch(err){
        successful = false
        console.log('hideProduct err',err)
    }finally{
        return successful
    }
  }

  async selectAndUploadPhoto({product_id}){
      const user_id = auth().currentUser?.uid
      let image = null
      let errorMessage = ""
      let successful = false
      let result = {}
      if(!user_id){
        return {
          image,
          successful
        }
      }

      try{
        let imageSelected = await ImagePicker.openPicker({
          mediaType: 'photo',
          compressImageQuality: constants.photo_quality,
          compressImageMaxHeight: constants.compressImageMaxHeight,
          compressImageMaxWidth: constants.compressImageMaxWidth,
          // includeBase64: true
        })
        /**
         * response params
         * @path {String}
         * @width {Number}
         * @height {Number}
         * @size {Number}
         * @mime {string}
         */
        // console.log(image);
        console.log('image size',imageSelected.size)
        if(!imageSelected.path){
          Alert.alert('No image selected')
          return {
            image : null,
            successful,
            errorMessage: "No image selected"
          }
        }

        const storageForDefaultApp = storage();
        let file = await  storageForDefaultApp
          .ref(`images/${user_id}/${product_id}/${Date.now()}`)
          .putFile(imageSelected.path)
            // console.log('file',file)
        let fullPath = file.metadata.fullPath
        let downloadedURL = await storageForDefaultApp.ref(fullPath).getDownloadURL()
        // console.log('downloaded link ',downloadedURL)
        image.src = downloadedURL
        // console.log('image',image.src)
        await clothesRef.doc(product_id).update({
          images: firestore.FieldValue.arrayUnion(image)
        })
        successful = true
      }catch(err){
        successful = false,
        image,
        errorMessage = JSON.stringify(err)
      }
      finally{
        return {
          image,
          successful,
          errorMessage
        }
      }
  }

  async uploadPhotoAndUpdate({product_id, images = [], productImages = []}){
      const user_id = auth().currentUser?.uid
      let newImages = []
      let errorMessage = ""
      let successful = false
      let result = {}
      if(!user_id){
        return {
          newImages,
          successful
        }
      }

      images = images.filter(image => image.path)

      try{
        // newImages = []
        const storageForDefaultApp = storage();
        for (let index = 0; index < images.length; index++) {
          const image = images[index];
          let file = await  storageForDefaultApp
            .ref(getImagePath({user_id, product_id}))
            .putFile(image.path)
              // console.log('file',file)
            let fullPath = file.metadata.fullPath
            let downloadedURL = await storageForDefaultApp.ref(fullPath).getDownloadURL()
            // console.log('downloaded link ',downloadedURL)
            image.src = downloadedURL
            newImages.push(image)
        }
        // console.log('newImages',newImages)
        let update = {}
        let allImages = [...productImages, ...newImages]
        update["images"] = allImages
        console.log('update',update)
        await clothesRef.doc(product_id).update(update)
        successful = true
      }catch(err){
        console.log('uploadPhotoAndUpdate err',err)
        successful = false,
        newImages,
        errorMessage = JSON.stringify(err)
      }
      finally{
        return {
          newImages,
          successful,
          errorMessage
        }
      }
  
  }

  /** for user */
  async getUser(user_id : string ){
    console.log('get user',user_id)
    if(!user_id){
      return 
    }
    let user = {}
    try{
      const doc = await usersRef.doc(user_id).get()
      if(doc.exists){
        user = doc.data()
      }
    }catch(err){
      console.log('ERROR DURING FETCH USER',err)
    }finally{
      console.log('found user',user)
      return user
    }
  }

  async getSlides(){
    // if()
    let slides = [];
    try{
      let snapshot;
      snapshot  = await slidesRef
            .get()
      snapshot.forEach(s => {
        slides.push(s.data())
    })
    }catch(err){
      console.log('error during fetching slides', err)
    }
    finally {
      return slides;
    }
  }

  async fetchCollection(options = {}, time = {}){
        // if()
        console.log('options',options)
        // console.log('time',time)
        let collection = {};
        try{
          let snapshot;
          let query = collectionsRef
          Object
            .keys(options)
            .forEach(key => {
              if(_.isArray(options[key])){
                query = query.where(key, 'array-contains-any',options[key])
              }else{
                query = query.where(key,'==', options[key])
              }
            })
          if(time.createdAt){
            query = query.where('createdAt','>=',time.createdAt)
          }

          query = query.limit(1)
          snapshot = await query.get()
          snapshot.forEach(s => {
            collection = s.data()
          })
          console.log('collection',collection)
          if(collection.id){
            let subtypes = []
            let stSnapshot = await subtypesRef.where('collection_ids','array-contains',collection.id).get()
            stSnapshot.forEach(s => {
              subtypes.push(s.data())
            })
            collection.subtypes = subtypes
            if(!subtypes || subtypes.length == 0){
              collection = {}
            }
          }
        }catch(err){
          console.log('error during fetching collection', err)
        }
        finally {
          // console.log('find',collection.length)
          return collection;
        }
  }

  async getGoods(options = {}, time = {}, limit = 0, orderBy = {}, startAfter = ''){
    // if()
    // console.log('options',options)
    // console.log('time',time)
    let goods = [];
    let count = null;
    try{
      let snapshot;
      let query = clothesRef
      // .where(constants.clothes_fields.status,'==', 'approved')
      Object
        .keys(options)
        .forEach(key => {
          if(_.isArray(options[key])){
            query = query.where(key, 'array-contains-any',options[key])
          }else{
            query = query.where(key,'==', options[key])
          }
        })
      // query = query.where('status','==', constants.clothes_fields.status_field.approved)
      if(time?.createdAt){
        query = query.where('createdAt','>=',time.createdAt)
      }

      if(orderBy?.field){
        query = query.orderBy(orderBy?.field, orderBy?.direction || 'desc')
      }else{
        query = query.orderBy('createdAt', "desc")
      }
      if(startAfter){
        query = query.startAfter(startAfter)
      }
      if(limit){
        query = query.limit(limit)
      }
      // console.log('query',query)
      snapshot = await query.get()
      count  = snapshot.size
      // .where("specs.B6", isEqualTo: true)
      // .whereField("vitamins.C", isEqualTo: true)
      snapshot.forEach(s => {
        goods.push(s.data())
      })
    }catch(err){
      console.log('error during fetching goods', err)
    }
    finally {
      console.log('find',goods.length)
      return {
        count,
        items: goods,
      };
    }
  }

  async getMyItems(){
    const user_id = auth().currentUser?.uid
    if(!user_id){
      return
    }
    let res =  await this.getGoods({
      user_id: user_id,
      [constants.clothes_fields.status] : Shop.Status[2]
    })
    return res
  }

  async getPriceReductionItems(){
    const user_id = auth().currentUser?.uid
    if(!user_id){
      return
    }
    let res =  await this.getGoods({
      user_id,
      [constants.clothes_fields.status] : Shop.Status[1]
    })
    return res
  }

  async getNotConfirmedItems(){
    console.log('Shop.Status[0]',Shop.Status[0])
    const user_id = auth().currentUser?.uid
    if(!user_id){
      return
    }
    const res =  await this.getGoods({
      user_id,
      [constants.clothes_fields.status] : 'image_cropped'
    })
    console.log('res',res)
    return res
  }

  async getRefusedItems(){
    const user_id = auth().currentUser?.uid
    if(!user_id){
      return
    }
    let res =  await this.getGoods({
      user_id,
      [constants.clothes_fields.status] : Shop.Status[3]
    })
    return res
  }

  async getSoldItems(){
    const user_id = auth().currentUser?.uid
    if(!user_id){
      return
    }
    let res =  await this.getGoods({
      user_id,
      [constants.clothes_fields.status] : Shop.Status[4]
    })
    return res
  }

  async getGoodWithNegotiations(id:string){
    const user_id = auth().currentUser?.uid;
    if (!user_id) {
      return
    }
    let product: Shop.Product = await this.getGood(id)
    if(!_.isEmpty(product)){
      let negotation = await this.getNegotiation({
        product_id : product.id,
        user_id
      })
      if(!_.isEmpty(negotation)){
          let {price : negotiationPrice} = this.getNegotiationPrice(negotation)
          if(negotiationPrice && negotiationPrice > 0 && negotiationPrice < product.price){
            if(product.newPrice > 0 && negotiationPrice > product.newPrice){
              product.price = product.newPrice
            }else{
              product.price = negotiationPrice
            }
          }
      }else{
        if(product?.newPrice && product.newPrice < product.price){
          product.price = product.newPrice
        }
      }
    }
    return product;
  }

  getNegotiationPrice = (negiation : Negotiation) => {
    let response = {
        price : 0
    }
    if(negiation.status == 'accepted'){
      response.price = negiation.offer_price
    }
    // if(negiation.answered_time > (Date.now() - constants.ONE_DAY_MILISECONDS)){
    //   if(negiation.isAccepted){
    //     response.price = negiation.offer_price
    //   }
    // }
    return response
  }

  async getUnreceivedItems(){
    const user_id = auth().currentUser?.uid;
    if (!user_id) {
      return
    }
    let res =  await this.getGoods({
      user_id,
      [constants.clothes_fields.status] : Shop.Status[4],
      [constants.clothes_fields.sale_status] : Shop.SaleStatus[1],
    })
    return res
  }

  async getUserGoods({user_id}){
    // if()
    let goods = [];
    try{
      let snapshot;
      snapshot  = await clothesRef
          .where('user_id','==', user_id)
          .where('status','==', 'accepted')
          .get()
      snapshot.forEach(s => {
        goods.push(s.data())
    })
    }catch(err){
      console.log('error during fetching goods', err)
    }
    finally {
      return goods;
    }
  }

  async createOrder({
    items,
    shippingAddress,
    created_time = Date.now(),  
    payment_method, 
    amount,
    token,
    orderStatus  = 'confirmed',
    payment_status = 'accepted',
    ...otherProps
  } : {token:string} & Order){
    const user = auth().currentUser;
    if (!user?.uid) {
      return
    //  console.log('User email: ', user.email');
    }
    try{
      const orderDoc = ordersRef.doc()
      const chargeDoc = firestore()
                .collection(`stripe_customers/${user.uid}/charges`)
                .doc()

      const order : Shop.Order = {
          ...otherProps,
          user_id : user.uid,
          email : user.email,
          // payment_email : email,
          amount: amount / 100,
          charge_id : chargeDoc.id,
          id: orderDoc.id,
          items,
          shippingAddress,
          created_time,  
          payment_method, 
          orderStatus,
      }
      console.log('order',order)
      // console.log('token',token) 
      await orderDoc.set(order)
      await chargeDoc.set({
          id: chargeDoc.id,
          amount:  amount,
          source:  token,
      },{merge: true})
      return true
    }catch(err){
      return false
        //console.log('ERROR DURING CREATING ORDER',err)
    }
  }

  async getMyOrders(){
    let orders : Shop.Order[] = []
    let count = 0
    try{
      const user_id = auth().currentUser?.uid;
      if(!user_id){
        return {
          count,
          items: orders
        }
      }
      // console.log('user_id',user_id)
      const snapshot = await ordersRef
              .where('user_id','==',user_id)
              .orderBy('created_time')
              .get()
      // console.log('snapshot',snapshot)
      snapshot.forEach(s => {
          orders.push(s.data())
      })
      count = snapshot.size
      // console.log('orders length - ',orders.length)
    }catch(err){
      console.log('ERROR DURING getMyOrders',err)
    }finally{
      return {
        count,
        items: orders
      }
    }
  }

  async createProduct(options : Shop.Product){
    let photoMaxWidth = 500
    let successful = false
    Alert.alert('Wait, creating product...')
    const user = auth().currentUser
    if(!user){
      return Alert.alert('You must login firstly')
    }
    let imagesPromises = []
    const doc = clothesRef.doc()

    const storageForDefaultApp = storage();
    /** upload image to storage */
    for(let i=1;i<6;i++){
      let photo = options['photo'+i]
      // console.log('photo',photo)
      if(photo){
        imagesPromises.push(new Promise((resolve) => {
              storageForDefaultApp
              .ref(getImagePath({product_id: doc.id, user_id: user.uid}))
              .putFile(photo.path)
              .then(async file => {
                  // console.log('file',file)
                  try{
                    const fullPath = file.metadata.fullPath 
                    const downloadedURL = await storageForDefaultApp.ref(fullPath).getDownloadURL()
                    // console.log('downloaded link ',downloadedURL)
                    resolve({
                      title : 'photo'+i,
                      src : downloadedURL   
                    })
                  }catch(err){
                    resolve({
                      title : 'photo'+i,
                      src : null   
                    })
                  }

                }).catch( err => {
                  console.log('err',err)
                  resolve({name :'photo'+i, url : null})
                })

        }))
      }
    }

    /** upload "other" images to the storage */
    try{
      options.otherPhotos = options.otherPhotos || []
      /** upload only 3 from other photos */
      for (let i = 0; i < 3; i++) {
        const photo = options.otherPhotos[i];
        
      // }
      // options.otherPhotos && options.otherPhotos.slice(0, 3).forEach((photo, i) =>{
        if(!photo){

        }else{
          imagesPromises.push(new Promise((resolve) => {
            storageForDefaultApp
              .ref(getImagePath({user_id: user.uid, product_id: doc.id}))
              .putFile(photo.path)
              .then(async file => {
                // console.log('file',file)
                  const fullPath = file.metadata.fullPath
                  try{
                    const downloadedURL = await storageForDefaultApp.ref(fullPath).getDownloadURL()
                    // console.log('downloaded link ',downloadedURL)
                    resolve({
                      title : 'otherPhoto'+i,
                      src : downloadedURL   
                    })
                  }catch(err){
                    console.log('err',err)
                    // console.log('downloaded link ',downloadedURL)
                    resolve({
                      title : 'otherPhoto'+i,
                      src : null   
                    })
                  }

              }).catch( err => {
                resolve({name :'otherPhoto'+i, url : null})
              })
          }))
        }
        
      }
      // )
    }catch(err){
      console.log('ERROR DURING UPLOAD OTHER PHOTOS',err)
    }
    /** upload proofOfOrigin */
    let proofOfOrigin = null
    if(options?.proofOfOrigin && options.proofOfOrigin?.path){
      console.log('upload  proof of origin')
      try{
        let proofOfOrigin = await new Promise((resolve) => {
          storageForDefaultApp
          .ref(getProofOfOriginPath({user_id: user.uid, product_id: doc.id}))
          .putFile(options.proofOfOrigin.path)
          .then(async file => {
            // console.log('file',file)
              const fullPath = file.metadata.fullPath
              try{
                const downloadedURL = await storageForDefaultApp.ref(fullPath).getDownloadURL()
                // console.log('downloaded link ',downloadedURL)
                resolve({
                  title : 'proofOfOrigin',
                  src : downloadedURL   
                })
              }catch(err){
                console.log('err',err)
                // console.log('downloaded link ',downloadedURL)
                resolve({
                  title : 'proofOfOrigin',
                  src : null   
                })
              }
          }).catch( err => {
            resolve({name :'proofOfOrigin', url : null})
          })
        })
      }catch(err){
  
      }
    }
   
    let  images : Shop.ProductImage[] = await Promise.all(imagesPromises)
    // if(images.map(i => i.src).filter( src => src).length < 5){
    //   console.log('image not uploaded, throw error')
    //   return
    // }
    images = images.filter(i => i.src)

    try{
      const response = await doc.set({
        ...options,
        id:doc.id,
        photo1: null,
        photo2: null,
        photo3: null,
        photo4: null,
        photo5: null,
        otherPhotos: null,
        proofOfOrigin,
        images,
        user_id : R.path(['uid'], user),
        createdAt : Date.now(),
        created_time : Date.now(),
        updatedAt : Date.now(),
        status : constants.clothes_fields.status_field.image_cropped,
        express_delivery: false,
        we_love: false,
        vintage: false,
      })
      // await clothesRef.doc(response.id).update({
      //   id: response.id
      // })
      successful = true
      Alert.alert('Submitted for review')
    }catch(err){
      // console.log('ERROR DURING CREATING PRODUCT ',err)
      Alert.alert('There was an loading error')
      successful = false
    }
    finally{
      return successful
    }
  }
  /**
   * for negotiations
   */

  async getNegotiation(options = {}){
    let negotiation : Negotiations = {}
    // console.log('options',options)
    try{
      let user_id = auth().currentUser?.uid
      if(!user_id){
        console.log('login first')
        return 
      }
      let query = negotiationsRef
      if(options.id){
        let doc = await query.doc(options.id).get()
        negotiation = doc.data()
      }
      else if(options){
          query = query.where('user_id', '==',user_id)
          query = query.where('product_id', '==',options.product_id)
          query = query.limit(1)
          let snapshot = await query.get()
          snapshot.forEach(s => {
            negotiation = s.data()
          })
      }
      else{
      }
    }catch(err){
      console.log('ERROR',err)
    }finally{
      console.log('fetched negotiation',negotiation)
      return negotiation
    }
  }

  async getNegotiations(options = {}, time = {}, limit = null){
      // if()
      console.log('options',options)
      // console.log('time',time)
      let negotiations : Negotiation[] = [];
      let count = null;
      try{
        let snapshot;
        let query = negotiationsRef
        // .where(constants.clothes_fields.status,'==', 'approved')
        Object
          .keys(options)
          .forEach(key => {
            if(_.isArray(options[key])){
              query = query.where(key, 'in',options[key])
            }else{
              query = query.where(key,'==', options[key])
            }
          })
        if(time.created_time){
          query = query.where('created_time','>=',time.created_time)
        }
        if(limit){
          query = query.limit(limit)
        }
        // console.log('query',query)
        snapshot = await query.orderBy('created_time', "desc").get()
        count  = snapshot.size
        // .where("specs.B6", isEqualTo: true)
        // .whereField("vitamins.C", isEqualTo: true)
        snapshot.forEach(s => {
          negotiations.push(s.data())
        })
      }catch(err){
        console.log('error during fetching goods', err)
      }
      finally {
        // console.log('find',goods.length)
        return {
          count,
          items: negotiations,
        };
      }
  }

  async getSendNegotiations(){
    let user_id = auth().currentUser?.uid
    if(!user_id){
      // Alert.alert('Firstly login')
      return 
    }
    let response = await this.getNegotiations({
      user_id : user_id
    })
    return response
  }

  async getReceivedOffer(){
    let user = auth().currentUser
    if(!user || !user.uid){
      // Alert.alert('Firstly login')
      return 
    }
    let response = await this.getNegotiations({
      [constants.negotiations_field.seller_id] : user.uid,
      status: ['sent','declined'],
      // [constants.negotiations_field.answered] : false,
    })
    return response
  }

  async createNegotiation(options = {}){
    console.log('createNegotiation')
    const user_id = auth().currentUser?.uid;
    if(!user_id){
      return 
    }
    let negotiation = null
    try{
        let doc = negotiationsRef.doc()
        const newDoc = {
          user_id,
          id: doc.id, 
          ...options
        }
        let responce = await doc.set(newDoc)
        negotiation = newDoc
    }catch(err){
      console.log('ERROR DURING ADD NEW NEGOTIATION',err)
      negotiation = null
    }finally{
      return negotiation
    }
  }

  async updateNegotiation(options = {}){
    const user_id = auth().currentUser?.uid;
    if(!user_id){
      return 
    }
    let successful = false
    try{
      const response = await negotiationsRef.doc(options.id).update({
        ...options
      })
      successful = true
    }catch(err){
      console.log('ERROR DURING updateNegotiation',err)
      successful = false
    }finally{
      return successful
    }
  }
  
  async addNegotiationMessage(negotiationId:string, message: Message){
    const user_id = auth().currentUser?.uid;
    if(!user_id){
      return 
    }
    let successful = false
    try{
      const response = await negotiationsRef
        .doc(negotiationId)
        .update({
            messages : firestore.FieldValue.arrayUnion(message)
        })
      successful = true
    }catch(err){
      console.log('ERROR DURING addNegotiationMessage',err)
      successful = false
    }finally{
      return successful
    }
  }

  async changePrice(id :string, price : number){
    let successful = false
    try{
      const response = await clothesRef.doc(id).update({
        price,
        status: constants.clothes_fields.status_field.image_cropped
      })
      successful = true
      Alert.alert('Price updated')
    }catch(err){
      
    }finally{
      return successful
    }

  }

  async setHolidayMode(holidaymode: boolean){
    const user = auth().currentUser;
    if(!user || !user.uid){
      return 
    }
    let successful = false
    try{
      const response = await usersRef.doc(user.uid).update({
        holidaymode,
      })
      this._store.dispatch(updateUser({holidaymode}))
      successful = true
    }catch(err){
      
    }finally{
      return successful
    }

  }

  async setNewPrice({product_id, newPrice}){
    const user_id = auth().currentUser?.uid;
    if(!user_id && !product_id){
      return 
    }
    let successful = false
    try{
      const response = await clothesRef.doc(product_id).update({
        newPrice,
      })
      successful = true
    }catch(err){
      
    }finally{
      return successful
    }

  }

  async updateInfo(){
      // //console.log('updateInfo for cart ...')
      // let cartItems = getCartitems(getState())
      // // //console.log('cartItems',cartItems)
      // // dispatch(setCartItems([]))
      // // if(typeof cartItems != 'array'){
      // //     return
      // // }
      // cartItems = cartItems.filter( c => c.id && c)
      // // //console.log('cartItems updateInfo - ',cartItems)
      // // //console.log('componentDidUpdate cartItems',cartItems)
      // if(cartItems.length == 0 ){
      //     return
      // }
      // dispatch(setCartLoading(true))
      // const promises =  cartItems.map(item => {
      //     return new Promise((resolve) => {
      //         Shop.
      //         getGood(item.id)
      //             .then(product => {
      //                 //console.log('product',item.id,product)
      //                 // ifproduct){
      //                 resolve({ ...item, ...product})
      //                 // }else{
      //                 //     resolve(null)
      //                 // }
      //             }).catch( _ => {
      //                 resolve(null)
      //             })
      //     })
    // })
    //console.log('await all ...')
    /* 
        TODO : Додати перевірку при оплаті, коли було 
        останнє оновлення ціни
    */
  //  let products = []
  //   try{
  //        products = await Promise.all(promises);
  //   }catch(err){
  //       //console.log('ERROR DUTING UPDATE CART ITEMS -',err)
  //   }
  //   products = products.filter( p => p != null)
  //   // //console.log('products updated -',products)
  //   dispatch(setCartItems(products))
  //   dispatch(setCartLoading(false))

    // this.props.setProducts(products);
  }

  /**
   * 
   * comment section
   */
  async postComment(text : string, productId: string, parentId: srting) {
      const user = auth().currentUser;
      if(!user || !user.uid){
        return {successfull}
      }
      if(!text || text.length == 0){
        return {successfull}
      }
      let successfull = false
      let phoneExp = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/img;
      let emailExp = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;
      let webLinkExp = /(https?:\/\/[^\s]+)/g;
      const phoneInclude = phoneExp.test(text)
      const emailInclude = emailExp.test(text)
      const urlIncude = webLinkExp.test(text)
      console.log('phoneInclude',phoneInclude)
      console.log('emailInclude',emailInclude)
      console.log('urlIncude',urlIncude)
      if(urlIncude === true || phoneInclude || emailInclude){
        DropdownAlertService.getDropDown().alertWithType('error','','You can\'t specify any contact information or urls')
        return {successfull}
      }
      // const phoneInclude = phoneExp.test(text)

      let userData =  getUser(this._store.getState())
      // let userDoc = await usersRef.doc(user.uid).get()
      // let userData : User = userDoc.data()

      let doc = commentsRef.doc()
      let ts = Date.now()
      const newComment = {
        id: doc.id,
        snippet: {
          productId,
          authorId : user.uid,
          textDisplay: text,
          textOriginal: text,
          parentId: parentId || "",
          canRate : false,
          moderationStatus : "onReview",
          publishedAt: moment(new Date(ts)).format(constants.publishedAtFormat),
          published_time: ts,
          updatedAt: moment(new Date(ts)).format(constants.updatedAtFormat),
          updated_time: ts,
        },
        user: {
          uid: user.uid,
          name: userData.name || "",
          last_name: userData.last_name || "",
          avatar: userData.avatar || "",
        },
        likes: [],
        dislikes: []
      }

      try{
          await doc.set({
            ...newComment,
            id: doc.id
          })
          successfull = true
      }catch(err){
        console.log('ERROR DURING POST COMMENT',err)
      }finally{
        return {
          successfull,
          item: newComment
        }
      }
  }
  
  async likeComment(id : string) {
    const user = auth().currentUser;
    let successfull = false
    if(!user || !user.uid){
      DropdownAlertService.getDropDown().alertWithType('error','','you must login first')
      return {successfull}
    }
    if(!id){
      console.log('no id',id)
      return {successfull}
    }
    console.log('id',id)
    try{
        await commentsRef.doc(id).update({
            likes: firestore.FieldValue.arrayUnion(user.uid),
            dislikes: firestore.FieldValue.arrayRemove(user.uid),
        })
        successfull = true
    }catch(err){
      console.log('ERROR DURING LIKE COMMENT',err)
    }finally{
      return {
        successfull,
        user_id : user.uid
      } 
    }
  }
  
  async unlikeComment(id : string) {
    const user = auth().currentUser;
    let successfull = false
    if(!user || !user.uid){
      DropdownAlertService.getDropDown().alertWithType('error','','you must login first')
      return {successfull}
    }
    if(!id){
      console.log('no id',id)
      return {successfull}
    }
    console.log('id',id)
    try{
        await commentsRef.doc(id).update({
            likes: firestore.FieldValue.arrayRemove(user.uid),
            dislikes: firestore.FieldValue.arrayUnion(user.uid),
        })
        successfull = true
    }catch(err){
      console.log('ERROR DURING DISLIKE COMMENT',err)
    }finally{
      return {
        successfull,
        user_id : user.uid
      } 
    }
  }

  /**
   * For alerts
   * 
   */
  async addAlert(alert: AlerType){
      let successful = false
      let item = {}
      const user = auth().currentUser;
      if(!user || !user.uid){
        return {
          successful : false,
          error: {
            message: 'Not authorized'
          }
        }
      }
      try{
        console.log('alert',alert)
        let fields = Object.entries(alert.fields).filter(([k,v]) => !!v)
        console.log('fields',fields)
        let query = firestore()
                .collection('alerts')
                .where('user_id','==',user.uid)
        
        fields.forEach(([k,v]) => {
          query = query.where(k,'==',v)
        })
        let snapshot = await query.get()
        /** if alert already exists */
        if(snapshot.size > 0){
          console.log('aler exist')
          return {
            successful,
            item
          }
        }
        console.log('snapshot',snapshot)

        let doc = firestore().collection('alerts').doc()
        await doc.set({
            ...alert,
            id: doc.id,
            user_id:  user.uid,
          })
          item = {
            ...alert,
            id: doc.id,
            user_id:  user.uid,
        }
        successful = true
      }catch(err){
        console.log('ERROR DURING ADD ALERT')
      }finally{
        return {
          successful,
          item
        }
      }
  }

  async removeAlert(item: AlertType){
    console.log('remove alert ',item)
      let successful = false
      try{
        let response = await firestore().collection('alerts').doc(item.id).delete().then()
        successful = true
      }catch(err){
        console.log('ERROR DURING REMOVE ALERT')
      }finally{
        return {
          successful
        }
      }
  }

  /** for holiday mode */
  async setHolidayStart(ts : number){
    const user_id = auth().currentUser?.uid;
    if(!user_id || !ts){
      return 
    }
    try{
        await usersRef.doc(user_id).update({
            holidaymodeStartTs: ts,
        })
        successfull = true
    }catch(err){
      console.log('ERROR DURING DISLIKE COMMENT',err)
    }finally{
      return {
        successfull,
      } 
    }
  }

  async setHolidayEnd(ts: number){
    const user_id = auth().currentUser?.uid;
    if(!user_id || !ts){
      return 
    }
    try{
        await usersRef.doc(user_id).update({
            holidaymodeEndTs: ts,
        })
        successfull = true
    }catch(err){
      console.log('ERROR DURING DISLIKE COMMENT',err)
    }finally{
      return {
        successfull,
      } 
    }
  }

  /** for notifications */
  async getUserNotifications(){
    let successful = false
    const user_id = auth().currentUser?.uid;
    let notifications = []
    if(!user_id){
      return notifications
    }
    try{
      console.log('user_id',user_id)
      let snapshot = await firestore()
            .collection(`users`)
            .doc(`${user_id}`)
            .collection(`notifications`)
            // .orderBy('created_time','a')
            .limit(50)
            .get()
      console.log('found notfcs',snapshot.size)
      snapshot.forEach( doc => {
        notifications.push(doc.data())
      })
      successful = true
    }catch(err){
      console.log('ERROR DURING getUserNotifications',err)
    }finally{
      return {
        successful,
        notifications
      }
    }
  }

  /**
   * For user 
   */

}

export default new ShopService();
