import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Login = () => {
  // const [redirectUrl, setRedirectUrl] = useState<string>('');

  const getAuthRedirectUrl = async (platform: string) => {
    const { data, status } = await axios.get(
      `https://bluerally.net/api/user/auth/redirect`,
      {
        params: { platform: platform },
      },
    );

    status === 200
      ? window.open(data.data.redirect_url, '_blank', 'noopener, noreferrer')
      : console.log('error!');
  };

  return (
    <div>
      <div>Login</div>
      <div>
        <button
          onClick={() => {
            getAuthRedirectUrl('google');
          }}
        >
          GoogleLogin
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            getAuthRedirectUrl('google');
          }}
        >
          KakaoTalkLogin
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            getAuthRedirectUrl('google');
          }}
        >
          NaverLogin
        </button>
      </div>
    </div>
  );
};

export default Login;
