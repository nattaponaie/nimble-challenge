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
      const response = await getAllKeywords();
      setKeywordData(response);
    })();
  }, []);

  return {
    keywordData,
    setKeywordData,
    tableColumn: tableColumn({ t }),
    paginationConfig,
  };
};
