import * as Sentry from '@sentry/react-native';
import config from '../../config';

class SentryIoService {
  options = {};

  setOptions(options) {
    this.options = options;
  }

  init() {
    Sentry.config(config.SENTRY_DNS, this.options).install();
  }
}

export default new SentryIoService();
