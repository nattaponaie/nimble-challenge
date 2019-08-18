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

const useUpload = () => {
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
            message.success('Upload file successfully!');
          } catch (error) {
            message.error('Internal server error!');
          }
        },
      });
  }, []);

  return {
    uploadConfig,
  };
};

const UploadPage = ({ t }) => {
  const { uploadConfig } = useUpload();
  return (
    <div className={style.container}>
      <h3>Upload a CSV file of keywords</h3>
      <Dragger {...uploadConfig}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support only .csv file type
        </p>
      </Dragger>
    </div>
  )
};

UploadPage.propTypes = {
  t: func.isRequired,
};

UploadPage.getInitialProps = () => ({
  namespacesRequired: ['page.upload'],
});

export default withNamespaces('page.upload')(UploadPage);
