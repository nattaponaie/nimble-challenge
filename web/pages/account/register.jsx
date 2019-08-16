import {
 shape, string,
} from 'prop-types';

import RegisterForm from '/components/Auth/RegisterForm';

import AccountTemplate from './Account';

const RegisterPage = ({ query: { r: redirect } }) => (
  <AccountTemplate>
    <RegisterForm redirect={redirect} />
  </AccountTemplate>
);

RegisterPage.propTypes = {
  query: shape({ r: string }),
};

RegisterPage.defaultProps = {
  query: {},
};

RegisterPage.getInitialProps = ({ query }) => ({
  allowAnonymous: true,
  namespacesRequired: [],
  query,
});

export default RegisterPage;
