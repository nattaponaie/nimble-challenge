const ErrorPage = () => (
  <div>404 Not Found</div>
);

ErrorPage.getInitialProps = () => ({
  namespacesRequired: ['page.error'],
});

export default ErrorPage;
