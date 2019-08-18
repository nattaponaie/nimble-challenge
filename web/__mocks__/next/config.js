module.exports = () => ({
  publicRuntimeConfig: {
    ASSET_PREFIX: process.env.ASSET_PREFIX,
    GATEWAY_RECAPTCHA_SITE_KEY: process.env.GATEWAY_RECAPTCHA_SITE_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT: process.env.FIREBASE_PROJECT,
    AXIOS_TIMEOUT: process.env.AXIOS_TIMEOUT,
    API_DOMAIN: process.env.API_DOMAIN,
  },
});
