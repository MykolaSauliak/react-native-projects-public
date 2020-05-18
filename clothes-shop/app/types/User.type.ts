
export interface User {
    uid: string,
    name: string,
    last_name: string,
    avatar: string,
    quick_shipping: boolean,
    last_active: number,
    sold_item: number,
    receive_negotiation: 'all' | 'neither' | 'choose',
}

