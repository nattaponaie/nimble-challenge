import axios from 'axios';
import {
  formatJson, formatResponse,
} from 'utils/jsonResolver';

import {
  API_DOMAIN,
  AXIOS_TIMEOUT,
} from '/config';
import { getAccessToken } from '/utils/auth';

export const instance = axios.create({
  baseURL: API_DOMAIN,
  timeout: AXIOS_TIMEOUT,
});

export const generateAuthToken = async () => {
  const accessToken = await getAccessToken();
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const createUrlPath = ({
  version, path, queryString,
}) => {
  let url = `${version}/${path}`;
  url += queryString ? `?${queryString}` : '';
  return url;
};

export const getRequest = async ({
  version = 'v1', path, queryString,
}) => new Promise(async (resolve, reject) => {
  const url = createUrlPath({
    version, path, queryString,
  });
  instance.get(url, {
    headers: {
      ...(await generateAuthToken()),
    },
  })
    .then((response) => resolve(formatJson(formatResponse(response))))
    .catch(error => reject(error));

});

export const postRequest = async ({
  version = 'v1', path, headers,
  type, attributes, queryString,
}) => new Promise(async (resolve, reject) => {
  const url = createUrlPath({ version, path, queryString });
  const body = {
    data: {
      type,
      attributes,
    },
  };

  instance.post(url, body, {
    headers: {
      ...headers,
      ...(await generateAuthToken()),
    },
  })
    .then(response => resolve(formatJson(formatResponse(response))))
    .catch(error => reject(error));
});
