import { element } from 'prop-types';

import { ASSET_PREFIX } from '/config';

import style from './account.scss';

const AccountTemplate = ({ children }) => (
  <>
    <div className={style.logo}>
      <img src={`${ASSET_PREFIX}/static/favicon.png`} alt="logo" />
    </div>
    {children}
  </>
);

AccountTemplate.propTypes = {
  children: element.isRequired,
};

AccountTemplate.getInitialProps = () => ({
  allowAnonymous: true,
  namespacesRequired: [],
});

export default AccountTemplate;
