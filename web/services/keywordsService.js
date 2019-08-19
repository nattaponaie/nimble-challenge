import { get } from 'lodash';

import {
  getRequest,
  postRequest,
} from '/utils/httpHelper';

const RESOURCE = 'upload-file';

export const postKeywords = async ({ keywordsData }) => {
  try {
    const response = await postRequest({
      path: RESOURCE,
      attributes: {
        keywords_data: keywordsData,
      },
    });
    return response;
  } catch(error) {
    throw error;
  }
};

export const getKeywords = async () => {
  try {
    const response = await getRequest({ path: RESOURCE });
    const { data } = response;
    const dataSource = data.map((element) => {
      return {
        key: get(element, 'id'),
        keyword: get(element, ['attributes', 'keyword']),
        totalAdwords: get(element, ['attributes', 'total-adwords']),
        totalLinks: get(element, ['attributes', 'total-links']),
        totalResults: get(element, ['attributes', 'total-results']),
      };
    });
    return dataSource;
  } catch (error) {
    throw error;
  }
};
