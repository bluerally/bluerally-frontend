import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  console.log(router.query.code);

  const getAuthCallback = async () => {
    const { data, status } = await axios.get(
      `https://bluerally.net/api/user/auth/callback`,
      {
        params: { platform: 'google', code: router.query.code },
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
      <div></div>
    </div>
  );
};

export default Auth;
