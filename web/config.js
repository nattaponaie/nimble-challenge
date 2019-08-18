import getConfig from 'next/config';

export const {
  publicRuntimeConfig: {
    ASSET_PREFIX,
    GATEWAY_RECAPTCHA_SITE_KEY,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT,
    AXIOS_TIMEOUT,
    API_DOMAIN,
  },
} = getConfig();
