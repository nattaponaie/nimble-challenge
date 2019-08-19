import { message } from 'antd';
import {
  useEffect,
  useState,
} from 'react';

import { getKeywords } from '/services/keywordsService';

export const tableColumn = ({ t }) => [
  {
    title: t('keyword'),
    dataIndex: 'keyword',
  },
  {
    title: t('totalAdwords'),
    dataIndex: 'totalAdwords',
  },
  {
    title: t('totalLinks'),
    dataIndex: 'totalLinks',
  },
  {
    title: t('totalResults'),
    dataIndex: 'totalResults',
  },
];

export const paginationConfig = {
  defaultPageSize: 15,
};

export const getAllKeywords = async () => {
  try {
    const response = await getKeywords();
    return response;
  } catch (error) {
    throw error;
  }
};

export const useKeyword = ({ t }) => {
  const [keywordData, setKeywordData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllKeywords();
        setKeywordData(response);
      } catch (error) {
        message.error(error.message);
      }
    })();
  }, []);

  return {
    keywordData,
    tableColumn: tableColumn({ t }),
    paginationConfig,
  };
};
