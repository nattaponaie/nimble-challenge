import {
  Icon, Upload,
} from 'antd';
import { func } from 'prop-types';

import { useUpload } from '/components/upload/uploadHooks';
import { withNamespaces } from '/i18n';

import style from './upload.scss';

const { Dragger } = Upload;

const UploadPage = ({
  t,
  keywordData,
  setKeywordData,
}) => {
  const { uploadConfig } = useUpload({ t, keywordData, setKeywordData });

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
  );
};

UploadPage.propTypes = {
  t: func.isRequired,
};

UploadPage.getInitialProps = () => ({
  namespacesRequired: ['component.upload'],
});

export default withNamespaces('component.upload')(UploadPage);
