import {
  useEffect,
  useState,
} from 'react';
import { func } from 'prop-types';
import { Upload, Icon, message } from 'antd';
import Papa from 'papaparse';
import { head } from 'lodash';

import { withNamespaces } from '/i18n';
import { postKeywords, getKeywords } from 'services/keywordsService';

import style from './Upload.scss';

const { Dragger } = Upload;

const parseCsvFile = async (csv) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      worker: true,
      error: reject,
      complete: (results) => {
        const { data } = results;
        const keywords = data.map((d) => head(d));
        resolve(keywords);
      }
    });
  });
}

const useUpload = () => {
  const [uploadConfig, setUploadConfig] = useState();
  useEffect(() => {
    let keywordsData = {};
    setUploadConfig({
        name: 'file',
        accept: 'text/csv',
        showUploadList: false,
        async beforeUpload(file) {
          keywordsData = await parseCsvFile(file);
          console.log('keywordsData', keywordsData);
        },
        async customRequest() {
          try {
            const response = await postKeywords({ keywordsData });
            console.log('response', response);
            
          } catch {
            message.error('Internal server error');
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
