import { func } from 'prop-types';
import { Icon } from 'antd';

import { withNamespaces } from '/i18n';

import style from './menu.scss';

const Menu = () => (
  <div className={style.menu}>
    <Icon className={style.menuIcon} type="home" />
      Home
  </div>
);

Menu.propTypes = {
  t: func.isRequired,
};

Menu.getInitialProps = () => ({
  namespacesRequired: ['component.menu'],
});

export default withNamespaces('component.menu')(Menu);