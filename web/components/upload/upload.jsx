import {
  useEffect,
  useState,
} from 'react';
import { func } from 'prop-types';
import { isEmpty } from 'lodash';
import { Upload, Icon, message } from 'antd';
import { withNamespaces } from '/i18n';
import { postKeywords } from '/services/keywordsService';
import { parseCsvFile } from '/utils/papaParse';

import style from './upload.scss';

const { Dragger } = Upload;

const useUpload = (t) => {
  const [uploadConfig, setUploadConfig] = useState();
  useEffect(() => {
    let keywordsData = {};
    setUploadConfig({
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
      });
  }, []);

  return {
    uploadConfig,
  };
};

const UploadPage = ({ t }) => {
  const { uploadConfig } = useUpload(t);
  return (
    <div className={style.container}>
      <h3>{t('draggerTitle')}</h3>
      <Dragger {...uploadConfig}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{t('uploadText')}</p>
        <p className="ant-upload-hint">
          {t('uploadHint')}
        </p>
      </Dragger>
    </div>
  )
};

UploadPage.propTypes = {
  t: func.isRequired,
};

UploadPage.getInitialProps = () => ({
  namespacesRequired: ['component.upload'],
});

export default withNamespaces('component.upload')(UploadPage);
