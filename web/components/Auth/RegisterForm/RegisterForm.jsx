import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
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

import { GATEWAY_RECAPTCHA_SITE_KEY } from '/config';
import RecaptchaSubmitButton from '/components/recaptchaSubmitButton';
import { withNamespaces } from '/i18n';
import { register } from '/utils/auth';

import style from './registerForm.scss';

const RegisterForm = ({ t, redirect, form }) => {
  const { getFieldDecorator, setFieldsValue, validateFields } = form;
  const [alertMsg, setAlertMsg] = useState(null);

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
        const { email, username, password } = values;
        await register({
          email,
          username,
          password,
          recaptchaToken,
        });
        Router.replace(`/account/login${redirect ? `?r=${redirect}` : ''}`);
      } catch (e) {
        setAlertMsg(t(e.message));
      }
    });
  };

  return (
    <Form className={style.registerForm} onSubmit={submitHandle}>
      {alertMsg ? (<Alert className={style.alertbox} message={alertMsg} type="error" showIcon closable onClose={() => setAlertMsg(null)} />) : null}
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
            className={style.input}
            ref={autoFocusRef}
            prefix={<Icon type="mail" />}
            placeholder={t('email')}
            onChange={(e) => {
              setFieldsValue({ username: e.target.value });
              setAlertMsg(null);
            }}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('username')(
          <Input
            className={style.input}
            disabled
            prefix={<Icon type="user" />}
            placeholder={t('username')}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: t('passwordFeedback') },
            { pattern: /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/, message: t('passwordPolicyFeedback') },
          ],
        })(
          <Input.Password
            className={style.input}
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
            className={style.input}
            prefix={<Icon type="lock" />}
            type="password"
            placeholder={t('repassword')}
            onChange={() => setAlertMsg(null)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        <RecaptchaSubmitButton
          sitekey={GATEWAY_RECAPTCHA_SITE_KEY}
          beforeChallenge={verifyInputs}
          onChallengePassed={submitHandle}
          text={t('register')}
          type="primary"
          className={style.button}
        />
        {`${t('alreadyUser')} `}
        <Link href={`/account/login${redirect ? `?r=${redirect}` : ''}`}><a>{t('login')}</a></Link>
      </Form.Item>
    </Form>
  );
};

RegisterForm.getInitialProps = () => ({
  namespacesRequired: ['component.auth.registerform'],
});

RegisterForm.propTypes = {
  redirect: string,
  t: func.isRequired,
  form: shape({
    getFieldDecorator: func,
    validateFields: func,
    setFieldsValue: func,
  }).isRequired,
};

RegisterForm.defaultProps = {
  redirect: '',
};

export default withNamespaces('component.auth.registerform')(Form.create({ name: 'register' })(RegisterForm));
