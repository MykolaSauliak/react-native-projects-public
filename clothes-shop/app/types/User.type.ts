
export interface User {
    uid: string,
    name: string,
    last_name: string,
    avatar: string,
    quick_shipping: boolean,
    last_active: number,
    sold_item: number,
    receive_negotiation: 'all' | 'neither' | 'choose',
    stats: {
        [key: string]: { // for dates
            [key: string]: {
                
            }
        }
    }
    conformity: 70, // so we can check if there are any changes 
    shipping: 70,
}

