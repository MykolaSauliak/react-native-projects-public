// import RNLanguages from 'react-native-languages';
import * as RNLocalize from 'react-native-localize';
import I18n from './vendor/i18n';

I18n.initAsync = async () => {
  try {
    const locales = RNLocalize.getLocales();
    let languageCode = locales[0].languageCode;
    I18n.locale = languageCode;
    // I18n.locale = (locale) ? locale.replace(/_/, '-') : '';
  } catch (err) {
    I18n.locale = 'en';
  }
};

export default I18n;
