import axios from 'axios';

export default class API {
  constructor() {
    ['get', 'post', 'put', 'delete'].forEach((method) => {
      this[method] = (config, { testMode } = { testMode: false }) => {
        const conf = config;
        conf.method = method;

        if (conf.token) {
          conf.headers = { Authorization: `Bearer ${conf.token}` };
        }

        return testMode ? conf : axios(conf);
      };
    });
  }
}
