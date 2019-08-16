import { shape, string } from 'prop-types';

import AccountTemplate from './Account';
import PasswordResetConfirmForm from '../../components/Auth/PasswordResetConfirmForm';

const PasswordResetConfirmPage = ({ query: { t: token, r: redirect } }) => (
  <AccountTemplate>
    <PasswordResetConfirmForm token={token} redirect={redirect} />
  </AccountTemplate>
);

PasswordResetConfirmPage.propTypes = {
  query: shape({
    t: string,
    r: string,
  }),
};

PasswordResetConfirmPage.defaultProps = {
  query: {},
};

PasswordResetConfirmPage.getInitialProps = ({ query }) => ({
  allowAnonymous: true,
  namespacesRequired: [],
  query,
});

export default PasswordResetConfirmPage;
