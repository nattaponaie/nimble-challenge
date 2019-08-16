import { element } from 'prop-types';

import { ASSET_PREFIX } from '/config';

import style from './Account.scss';

const AccountTemplate = ({ children }) => (
  <div>
    <div className={style.logo}>
      <img src={`${ASSET_PREFIX}/static/favicon.png`} alt="logo" />
    </div>
    {children}
  </div>
);

AccountTemplate.propTypes = {
  children: element.isRequired,
};

AccountTemplate.getInitialProps = () => ({
  allowAnonymous: true,
  namespacesRequired: [],
});

export default AccountTemplate;
