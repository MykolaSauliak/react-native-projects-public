import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Alert } from "react-native";
import {
  Shop, 
} from '../types/Shop.type'
import R from 'ramda';
import _ from 'lodash';
import constants from '../constants'
import moment from 'moment';
import { User, Order } from '../types/types';

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

interface  ShopServiceInterface {
    init : (store : any) => void
}

class ShopService implements ShopServiceInterface {
  _store = null;

  init(store){
    if(this._store){
      return
    }

    this._store = store
    const settings = {
      persistence: true,
      cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED,
    };
    firestore().settings(settings).catch(console.log)
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
    let succesfull = false
    if(!user || !user.uid){
      return 
    }
    if(!update){
      return 
    }

    try{
        const response = await usersRef.doc(user.uid).update({...update})
        succesfull = true
    }catch(err){
        succesfull = false
        console.log('updateUserInfo err',err)
    }finally{
        return succesfull
    }
  }

  async fetchItemsForSale(user_id  :string, createdAt : string){
    let items = []
    try{
        let query = clothesRef
              .where(constants.clothes_fields.user_id,'==',user_id)
              .where(constants.clothes_fields.status,'==','approved')
        
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
    let succesfull = false
    try{
        const response = await wishlistRef
                              .doc(user.uid)
                              .set({
                                [id]:true
                              }, {merge: true})
        // if(doc.exists){
        //   following = doc.data()
        // }
        succesfull=true
            // //console.log(doc.data())
    }catch(err){
        console.log('addToWishlist',err)
        // Alert.alert()
    }finally{
        return succesfull
    }
  }
  

  async removeFromWishlist(id : string){
      const user = auth().currentUser;
      if(!user || !user.uid){
        return
      }
      let succesfull = false
      try{
          const response = await wishlistRef
                                .doc(user.uid)
                                .set({
                                  [id]:false
                                }, {merge: true})
          // if(doc.exists){
          //   following = doc.data()
          // }
          succesfull=true
              // //console.log(doc.data())
      }catch(err){
          console.log('removeFromWishlist',err)
          // Alert.alert()
      }finally{
          return succesfull
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
    let succesfull = false
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
        succesfull=true
            // //console.log(doc.data())
    }catch(err){
        console.log('ERROR addToFavorites',err)
        // Alert.alert()
    }finally{
        return succesfull
    }
  }

  async removeFromFavorites(id : string){
      const user = auth().currentUser;
      if(!user || !user.uid){
        return
      }
      let succesfull = false
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
          succesfull=true
              // //console.log(doc.data())
      }catch(err){
          console.log('ERROR removeFromFavorites',err)
          // Alert.alert()
      }finally{
          return succesfull
      }
  }


  /** Followers and followed */
  async addFollowing(followed_user_id : string){
    const user = auth().currentUser;
    if(!user || !user.uid){
      return
    }
    let succesfull = false
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
        succesfull=true
            // //console.log(doc.data())
    }catch(err){
        console.log('addFollowing',err)
        // Alert.alert()
    }finally{
        return succesfull
    }
  }

  async removeFollowing(followed_user_id){
      const user = auth().currentUser;
      if(!user || !user.uid){
        return
      }
      let succesfull = false
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
          succesfull=true
              // //console.log(doc.data())
      }catch(err){
          console.log('addFollowing',err)
          // Alert.alert()
      }finally{
          return succesfull
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

  async getGoods(options = {}, time = {}, limit){
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
      if(time.createdAt){
        query = query.where('createdAt','>=',time.createdAt)
      }
      if(limit){
        query = query.limit(limit)
      }
      // console.log('query',query)
      snapshot = await query.orderBy('createdAt', "desc").get()
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
    let res =  await this.getGoods({
      [constants.clothes_fields.status] : Shop.Status[2]
    })
    return res
  }

  async getPriceReductionItems(){
    let res =  await this.getGoods({
      [constants.clothes_fields.status] : Shop.Status[1]
    })
    return res
  }

  async getNotConfirmedItems(){
    let res =  await this.getGoods({
      [constants.clothes_fields.status] : Shop.Status[0]
    })
    return res
  }

  async getRefusedItems(){
    let res =  await this.getGoods({
      [constants.clothes_fields.status] : Shop.Status[3]
    })
    return res
  }

  async getSoldItems(){
    let res =  await this.getGoods({
      [constants.clothes_fields.status] : Shop.Status[4]
    })
    return res
  }

  // async getUnreceivedItems(){
  //   let res =  await this.getGoods({
  //     [constants.clothes_fields.status] : Shop.Status.
  //   })
  //   return res
  // }

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
    created_time,  
    payment_method, 
    amount,
    token,
    orderStatus  = 'confirmed',
    ...otherProps
  } : {token:string} & Order){

    const user = auth().currentUser;
    
    if (!user) {
      return
    //  console.log('User email: ', user.email');
    }
    try{
         
      let orderDoc =  ordersRef.doc()
      let chargeDoc = firestore().collection('stripe_customers').doc(user.uid).collection('charges').doc()
      await orderDoc.set({
          user_id : user.uid,
          email : user.email,
          // payment_email : email,
          amount,
          charge_id : chargeDoc.id,
          id: orderDoc.id,
          items,
          shippingAddress,
          created_time,  
          payment_method, 
          orderStatus,
          ...otherProps
      })
      await chargeDoc.set({
          id: chargeDoc.id,
          amount:  Math.floor(amount),
          source:  token,
      })
      return true
    }catch(err){
      return false
        //console.log('ERROR DURING CREATING ORDER',err)
    }
  }

  async getMyOrders(){
    let orders = []
    let count = 0
    try{
      const user_id = auth().currentUser.uid;
      // console.log('user_id',user_id)
      const snapshot = await ordersRef.where('user_id','==',user_id).get()
      // console.log('snapshot',snapshot)
      snapshot.forEach(s => {
        orders.push(s.data())
      })
      count = snapshot.size
      // console.log('orders length - ',orders.length)
    }catch(err){

    }finally{
      return {
        count,
        items: orders
      }
    }
  }

  async createProduct(options : Shop.Product){
    let succesfull = false
    Alert.alert('Wait, creating product...')
    const user = auth().currentUser
    if(!user){
      return Alert.alert('You must login firstly')
    }
    let imagesPromises = []
    for(let i=1;i<6;i++){
      let photo = options['photo'+i]
      if(photo){
        imagesPromises.push(new Promise((resolve) => {
          try{
            const storageForDefaultApp = storage();
            storageForDefaultApp
              .ref('images/'+ user.uid + '_' + Date.now())
              .putFile(photo.path)
              .then(async file => {
                // console.log('file',file)
                  let fullPath = file.metadata.fullPath
                  let downloadedURL = await storageForDefaultApp.ref(fullPath).getDownloadURL()
                  // console.log('downloaded link ',downloadedURL)
                  resolve({
                    title : 'photo'+i,
                    src : downloadedURL   
                  })
              }).catch( err => {
                resolve({name :'photo'+i, url : null})
              })
          }catch(err){
            console.log('ERROR',err)
          }  
        }))
      }
    }

    const images : Shop.ProductImage[] = await Promise.all(imagesPromises)
    try{
      const response = await clothesRef.add({
        ...options,
        photo1: null,
        photo2: null,
        photo3: null,
        photo4: null,
        photo5: null,
        images,
        user_id : R.path(['uid'], user),
        createdAt : Date.now(),
        created_time : Date.now(),
        updatedAt : Date.now(),
        status : "image_cropped",
        express_delivery: false,
        we_love: false,
        vintage: false,
      })
      await clothesRef.doc(response.id).update({
        id: response.id
      })
      succesfull = true
      Alert.alert('Submitted for review')
    }catch(err){
      // console.log('ERROR DURING CREATING PRODUCT ',err)
      Alert.alert('There was an loading error')
      succesfull = false
    }
    finally{
      return succesfull
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

    }finally{
      console.log('fetched negotiation',negotiation)
      return negotiation
    }
  }

  async getNegotiations(options = {}, time = {}, limit = null){
      // if()
      console.log('options',options)
      // console.log('time',time)
      let negotiations = [];
      let count = null;
      try{
        let snapshot;
        let query = negotiationsRef
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
    let user = auth().currentUser
    if(!user || !user.uid){
      Alert.alert('Firstly login')
      return 
    }
    let response = await this.getNegotiations({
      user_id : user.uid
    })
    return response
  }

  async getReceivedOffer(){
    let user = auth().currentUser
    if(!user || !user.uid){
      Alert.alert('Firstly login')
      return 
    }
    let response = await this.getNegotiations({
      [constants.negotiations_field.seller_id] : user.uid,
      [constants.negotiations_field.answered] : false,
    })
    return response
  }

  async createNegotiation(options = {}){
    console.log('createNegotiation')
    const user = auth().currentUser;
    if(!user || !user.uid){
      return 
    }
    let negotiation = null
    try{
        let doc = negotiationsRef.doc()
        const newDoc = {
          id: doc.id, 
          user_id : user?.uid,
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
    const user = auth().currentUser;
    if(!user || !user.uid){
      return 
    }
    let succesfull = false
    try{
      const response = await negotiationsRef.doc(options.id).update({
        isAccepted : options.isAccepted,
        answered : true,
        answeredAt : Date.now(),
      })
      succesfull = true
    }catch(err){
      console.log('ERROR DURING updateNegotiation',err)
      succesfull = false
    }finally{
      return succesfull
    }
  }

  async changePrice(id :string, price : number){
    let succesfull = false
    try{
      const response = await clothesRef.doc(id).update({
        price,
        status: constants.clothes_fields.status_field.image_cropped
      })
      succesfull = true
      Alert.alert('Price updated')
    }catch(err){
      
    }finally{
      return succesfull
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
      return 
    }
    let userDoc = await usersRef.doc(user.uid).get()
    let userData : User = userDoc.data()

    let successfull = false
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
    if(!user || !user.uid){
      return 
    }
    if(!id){
      console.log('no id',id)
      return 
    }
    console.log('id',id)
    let successfull = false
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
    if(!user || !user.uid){
      return 
    }
    if(!id){
      console.log('no id',id)
      return 
    }
    console.log('id',id)
    let successfull = false
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


}

export default new ShopService();
