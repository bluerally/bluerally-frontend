import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGetRedirectionUrl } from '@/hooks/api/auth';
import google_login_log from '../../assets/images/google_login_logo.png';

const Login = () => {
  const { mutate: getAuthRedirectUrl } = useGetRedirectionUrl();

  const handleClickLoginButton = (platform: 'google' | 'kakao' | 'naver') => {
    getAuthRedirectUrl({ platform: platform });
  };

  return (
    <div className="login-background">
      <div>
        <img src={'../../assets/images/google_login_logo.png'} />
        <button
          onClick={() => {
            handleClickLoginButton('kakao');
          }}
        >
          KakaoTalkLogin
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handleClickLoginButton('naver');
          }}
        >
          Naver
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            handleClickLoginButton('google');
          }}
        >
          GoogleLogin
        </button>
      </div>
    </div>
  );
};

export default Login;
