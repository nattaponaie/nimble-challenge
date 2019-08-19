import { Icon } from 'antd';
import Link from 'next/link';
import { func } from 'prop-types';

import { withNamespaces } from '/i18n';

import style from './menu.scss';

const Menu = ({ t }) => (
  <div className={style.menu}>
    <Link href="/">
      <>
        <Icon className={style.menuIcon} type="home" />
        {t('homeMenu')}
      </>
    </Link>
  </div>
);

Menu.propTypes = {
  t: func.isRequired,
};

Menu.getInitialProps = () => ({
  namespacesRequired: ['component.menu'],
});

export default withNamespaces('component.menu')(Menu);
