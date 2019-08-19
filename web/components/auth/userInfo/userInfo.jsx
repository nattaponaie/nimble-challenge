import {
  Button,
  Icon,
  Popover,
} from 'antd';
import Router from 'next/router';
import {
  func, string,
} from 'prop-types';
import { useContext } from 'react';

import { UserContext } from '/contexts/userContext';
import { withNamespaces } from '/i18n';
import { logout } from '/utils/auth';

import style from './userInfo.scss';
import { withAuth } from './withAuth';

const UserInfo = (props) => {
  const { t, className } = props;
  const { state, dispatch } = useContext(UserContext);
  const { email, uid } = state;

  const logoutHandle = () => {
    logout();
    dispatch({ type: 'logout' });
    Router.replace('/account/login');
  };

  const content = (
    <div>
      <div>{`${t('email')} : ${email}`}</div>
      <div>{`${t('uid')} : ${uid}`}</div>
      <Button className={style.logout} type="danger" onClick={logoutHandle}>
        <Icon type="logout" />
        {t('logout')}
      </Button>
    </div>
  );

  return (
    <div className={className}>
      <Popover placement="bottom" title={t('popTitle')} content={content} trigger="hover">
        <div className={style.userinfo}>
          <Icon type="user" className={style.usericon} />
          {email}
        </div>
      </Popover>
    </div>
  );
};

UserInfo.propTypes = {
  t: func.isRequired,
  className: string,
};

UserInfo.defaultProps = {
  className: '',
};

UserInfo.getInitialProps = () => ({
  namespacesRequired: ['component.auth.userinfo'],
});

export default withNamespaces('component.auth.userinfo')(withAuth(UserInfo));
