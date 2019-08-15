import getConfig from 'next/config';

export const {
  publicRuntimeConfig: {
    ASSET_PREFIX,
    API_PREFIX,
    GATEWAY_PREFIX,
    GATEWAY_RECAPTCHA_SITE_KEY,
    DEV_MODE,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT,
    AXIOS_TIMEOUT,
    API_DOMAIN,
  },
} = getConfig();

export const AUTH_PREFIX = `${GATEWAY_PREFIX}/auth`;
