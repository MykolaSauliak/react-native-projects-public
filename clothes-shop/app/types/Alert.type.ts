export interface Alert {
    id: string,
    created_time: number,
    created_date: string, //DD-MM-YYYY
    received_time : 'every day',
    recieved_way: 'by_notification' | 'by_email'
    fields : {
        [key: string] : boolean
    }
}