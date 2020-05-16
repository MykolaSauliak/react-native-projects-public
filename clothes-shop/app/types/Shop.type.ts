/// <reference path="Negotiation.type.ts" />
export namespace Shop { 

    export interface Brand { 
        title: string,
        image: {
            src: string
        }
    }    

    export interface SellProduct {
        id : String,
        category : object,
    }
    
    export interface ProductImage { 
        title : 'photo1' | 'photo2' | 'photo3' | 'photo4' | 'photo5',
        src : String,
    }
    export type ProductUniverse = "man" | "woman" | "kids" | 'lifestyle'
    
    
    export enum Status {
        'image_cropped' = 0, 
        'price_reduction',
        'approved' ,
        'refused' ,
        'sold'
    }

    export enum SoldWith {
        'dustbag' = 0, 
    }

    export enum SaleStatus {
        'sold' = 0,
        'shipping',
        'delivery',
        'authentication',
        'payment',
    }

    export interface Product {
        id : string,
        created_time: number,
        category_name: string,
        category_id: string,
        brand_id: string,
        brand_name: string,
        type_name: string,
        type_id: string,
        subtype_id: string,
        subtype_name: string,
        description: string,
        material : string,
        country : string,
        color: string,
        printed: string,
        condition: string,
        warranty?: number,
        images: { src : string}[],
        price: number,
        discount?: number,
        discountEndTs?: number,
        currency: string,
        tags: {
            id: string,
            title: string,
        },
        shipping_country: string,
        universe?: ProductUniverse,
        seller: {

        },
        express_delivery: boolean,
        we_love: boolean,
        vintage: boolean,
        reputation : "trusted_seller" | "expert_seller"
        sale_status: SaleStatus,
        status: Status
        status_updated_at : {  [key in Status] : string},
        sold_with : {  [key in SoldWith] : boolean},
        approveNotificationSent: boolean,
        similar_items: string[],
        favorite_count: number,
        no_negotiation?: boolean,
    }
    
    export interface Address {
        id: string,
        title : 'Mr' | 'Mrs' | 'Company',
        first_name : string,
        last_name : string,
        company : string,
        phone_number : number,
        // street : string,
        // house : string,
        address : string,
        address_line_2 : string,
        postal_code : number,
        phone_country_code : string,
        city : string,
        countryCode: string,
        country: {
            name: string
        },
    }
    
    export interface Order { 
        id: string,
        items : Product[], 
        charge_id : string, 
        shippingAddress: Address,
        orderStatus : 'confirmed' | 'shipped' | 'recieved' | 'authentication' | 'sent', 
        email : string, 
        payment_details: any, 
        payment_status : string, 
        payment_method : string, 
        user_id : string, 
        amount : number, 
        createdAt : any, 
        updatedAt : any, 
        created_time : number, 
    }
}
