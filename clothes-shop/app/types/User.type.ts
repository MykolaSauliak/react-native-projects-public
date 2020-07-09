
export interface User {
    uid: string,
    name: string,
    last_name: string,
    avatar: string,
    quick_shipping: boolean,
    last_active: number,
    notOpenedNotifications: number,
    holidaymode?: boolean,
    holidaymodeStartTs?: number,
    holidaymodeEndTs?: number,
    receive_negotiation: 'all' | 'neither' | 'choose',
    stats: {
        [key: string]: { // for dates
            [key: string]: {
                
            }
        }
    },
    volume: number,
    conformity: number, // s 
    shipping: number, // between 0 and 1
}

