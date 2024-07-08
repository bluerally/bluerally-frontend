import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { usePostAuthToken } from '@/hooks/api/auth';

const Auth = () => {
  const router = useRouter();
  const { mutate: postAuthToken } = usePostAuthToken();

  const setAuth = () => {
    postAuthToken({ user_uid: router.query.uid });
  };

  useEffect(() => {
    // !_.isEmpty(router.query.platform) &&
    !_.isEmpty(router.query.uid) && _.isString(router.query.uid) && setAuth();
  }, [router.query.uid]);

  return <div></div>;
};

export default Auth;
