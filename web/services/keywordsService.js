import {
  postRequest,
  getRequest,
} from '/utils/httpHelper';

const RESOURCE = 'upload-file';

export const postKeywords = async ({ keywordsData }) => {
  const keywords = await postRequest({
    path: RESOURCE,
    attributes: {
      keywords_data: keywordsData,
    }
  });
  return keywords;
};

export const getKeywords = async () => {
  const keywords = await getRequest({
    path: RESOURCE,
  });
  return keywords;
};
