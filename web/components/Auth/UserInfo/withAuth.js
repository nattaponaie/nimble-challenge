import { message } from 'antd';
import {
 get, isNil,
} from 'lodash';
import router from 'next/router';
import {
 useContext, useEffect,
} from 'react';
import { getUser } from 'utils/auth';

import { UserContext } from '/contexts/userContext';

const withAuth = Component => (props) => {
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        if(isNil(user)) {
          const { asPath } = router;
          if (!asPath.includes('/account/login')) {
            router.push(`/account/login?r=${asPath}`);
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
