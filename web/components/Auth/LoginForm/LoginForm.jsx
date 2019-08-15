import { useState } from 'react';
import Router from 'next/router';
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Input,
  Alert,
} from 'antd';
import Link from 'next/link';
import {
  func,
  shape,
  string,
} from 'prop-types';

import { withNamespaces } from '../../../i18n';
import { login } from '../../../utils/auth';

import style from './LoginForm.scss';

const LoginForm = ({ t, redirect, form }) => {
  const { getFieldDecorator, validateFields } = form;
  const [alertVisible, setAlertVisible] = useState(false);

  const submitHandle = (event) => {
    event.preventDefault();
    validateFields(async (err, values) => {
      try {
        if (!err) {
          await login(values);
          Router.replace(`/${redirect}`);
        }
      } catch (e) {
        setAlertVisible(true);
      }
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
            prefix={<Icon type="lock" />}
            type="password"
            placeholder={t('password')}
            onChange={() => setAlertVisible(false)}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>{t('rememberMe')}</Checkbox>,
        )}
        <Link href={`/account/password-reset${redirect ? `?r=${redirect}` : ''}`}>
          <a className={style.forgot}>{t('forgotPassword')}</a>
        </Link>
        <Button type="primary" htmlType="submit" className={style.button}>{t('login')}</Button>
        {`${t('or')} `}
        <Link href={`/account/register${redirect ? `?r=${redirect}` : ''}`}><a>{t('registerNow')}</a></Link>
      </Form.Item>
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
