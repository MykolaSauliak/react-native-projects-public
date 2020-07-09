import * as R from 'ramda';

export const getAlerts = state =>
  R.path(['alerts', 'alerts'], state) || [];
export const alertExists = ({alert = {},alerts = [],state}) => {
  if(!alerts && state){
    alerts =   R.path(['alerts', 'alerts'], state) || [];
  }
  let exists = false
  for (let index = 0; index < alerts.length; index++) {
    const a = alerts[index];
    if(a.fields.brand_name == alert.fields.brand_name
      && a.fields.type_name == alert.fields.type_name
      && a.fields.category_name == alert.fields.category_name
      && a.fields.color == alert.fields.color
      && a.fields.material == alert.fields.material
      ){
       exists = true
       return exists
      }
  }
  return exists
}

