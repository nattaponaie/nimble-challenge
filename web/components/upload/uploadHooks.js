import { message } from 'antd';
import { isEmpty } from 'lodash';
import {
  useEffect,
  useState,
} from 'react';

import { postKeywords } from '/services/keywordsService';
import { parseCsvFile } from '/utils/papaParse';

export const generateUploadConfig = (t) => {
  let keywordsData = {};
  return {
    name: 'file',
    accept: 'text/csv',
    showUploadList: false,
    async beforeUpload(file) {
      try {
        keywordsData = await parseCsvFile(file);
      } catch (error) {
        message.error(error);
      }
    },
    async customRequest() {
      if(isEmpty(keywordsData)) return;
      try {
        await postKeywords({ keywordsData });
        message.success(t('uploadSuccess'));
      } catch (error) {
        message.error(error.message);
      }
    },
  };
};

export const useUpload = ({ t }) => {
  const [uploadConfig, setUploadConfig] = useState({});
  useEffect(() => {
    setUploadConfig(generateUploadConfig(t));
  }, []);

  return {
    uploadConfig,
  };
};
