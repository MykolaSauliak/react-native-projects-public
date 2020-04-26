import moment from 'moment'

export default function getLastActive(ts : number){
    return moment(new Date(ts)).format('DD MMMM')
}