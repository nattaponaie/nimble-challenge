import { get, isNil } from 'lodash';
import { message } from 'antd';
import router from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext } from '/contexts/UserContext';
import { getUser } from 'utils/auth';

const withAuth = Component => (props) => {
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
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
      } catch (err) {
        message.error('Could not connect to Firebase!');
      }
    })();
  }, []);

  return <Component {...props} />;
};

export {
  withAuth,
};
