import { get } from 'lodash';

import {
  getRequest,
  postRequest,
} from '/utils/httpHelper';

const RESOURCE = 'keywords';

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
    const response = await getRequest({
      path: RESOURCE,
      queryString: 'include=report',
    });
    const { keyword, report } = response;
    const dataSource = keyword.map((element) => {
      const id = get(element, 'id');
      const reportData = report.find(report => report.id === id);
      return {
        key: id,
        keyword: get(element, 'keywordName'),
        totalAdwords: get(reportData, 'totalAdwords'),
        totalLinks: get(reportData, 'totalLinks'),
        totalResults: get(reportData, 'totalResults'),
      };
    });

    return dataSource;
  } catch (error) {
    throw error;
  }
};
