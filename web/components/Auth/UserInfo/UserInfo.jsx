import { useContext } from 'react';
import {
  Button,
  Icon,
  Popover,
} from 'antd';
import Router from 'next/router';
import { withNamespaces } from '../../../i18n';
import { UserContext } from '../../../contexts/UserContext';
import { withAuth } from './withAuth';
import { logout } from '../../../utils/auth';

import style from './UserInfo.scss';

const UserInfo = (props) => {
  const { t } = props;
  const { state, dispatch } = useContext(UserContext);

  const logoutHandle = () => {
    logout();
    dispatch({ type: 'logout' });
    Router.replace('/account/login');
  };

  const content = (
    <div>
      <div>{`${t('uid')} : ${state.uid}`}</div>
      <div>{`${t('email')} : ${state.email}`}</div>
      <Button className={style.logout} type="danger" onClick={logoutHandle}>
        <Icon type="logout" />
        {t('logout')}
      </Button>
    </div>
  );

  return (
    <div className={props.className}>
      <Popover placement="bottom" title={t('popTitle')} content={content} trigger="hover">
        <div className={style.userinfo}>
          <Icon type="user" className={style.usericon} />
          {state.username}
        </div>
      </Popover>
    </div>
  );
};

UserInfo.getInitialProps = () => ({
  namespacesRequired: ['component.auth.userinfo'],
});

export default withNamespaces('component.auth.userinfo')(withAuth(UserInfo));
