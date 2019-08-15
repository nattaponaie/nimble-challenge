import { useState, useEffect, useRef } from 'react';
import {
  Form,
  Icon,
  Input,
  Alert,
} from 'antd';
import {
  func,
  shape,
  string,
} from 'prop-types';

import { GATEWAY_RECAPTCHA_SITE_KEY } from '../../../config';
import { RecaptchaSubmitButton } from '../../RecaptchaSubmitButton';
import { withNamespaces } from '../../../i18n';
import { requestResetPassword } from '../../../utils/auth';

import style from './PasswordResetForm.scss';

const PasswordResetForm = ({ t, redirect, form }) => {
  const { getFieldDecorator, validateFields } = form;
  const [alertMsg, setAlertMsg] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const autoFocusRef = useRef(null);
  useEffect(() => autoFocusRef.current.focus(), []);

  const verifyInputs = (callback) => {
    validateFields((err, values) => {
      if (!err) {
        callback(values);
      }
    });
  };

  const submitHandle = (recaptchaToken) => {
    verifyInputs(async (values) => {
      try {
        const { email } = values;
        await requestResetPassword({
          email,
          redirect,
          recaptchaToken,
        });
        setRequestSuccess(true);
      } catch (e) {
        setAlertMsg(t(e.message));
      }
    });
  };

  return requestSuccess ? (
    <center>{t('success')}</center>
  ) : (
    <Form className={style.resetForm} onSubmit={submitHandle}>
      {alertMsg ? (<Alert className={style.alertbox} message={alertMsg} type="error" showIcon closable onClose={() => setAlertMsg(null)} />) : (<p>{t('introduction')}</p>)}
      <Form.Item>
        {getFieldDecorator('email', {
          validate: [{
            trigger: 'onBlur',
            rules: [
              { required: true, message: t('emailFeedback') },
              { type: 'email', message: t('wrongEmailFormat') },
            ],
          }, {
            trigger: 'onChange',
            rules: [{ required: true, message: t('emailFeedback') }],
          }],
        })(
          <Input
            ref={autoFocusRef}
            prefix={<Icon type="mail" />}
            placeholder={t('email')}
            onChange={() => setAlertMsg(null)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        <RecaptchaSubmitButton
          sitekey={GATEWAY_RECAPTCHA_SITE_KEY}
          beforeChallenge={verifyInputs}
          onChallengePassed={submitHandle}
          text={t('resetPassword')}
          type="primary"
          className={style.button}
        />
      </Form.Item>
    </Form>
  );
};

PasswordResetForm.getInitialProps = () => ({
  namespacesRequired: ['component.auth.passwordresetform'],
});

PasswordResetForm.propTypes = {
  redirect: string,
  t: func.isRequired,
  form: shape({
    getFieldDecorator: func,
    validateFields: func,
  }).isRequired,
};

PasswordResetForm.defaultProps = {
  redirect: '',
};

export default withNamespaces('component.auth.passwordresetform')(Form.create({ name: 'passwordReset' })(PasswordResetForm));
