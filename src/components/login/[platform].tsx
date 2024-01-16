import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const { platform } = router.query; // platform은 배열이 될 수 있음
  // const { query } = router;
  // const myQueryParam = query.myQueryParam;

  const getAuthCallback = async () => {
    const result = await axios.post(
      `https://bluerally.net/api/user/auth/token`,
      {
        params: { code: router.query.code },
      },
    );

    console.log('result', result);

    // status === 200 ? window.close() : console.log('error!');
  };

  useEffect(() => {
    getAuthCallback();
  }, []);

  return (
    <div>
      <div>auth</div>
      <div>{platform}</div>
    </div>
  );
};

export default Auth;
