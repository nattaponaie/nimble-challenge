import {
 message,Table,
} from 'antd';
import { isNil } from 'lodash';
import { func } from 'prop-types';
import {
 useEffect,useState,
} from 'react';

import Upload from '/components/upload';
import { ASSET_PREFIX } from '/config';
import { withNamespaces } from '/i18n';
import { getKeywords } from '/services/keywordsService';

import style from './home.scss';

const columns = (t) => [
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

const paginationConfig = {
  defaultPageSize: 15,
};

const useKeyword = () => {
  const [keywordData, setKeywordData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getKeywords();
        setKeywordData(response);
      } catch (error) {
        message.error(error.message);
      }
    })();
  }, []);

  return {
    keywordData,
  };
};

const HomePage = ({ t }) => {
  const { keywordData } = useKeyword();
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img className={style.imgLogo} src={`${ASSET_PREFIX}/static/favicon.png`} alt="logo" />
      </div>
      <Upload />
      <Table
        className={style.table}
        columns={columns(t)}
        dataSource={keywordData}
        pagination={paginationConfig}
        loading={isNil(keywordData)}
      />
    </div>
  );
};

HomePage.propTypes = {
  t: func.isRequired,
};

HomePage.getInitialProps = () => ({
  allowAnonymous: false,
  namespacesRequired: ['page.home'],
});

export default withNamespaces('page.home')(HomePage);
