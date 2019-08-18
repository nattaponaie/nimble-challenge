import axios from 'axios';
import {
  get,
  isNil,
} from 'lodash';

import {
  API_DOMAIN,
  AXIOS_TIMEOUT,
} from '/config';
import { getAccessToken } from '/utils/auth';

const instance = axios.create({
  baseURL: API_DOMAIN,
  timeout: AXIOS_TIMEOUT,
});

const generateAuthToken = async () => {
  const accessToken = await getAccessToken();
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const createFullUrl = ({
  version, path, id,
}) => {
  let url = `${version}/${path}`;
  url += !isNil(id) ? `/${id}` : '';

  return url;
};

const getRequest = async ({
  version = 'v1', path, headers,
  id, queryString,
}) => new Promise(async (resolve, reject) => {
  const url = createFullUrl({
    version, path, id, queryString,
  });
  instance.get(url, {
    headers: {
      ...headers,
      ...(await generateAuthToken()),
    },
  })
    .then((response) => resolve(get(response, ['data'])))
    .catch(error => reject(new Error(`GET ${path} ${error.message}`)));
});

const postRequest = async ({
  version = 'v1', path, headers,
  type, attributes, queryString,
}) => new Promise(async (resolve, reject) => {
  const url = createFullUrl({ version, path, queryString });
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
    .then(response => resolve(get(response, ['data'])))
    .catch(error => reject(new Error(`POST ${path} ${error.message}`)));
});

export {
  getRequest,
  postRequest,
};
