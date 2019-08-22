import { message } from 'antd';
import {
  isEmpty, union,
} from 'lodash';
import {
  useEffect,
  useState,
} from 'react';

import { postKeywords } from '/services/keywordsService';
import { generateKeyword } from '/utils/keywordHelper';
import { parseCsvFile } from '/utils/papaParse';

export const generateUploadConfig = ({
  t,
  keywordData,
  setKeywordData,
  parsedKeywordsData,
  setParsedKeywordsData,
}) => {
  return {
    name: 'file',
    accept: 'text/csv',
    showUploadList: false,
    async beforeUpload(file) {
      try {
        parsedKeywordsData = await parseCsvFile(file);
        setParsedKeywordsData(parsedKeywordsData);
      } catch (error) {
        message.error(error);
      }
    },
    async customRequest() {
      if(isEmpty(parsedKeywordsData)) return;
      try {
        await postKeywords({ parsedKeywordsData });
        setKeywordData(union(generateKeyword(parsedKeywordsData), keywordData));
        message.success(t('uploadSuccess'));
      } catch (error) {
        message.error(error.message);
      }
    },
  };
};

export const useUpload = ({ t, keywordData, setKeywordData }) => {
  const [uploadConfig, setUploadConfig] = useState({});
  const [parsedKeywordsData, setParsedKeywordsData] = useState({});
  useEffect(() => {
    setUploadConfig(generateUploadConfig({
      t,
      keywordData,
      setKeywordData,
      parsedKeywordsData,
      setParsedKeywordsData,
    }));
  }, [keywordData]);

  return {
    uploadConfig,
    parsedKeywordsData,
  };
};
