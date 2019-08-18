import Head from 'next/head';
import {
  bool,
  element,
  func,
  string,
} from 'prop-types';

import Header from '/components/header';
import { ASSET_PREFIX } from '/config';
import { withNamespaces } from '/i18n';

import style from './layout.scss';

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
    </Head>
    <header>
      <Header allowAnonymous={allowAnonymous} />
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
