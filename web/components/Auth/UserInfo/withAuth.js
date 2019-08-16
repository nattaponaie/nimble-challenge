import { get, isNil } from 'lodash';
import router from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext } from '/contexts/UserContext';
import { firebaseInstance } from 'utils/auth';

const withAuth = Component => (props) => {
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    firebaseInstance().onAuthStateChanged((user) => {
      if(isNil(user)) {
        if (!router.asPath.includes('/account/login')) {
          router.push(`/account/login?r=${router.asPath}`);
        }
      }
      else {
        dispatch({
          type: 'info',
          userinfo: {
            uid: get(user, ['uid']),
            email: get(user, ['email']),
          },
        });
      }
    });
  }, []);

  return <Component {...props} />;
};

export {
  withAuth,
};
