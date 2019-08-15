const { parsed: environment } = require('dotenv').config();
const { EnvironmentPlugin } = require('webpack');
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
    webpack: (nextConfig) => {
      nextConfig.plugins.push(new EnvironmentPlugin(environment));
      return nextConfig;
    },
    exportPathMap: () => ({
      '/': { page: '/index' },
      '/account/login': { page: '/account/login' },
      '/account/register': { page: '/account/register' },
    }),
  })),
  publicRuntimeConfig: { // will be available on both server and client
    ASSET_PREFIX: process.env.ASSET_PREFIX || '',
    API_PREFIX: process.env.API_PREFIX || 'http://localhost:8080/api',
    GATEWAY_PREFIX: process.env.GATEWAY_PREFIX || 'http://localhost',
    GATEWAY_RECAPTCHA_SITE_KEY: process.env.GATEWAY_RECAPTCHA_SITE_KEY,
    DEV_MODE: process.env.NODE_ENV === 'development',
  },
};
