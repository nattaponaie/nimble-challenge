import { func } from 'prop-types';

import { ASSET_PREFIX } from '/config';
import { withNamespaces } from '/i18n';

import style from './home.scss';

const HomePage = ({ t }) => (
  <div className={style.homePanel}>
    <img src={`${ASSET_PREFIX}/static/favicon.png`} alt="logo" />
    {t('title')}
  </div>
);

HomePage.propTypes = {
  t: func.isRequired,
};

HomePage.getInitialProps = () => ({
  namespacesRequired: ['page.home'],
});

export default withNamespaces('page.home')(HomePage);
