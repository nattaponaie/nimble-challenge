import {
 shape, string,
} from 'prop-types';

import PasswordResetForm from '/components/Auth/PasswordResetForm';

import AccountTemplate from './Account';

const PasswordResetPage = ({ query: { r: redirect } }) => (
  <AccountTemplate>
    <PasswordResetForm redirect={redirect} />
  </AccountTemplate>
);

PasswordResetPage.propTypes = {
  query: shape({ r: string }),
};

PasswordResetPage.defaultProps = {
  query: {},
};

PasswordResetPage.getInitialProps = ({ query }) => ({
  allowAnonymous: true,
  namespacesRequired: [],
  query,
});

export default PasswordResetPage;
