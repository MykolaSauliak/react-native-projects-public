
export interface Negotiation {
    id: string,
    user_id: string,
    product_id: string,
    brand_name: string,
    subtype_name: string,
    type_name: string,
    color: string,
    offer_price : number,
    currency: string,
    seller_id : string,
    createdAt: number,
    created_time: number,
    isAccepted: boolean | null,
    answered : boolean,
    answeredAt : number,
    answered_time : number,
}


