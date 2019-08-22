import { Table } from 'antd';
import { isNil } from 'lodash';
import { func } from 'prop-types';

import Upload from '/components/upload';
import { ASSET_PREFIX } from '/config';
import { withNamespaces } from '/i18n';
import { useKeyword } from '/pages/home/homeHooks';

import style from './home.scss';

const HomePage = ({ t }) => {
  const { keywordData, tableColumn, paginationConfig, setKeywordData } = useKeyword({ t });
  const uploadProps = {
    keywordData,
    setKeywordData,
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img className={style.imgLogo} src={`${ASSET_PREFIX}/static/favicon.png`} alt="logo" />
      </div>
      <Upload {...uploadProps} />
      <Table
        className={style.table}
        columns={tableColumn}
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
