import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const { platform } = router.query; // platform은 배열이 될 수 있음
  // const { query } = router;
  // const myQueryParam = query.myQueryParam;

  const getAuthCallback = async () => {
    const { data, status } = await axios.get(
      `https://bluerally.net/api/user/auth/${platform}`,
      {
        params: { code: router.query.code },
      },
    );

    // status === 200 ? window.close() : console.log('error!');
  };

  useEffect(() => {
    typeof router.query.code !== 'undefined' && getAuthCallback();
  }, [router.query.code]);

  return (
    <div>
      <div>auth</div>
      <div>{platform}</div>
    </div>
  );
};

export default Auth;
