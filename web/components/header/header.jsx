import { func } from 'prop-types';

import UserInfo from '/components/auth/userInfo';
import LanguageSwitcher from '/components/languageSwitcher';
import Menu from '/components/menu';
import { withNamespaces } from '/i18n';

import style from './header.scss';

const Header = ({ allowAnonymous }) => (
  <div className={style.header}>
    <div className={style.headerLeft}>
      <Menu />
    </div>
    <div className={style.headerRight}>
      {allowAnonymous || <UserInfo className={style.headerItem} />}
      <LanguageSwitcher className={style.headerItem} />
    </div>
  </div>
);

Header.propTypes = {
  t: func.isRequired,
};

Header.getInitialProps = () => ({
  namespacesRequired: ['component.header'],
});

export default withNamespaces('component.header')(Header);