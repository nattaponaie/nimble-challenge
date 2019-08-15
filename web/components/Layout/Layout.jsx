import Head from 'next/head';
import {
  bool,
  element,
  func,
  string,
} from 'prop-types';

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
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {DEV_MODE ? null : <meta httpEquiv="Content-Security-Policy" content="script-src 'self' https://*.easysunday.com https://*.google.com https://*.gstatic.com" />}
    </Head>
    <header className={style.header}>
      <LanguageSwitcher className={style.headerItem} />
      {allowAnonymous || <UserInfo className={style.headerItem} />}
    </header>
    {children}
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
