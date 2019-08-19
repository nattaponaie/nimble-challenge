import { bool } from 'prop-types';

import UserInfo from '/components/auth/userInfo';
import LanguageSwitcher from '/components/languageSwitcher';
import Menu from '/components/menu';

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
  allowAnonymous: bool,
};

Header.defaultProps = {
  allowAnonymous: false,
};

Header.getInitialProps = () => ({
  namespacesRequired: ['component.header'],
});

export default Header;
