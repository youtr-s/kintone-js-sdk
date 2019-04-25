/* eslint-disable no-undef */
const PACKAGE_FILE = require('../../package');
module.exports = {
  PASSWORD_AUTH: 'X-Cybozu-Authorization',
  API_TOKEN: 'X-Cybozu-API-Token',
  DOMAIN: 'sample.cybozu.com',
  USERNAME: 'your_username',
  PASSWORD: 'your_password',
  PROXY_HOST: 'your_proxy',
  PROXY_PORT: '3128',
  API_TOKEN_VALUE: 'Api_token_value',
  GUEST_SPACEID: 1,
  MAX_VALUE: 2147483647,
  MAIN_PATH_BASE: '../../../../src/base/main',
  MAIN_PATH_NODE: '../../../../src/node/main',
  USER_AGENT: `${PACKAGE_FILE.name}/${PACKAGE_FILE.version}`,
  ERROR_MESSAGE: '../../../resource/kintoneErrorMessage.json',
  getPasswordAuth: (userName, password) => {
    return Buffer.from(userName + ':' + password).toString('base64');
  },
  generateRecord: (number, inputRecord) => {
    const items = [];
    for (let i = 0; i < number; i++) {
      items.push(inputRecord);
    }

    return items;
  },
  serializeParams: (object) => {
    const parseParams = (obj, prefix) => {
      const queryArray = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          let subPrefix = '';
          if (Array.isArray(obj)) {
            subPrefix = prefix ? prefix + '[' + key + ']' : key;
          } else {
            subPrefix = prefix ? prefix + '.' + key : key;
          }
          const value = obj[key];
          if (value !== undefined) {
            queryArray.push(
              (value !== null && typeof value === 'object') ? parseParams(value, subPrefix) : subPrefix + '=' + encodeURIComponent(value)
            );
          }
        }
      }
      return queryArray.join('&');
    };

    return parseParams(object);
  }
};
