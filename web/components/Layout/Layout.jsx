import Head from 'next/head';
import {
  bool,
  element,
  func,
  string,
} from 'prop-types';
import { Icon } from 'antd';

import { ASSET_PREFIX, DEV_MODE } from '../../config';
import { withNamespaces } from '../../i18n';
import UserInfo from '../Auth/UserInfo';
import LanguageSwitcher from '../LanguageSwitcher';

import style from './Layout.scss';

const Layout = ({
  t,
  lng,
  children,
  allowAnonymous,
}) => (
  <div className={style[`lang${lng.toUpperCase()}`]}>
    <Head>
      <link rel="shortcut icon" href={`${ASSET_PREFIX}/static/favicon.png`} />
      <title>{t('title')}</title>
      <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=3.0, minimum-scale=0.86"/>
      {DEV_MODE ? null : <meta httpEquiv="Content-Security-Policy" content="script-src 'self' https://*.google.com https://*.gstatic.com" />}
    </Head>
    <header className={style.header}>
      <div className={style.headerLeft}>
        <div className={style.menu}>
          <Icon className={style.menuIcon} type="home" />
            Home
        </div>
      </div>
      <div className={style.headerRight}>
        {allowAnonymous || <UserInfo className={style.headerItem} />}
        <LanguageSwitcher className={style.headerItem} />
      </div>
    </header>
    <div className={style.bodyContainer}>
      {children}
    </div>
    <footer>
      {/* {'Footer'} */}
    </footer>
  </div>
);

Layout.getIntialProps = () => ({
  namespacesRequired: ['common'],
});

Layout.propTypes = {
  allowAnonymous: bool,
  children: element.isRequired,
  lng: string.isRequired,
  t: func.isRequired,
};

Layout.defaultProps = {
  allowAnonymous: false,
};

export default withNamespaces('common')(Layout);
