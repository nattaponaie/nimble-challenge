import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
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

import { withNamespaces } from '../../../i18n';
import { requestResetPasswordConfirm } from '../../../utils/auth';

import style from './PasswordResetConfirmForm.scss';

const PasswordResetConfirmForm = ({
  t,
  form,
  token,
  redirect,
}) => {
  const { getFieldDecorator, validateFields } = form;
  const [alertMsg, setAlertMsg] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const verifyInputs = (callback) => {
    validateFields((err, values) => {
      if (!err) {
        callback(values);
      }
    });
  };

  const submitHandle = () => {
    verifyInputs(async (values) => {
      try {
        const { password } = values;
        await requestResetPasswordConfirm({
          token,
          newPassword: password,
        });
        setRequestSuccess(true);
      } catch (e) {
        setAlertMsg(t(e.message));
      }
    });
  };

  return requestSuccess ? (
    <center>
      <p>{t('success')}</p>
      <Link href={`/account/login${redirect ? `?r=${redirect}` : ''}`}><a>{t('backToLogin')}</a></Link>
    </center>
  ) : (
    <Form className={style.resetForm} onSubmit={submitHandle}>
      {alertMsg ? (<Alert className={style.alertbox} message={alertMsg} type="error" showIcon closable onClose={() => setAlertMsg(null)} />) : (<p>{t('introduction')}</p>)}
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: t('passwordFeedback') },
            { pattern: /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/, message: t('passwordPolicyFeedback') },
          ],
        })(
          <Input.Password
            prefix={<Icon type="lock" />}
            type="password"
            placeholder={t('password')}
            onChange={() => setAlertMsg(null)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('repassword', {
          validate: [{
            trigger: 'onChange',
            rules: [
              { required: true, message: t('repasswordFeedback') },
              {
                validator: (rule, value, callback) => {
                  if (value && value !== form.getFieldValue('password')) {
                    callback(t('repasswordFeedback'));
                  } else {
                    callback();
                  }
                },
              },
            ],
          }],
        })(
          <Input.Password
            prefix={<Icon type="lock" />}
            type="password"
            placeholder={t('repassword')}
            onChange={() => setAlertMsg(null)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button onClick={submitHandle} type="primary" className={style.button}>{t('confirmPassword')}</Button>
      </Form.Item>
    </Form>
  );
};

PasswordResetConfirmForm.getInitialProps = () => ({
  namespacesRequired: ['component.auth.passwordresetconfirmform'],
});

PasswordResetConfirmForm.propTypes = {
  token: string,
  redirect: string,
  t: func.isRequired,
  form: shape({
    getFieldDecorator: func,
    validateFields: func,
  }).isRequired,
};

PasswordResetConfirmForm.defaultProps = {
  token: '',
  redirect: '',
};

export default withNamespaces('component.auth.passwordresetconfirmform')(Form.create({ name: 'passwordResetConfirm' })(PasswordResetConfirmForm));
