import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { useGetAuthPlatform } from '@/hooks/api/auth';

const Auth = () => {
  const router = useRouter();
  const { mutate: getAuthPlatform } = useGetAuthPlatform();

  console.log(router.query.platform);
  console.log(router.query.uid);

  // const getAuthCallback = async () => {
  //   const { data, status } = await axios.get(
  //     `https://bluerally.net/api/user/auth/callback`,
  //     {
  //       params: { platform: 'google', code: router.query.code },
  //     },
  //   );

  //   // status === 200 ? window.close() : console.log('error!');
  // };

  // useEffect(() => {
  //   typeof router.query.code !== 'undefined' && getAuthCallback();
  // }, [router.query.code]);

  const setAuth = () => {
    getAuthPlatform({ platform: router.query.platform });
  };

  useEffect(() => {
    !_.isEmpty(router.query.platform) &&
      !_.isEmpty(router.query.uid) &&
      setAuth();
  }, [router.query.platform, router.query.uid]);

  return (
    <div>
      <div>auth</div>
      <div></div>
    </div>
  );
};

export default Auth;
