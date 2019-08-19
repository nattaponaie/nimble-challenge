import {
  Alert,
  Button,
  Form,
  Icon,
  Input,
} from 'antd';
import Link from 'next/link';
import router from 'next/router';
import {
  func,
  shape,
  string,
} from 'prop-types';
import { useState } from 'react';

import { ASSET_PREFIX } from '/config';
import { withNamespaces } from '/i18n';
import {
  login, signInWithGoogle,
} from '/utils/auth';

import style from './loginForm.scss';

const LoginForm = ({ t, redirect, form }) => {
  const { getFieldDecorator, validateFields } = form;
  const [alertVisible, setAlertVisible] = useState(false);

  const submitHandle = (event) => {
    event.preventDefault();
    validateFields(async (err, values) => {
      if (err) return;

      login(values)
        .then(() => {
          router.replace(redirect || '/');
        })
        .catch(() => {
          setAlertVisible(true);
        });
    });
  };

  return (
    <Form className={style.loginForm} onSubmit={submitHandle}>
      {alertVisible ? (<Alert className={style.alertbox} message={t('loginFailedMsg')} type="error" showIcon closable onClose={() => setAlertVisible(false)} />) : null}
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: t('usernameFeedback') }],
        })(
          <Input
            className={style.input}
            prefix={<Icon type="user" />}
            placeholder={t('username')}
            onChange={() => setAlertVisible(false)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: t('passwordFeedback') }],
        })(
          <Input.Password
            className={style.input}
            prefix={<Icon type="lock" />}
            type="password"
            placeholder={t('password')}
            onChange={() => setAlertVisible(false)}
          />,
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit" className={style.button}>{t('login')}</Button>
      <div className={style.centerBox}>{`${t('or')} `}</div>
      <Button onClick={signInWithGoogle} className={style.buttonGoogle}>
        <img className={style.googleLogo} src={`${ASSET_PREFIX}/static/images/logo/google_logo.png`} alt="googleLogo" />
        {t('signInWithGoogle')}
      </Button>
      <div className={style.centerBox}>
        {`${t('dontHaveAccount')} `}
        <Link href={`/account/register${redirect ? `?r=${redirect}` : ''}`}><a>{t('registerNow')}</a></Link>
      </div>
    </Form>
  );
};

LoginForm.getInitialProps = () => ({
  namespacesRequired: ['component.auth.loginform'],
});

LoginForm.propTypes = {
  redirect: string,
  t: func.isRequired,
  form: shape({
    getFieldDecorator: func,
    validateFields: func,
  }).isRequired,
};

LoginForm.defaultProps = {
  redirect: '',
};

export default withNamespaces('component.auth.loginform')(Form.create({ name: 'login' })(LoginForm));
