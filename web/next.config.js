const withSass = require('@zeit/next-sass');
const antdLessLoader = require('next-antd-aza-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/antd-custom.less'), 'utf8'),
);

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => { };
}

module.exports = {
  ...withSass(antdLessLoader({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
    exportPathMap: () => ({
      '/': { page: '/index' },
      '/account/login': { page: '/account/login' },
      '/account/register': { page: '/account/register' },
    }),
  })),
  publicRuntimeConfig: { // will be available on both server and client
    ASSET_PREFIX: process.env.ASSET_PREFIX || '',
    GATEWAY_RECAPTCHA_SITE_KEY: process.env.GATEWAY_RECAPTCHA_SITE_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT: process.env.FIREBASE_PROJECT,
    AXIOS_TIMEOUT: process.env.AXIOS_TIMEOUT,
    API_DOMAIN: process.env.API_DOMAIN,
  },
};
