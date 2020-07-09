// declare namespace Notifications {
    export interface Notification {
        id: string,
        type: string,
        leftImage : string,
        rightImage : string,
        title : string,
        ts: number,
    }
    
    export interface NegotiationNotification {
        id: string,
        negotiation_id: string,
        type: string,
        leftImage : string,
        rightImage : string,
        title : string,
        ts: number
    }
    
    export interface ProductNotification {
        id: string,
        product_id: string,
        type: string,
        leftImage : string,
        rightImage : string,
        title : string,
        ts: number,
        
    }
    
    export interface FollowingNotification {
        id: string,
        user_id: string,
        type: string,
        leftImage : string,
        rightImage : string,
        title : string,
        ts: number
    }


    export interface LocalNotification {
        title: string,
        body?: string,
        foreground?: boolean,
    }
// } 