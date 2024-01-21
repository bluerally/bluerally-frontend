import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const { platform } = router.query; // platform은 배열이 될 수 있음
  // const { query } = router;
  // const myQueryParam = query.myQueryParam;

  // const getSession = () => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; session=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };

  // const sessionValue = getSession();

  // console.log('document.cookie', document.cookie);

  /**
   * @description
   */
  const getAuthCallback = async () => {
    const result = await axios.post(
      `https://bluerally.net/api/user/auth/token`,
      {
        params: { code: router.query.code },
      },
      {
        withCredentials: true,
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
